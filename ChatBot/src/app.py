from dotenv import load_dotenv
import os
import streamlit as st
import mysql.connector
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_community.utilities import SQLDatabase

# Load environment variables
load_dotenv()

# Initialize MySQL Database Connection
def init_database(user, password, host, port, database):
    try:
        db_uri = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}"
        db = SQLDatabase.from_uri(db_uri)
        return db
    except Exception as e:
        st.error(f"Error connecting to database: {e}")
        return None
    
def get_sql_chain(db):
    # Use a conversation-based prompt template
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a data analyst at a company. Generate an SQL query to find the required information from the database."),
        ("human", "Schema: {schema}"),
        ("human", "Conversation History: {chat_history}"),
        ("human", "Question: {question}"),
        ("human", "SQL Query: ")
    ])
    
    llm = ChatOpenAI(model="gpt-4-0125-preview")

    # Creating a runnable to fetch schema information from the database
    get_schema_runnable = RunnableLambda(lambda _: db.get_table_info())

    return (
        get_schema_runnable
        | prompt
        | llm
        | StrOutputParser()
    )

def get_response(user_query: str, db: SQLDatabase, chat_history: list):
    sql_chain = get_sql_chain(db)

    # Define the response template based on conversation
    response_template = ChatPromptTemplate.from_messages([
        ("system", "You are a data analyst. Generate an SQL query and interpret the result in natural language."),
        ("human", "Schema: {schema}"),
        ("human", "Conversation History: {chat_history}"),
        ("human", "SQL Query: {sql_query}"),
        ("human", "User Question: {question}"),
        ("human", "SQL Response: {sql_response}")
    ])
    
    llm = ChatOpenAI(model="gpt-4-0125-preview")

    # Build chain to pass through schema and execute SQL
    chain = (
        RunnablePassthrough.assign(query=sql_chain).assign(
            schema=lambda _: db.get_table_info(),
            sql_response=lambda vars: db.run(vars["query"]),
        )
        | response_template
        | llm
        | StrOutputParser()
    )

    # Invoking the chain
    return chain.invoke({
        "chat_history": chat_history,
        "question": user_query,
        "input": user_query
    })    