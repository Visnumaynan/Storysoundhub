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
from groq import Groq
from langchain_groq import ChatGroq
import re



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
    # Define the prompt template with placeholders
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an SQL assistant. Always return a valid SQL query."),
        HumanMessage(content="Schema: {schema}"),
        HumanMessage(content="Conversation History: {chat_history}"),
        HumanMessage(content="Question: {question}")
    ])
    
    llm = ChatGroq(model_name="llama3-8b-8192", groq_api_key=os.getenv("GROQ_API_KEY"))

    # Creating a runnable to fetch schema information from the database
    get_schema_runnable = RunnableLambda(lambda _: {"schema": db.get_table_info()})

    return (
        get_schema_runnable
        | prompt
        | llm
        | StrOutputParser()
    )

def is_sql_query(question: str):
    """Check if the user's question is related to SQL or database queries."""
    sql_keywords = ["select", "insert", "update", "delete", "from", "where", "join", "database", "table", "column", "schema"]
    return any(keyword in question.lower() for keyword in sql_keywords)

def get_response(user_query: str, db: SQLDatabase, chat_history: list):
    """Handles both SQL and non-SQL queries by deciding which approach to use."""
    
    # Use Groq AI for general conversation
    llm = ChatGroq(model_name="llama3-8b-8192", groq_api_key=os.getenv("GROQ_API_KEY"))

    if is_sql_query(user_query):
        # Generate SQL Query
        sql_chain = get_sql_chain(db)
        generated_sql = sql_chain.invoke({
            "chat_history": chat_history,
            "question": user_query,
            "schema": db.get_table_info()
        })

        print("Generated SQL Query:", generated_sql)  # Debugging

        # Ensure the query is valid before execution
        if not re.match(r"^\s*(SELECT|INSERT|UPDATE|DELETE)\s", generated_sql, re.IGNORECASE):
            return "⚠️ Error: Invalid SQL query generated."

        try:
            sql_response = db.run(generated_sql)
        except Exception as e:
            return f"❌ SQL Execution Error: {str(e)}"

        # Generate AI response explaining the SQL results
        response_template = ChatPromptTemplate.from_messages([
            HumanMessage(content="Schema: {schema}"),
            HumanMessage(content="Conversation History: {chat_history}"),
            HumanMessage(content="User Question: {question}"),
            HumanMessage(content="SQL Query: {sql_query}"),
            HumanMessage(content="SQL Response: {sql_response}")
        ])

        chain = (
            RunnablePassthrough.assign(
                schema=lambda _: db.get_table_info(),
                sql_query=generated_sql,
                sql_response=sql_response
            )
            | response_template
            | llm
            | StrOutputParser()
        )

        return chain.invoke({
            "chat_history": chat_history,
            "question": user_query,
            "sql_query": generated_sql,
            "sql_response": sql_response
        })

    else:
        # If it's a general question, use Groq AI to respond
        response = llm.invoke(user_query)
        return response.content

    # Invoke the chain, passing the chat history and user question
    return chain.invoke({
        "chat_history": chat_history,
        "question": user_query,
        "schema": db.get_table_info()  # Ensure this is passed correctly
    })



# Streamlit UI
st.set_page_config(page_title="Chat with MySQL", page_icon=":speech_balloon:")
st.title("Chat with MySQL (phpMyAdmin)")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = [AIMessage(content="Hello! How can I help you today?")]

with st.sidebar:
    st.subheader("Database Settings")
    st.write("Connect to your MySQL database.")

    host = st.text_input("Host", value="localhost", key="host")
    port = st.text_input("Port", value="3306", key="port")
    user = st.text_input("User", value="root", key="user")
    password = st.text_input("Password", type="password", value="", key="password")
    database = st.text_input("Database", value="book", key="database")

    if st.button("Connect"):
        with st.spinner("Connecting to database..."):
            connection = init_database(user, password, host, port, database)
            if connection:
                st.session_state.db = connection
                st.success("✅ Connected to MySQL!")

# Display Chat History
for message in st.session_state.chat_history:
    role = "AI" if isinstance(message, AIMessage) else "Human"
    with st.chat_message(role):
        st.markdown(message.content)

# Handle User Input
user_query = st.chat_input("Type your message here...")
if user_query and user_query.strip():
    st.session_state.chat_history.append(HumanMessage(content=user_query))
    
    with st.chat_message("Human"):
        st.markdown(user_query)

    if "db" in st.session_state and st.session_state.db:
        with st.chat_message("AI"):
            response = get_response(user_query, st.session_state.db, st.session_state.chat_history)
            st.markdown(response)

        st.session_state.chat_history.append(AIMessage(content=response))
    else:
        st.error("❌ No database connection. Please connect first.")
