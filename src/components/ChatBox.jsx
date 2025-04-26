import React, { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to handle message sending
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, timestamp: new Date().toLocaleTimeString() },
      ]);
      setNewMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="chat-box-container">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>

      {/* Chat messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <p><strong>{message.timestamp}</strong>: {message.text}</p>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
