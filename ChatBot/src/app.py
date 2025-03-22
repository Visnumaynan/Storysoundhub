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

# Get chatbot response
def get_response(user_query: str, db: SQLDatabase):
    llm = ChatGroq(model_name="llama3-8b-8192", groq_api_key=os.getenv("GROQ_API_KEY"))

    # Greeting Handling
    if is_greeting(user_query):
        return "👋 Hello! How can I assist you today?"

    # General Book-Related Queries
    if is_book_related(user_query):
        try:
            # Handle book recommendations by genre
            if "genre" in user_query.lower():
                query_words = user_query.lower().split()
                genre_name = None

                for word in query_words:
                    check_query = f"SELECT name FROM genres WHERE LOWER(name) LIKE '%{word}%' LIMIT 1;"
                    result = db.run(check_query)
                    if result:
                        genre_name = result[0][0]
                        break

                if genre_name:
                    sql_query = """
                        SELECT b.title, b.description, a.name as author
                        FROM books b
                        JOIN book_genres bg ON b.id = bg.book_id
                        JOIN genres g ON bg.genre_id = g.id
                        JOIN book_authors ba ON b.id = ba.book_id
                        JOIN authors a ON ba.author_id = a.id
                        WHERE LOWER(g.name) LIKE LOWER(%s)
                        LIMIT 5;
                    """
                    sql_result = db.run(sql_query, parameters=(f"%{genre_name}%",))

                    if sql_result:
                        books_info = [
                            f"📖 Title: {row[0]}\n✍️ Author: {row[2]}\n📄 Description: {row[1]}"
                            for row in sql_result
                        ]
                        books_text = "\n\n".join(books_info)
                        return f"Here are some {genre_name} books:\n\n{books_text}"
                    else:
                        return f"Sorry, I couldn't find any books in the {genre_name} genre."
                else:
                    return "I couldn't identify the genre you're looking for. Try specifying a valid genre."

            # If it's a general book-related question, use LLM to generate a response
            ai_response = llm.invoke(f"Answer this book-related question in a helpful way: {user_query}")
            return ai_response.content

        except Exception as e:
            return f"❌ Error processing book-related question: {str(e)}"

    # Default response for non-book-related queries
    return "I can only provide book recommendations and related information. Please ask about books."           