from dotenv import load_dotenv
import os
import streamlit as st
st.set_page_config(page_title="Story Sound Hub", page_icon="📚") 
from langchain_core.messages import AIMessage, HumanMessage
from langchain_groq import ChatGroq
from langchain_community.utilities import SQLDatabase

# Load environment variables
load_dotenv()