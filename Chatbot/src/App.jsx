import { useState } from "react";
import Chatboticon from "./components/Chatboticon"
import Chatform from "./components/Chatform"
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        <div className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          {chatHistory.map((chat,index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
          
        </div>

        <div className="chat-footer">
          <Chatform setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  )
}

export default App