from dotenv import load_dotenv
import os
import streamlit as st
from langchain_core.messages import AIMessage, HumanMessage
from langchain_groq import ChatGroq
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

# Check if input is a greeting
def is_greeting(question: str):
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
    return question.lower().strip() in greetings

# Check if a question is related to SQL/database
def is_database_related(question: str):
    database_keywords = [
        "database", "sql", "table", "column", "row", "schema", "index", "query", 
        "retrieve", "fetch", "store", "insert", "delete", "update", "primary key", 
        "foreign key", "join", "count", "total", "list", "how many", "show", "retrieve"
    ]
    return any(keyword in question.lower() for keyword in database_keywords)

# Get SQL query response and return natural language answer
def get_response(user_query: str, db: SQLDatabase):
    """Handles database queries and provides natural language responses."""
    
    # Greeting Handling
    if is_greeting(user_query):
        return "👋 Hello! How can I assist you today?"

    # Restrict responses to only database-related queries
    if not is_database_related(user_query):
        return "🚫 Sorry I am limitted with question  ."

    # Initialize LLM for natural responses
    llm = ChatGroq(model_name="llama3-8b-8192", groq_api_key=os.getenv("GROQ_API_KEY"))

    try:
        # Handle count and list request
        if "how many" in user_query.lower() and "list" in user_query.lower() and "genres" in user_query.lower():
            count_query = "SELECT COUNT(*) FROM genres;"
            list_query = "SELECT name FROM genres LIMIT 10;"  # Adjust limit if needed

            count_result = db.run(count_query)
            list_result = db.run(list_query)

            count = count_result[0][0]  # Extract count
            genres_names = [row[0] for row in list_result]  # Extract names

            # Convert to natural response
            genres_list = ", ".join(genres_names) if genres_names else "No genress found."
            ai_prompt = f"There are {count} genress. Here are some: {genres_list}. Generate a friendly response."
            ai_response = llm.invoke(ai_prompt)
            return ai_response.content

        # Handle only count request
        elif "how many" in user_query.lower() and "genres" in user_query.lower():
            sql_query = "SELECT COUNT(*) FROM genres;"
            sql_result = db.run(sql_query)
            count = sql_result[0][0]  # Extract count

            ai_prompt = f"The database contains {count} genress. Generate a friendly response."
            ai_response = llm.invoke(ai_prompt)
            return ai_response.content

        # Handle only list request
        elif "list" in user_query.lower() and "genres" in user_query.lower():
            sql_query = "SELECT name FROM genres LIMIT 10;"
            sql_result = db.run(sql_query)
            genres_names = [row[0] for row in sql_result]  # Extract names

            genres_list = ", ".join(genres_names) if genres_names else "No genress found."
            ai_prompt = f"Here are some genress from the database: {genres_list}. Generate a friendly response."
            ai_response = llm.invoke(ai_prompt)
            return ai_response.content

        else:
            return "I need more details. Which table or data are you referring to?"

    except Exception as e:
        return f"❌ SQL Execution Error: {str(e)}"


# Streamlit UI
st.set_page_config(page_title="Story Sound Hub", page_icon=":speech_balloon:")
st.title("Assistant 🤖")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = [AIMessage(content="Hello! Ask me a questions.")]

with st.sidebar:
    st.subheader("Database Settings")
    st.write("Connect to your MySQL database.")

    host = st.text_input("Host", value="localhost", key="host")
    port = st.text_input("Port", value="3306", key="port")
    user = st.text_input("User", value="root", key="user")
    password = st.text_input("Password", type="password", value="", key="password")
    database = st.text_input("Database", value="storysound_app", key="database")

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
user_query = st.chat_input("Type your database-related question here...")
if user_query and user_query.strip():
    st.session_state.chat_history.append(HumanMessage(content=user_query))
    
    with st.chat_message("Human"):
        st.markdown(user_query)

    if "db" in st.session_state and st.session_state.db:
        with st.chat_message("AI"):
            response = get_response(user_query, st.session_state.db)
            st.markdown(response)

        st.session_state.chat_history.append(AIMessage(content=response))
    else:
        st.error("❌ No database connection. Please connect first.")
