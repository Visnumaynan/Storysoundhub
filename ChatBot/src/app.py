from dotenv import load_dotenv
import os
import streamlit as st
st.set_page_config(page_title="Story Sound Hub", page_icon="📚") 
from langchain_core.messages import AIMessage, HumanMessage
from langchain_groq import ChatGroq
from langchain_community.utilities import SQLDatabase

# Load environment variables
load_dotenv()
# Automatically Connect to MySQL on App Startup
def init_database():
    try:
        db_uri = f"mysql+mysqlconnector://{os.getenv('DB_USER', 'root')}:{os.getenv('DB_PASSWORD', '')}@{os.getenv('DB_HOST', 'localhost')}:{os.getenv('DB_PORT', '3306')}/{os.getenv('DB_NAME', 'backend_app')}"
        return SQLDatabase.from_uri(db_uri)
    except Exception as e:
        st.error(f"❌ Error connecting to database: {e}")
        return None

if "db" not in st.session_state:
    with st.spinner("Connecting to database..."):
        connection = init_database()
        if connection:
            st.session_state.db = connection
            st.success("✅ Auto-connected to MySQL!")
        else:
            st.error("❌ Failed to auto-connect. Check credentials.")

# Check if input is a greeting
def is_greeting(question: str):
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
    return question.lower().strip() in greetings

# Check if a question is about books
def is_book_related(question: str):
    book_keywords = ["book", "books", "novel", "author", "genre", "literature", "reading", "recommendation"]
    return any(keyword in question.lower() for keyword in book_keywords)
           