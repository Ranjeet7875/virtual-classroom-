import React, { useState } from 'react';
import VideoCall from './components/VideoCall';
import Whiteboard from './components/Whiteboard';
import ChatBox from './components/ChatBox';
import FileUpload from './components/FileUpload';
import Navbar from './components/Navbar';

export default function App() {
  const [activeTab, setActiveTab] = useState('video'); // Start with video call active

  return (
    <div className="App">
      {/* Add the Navbar component */}
      <Navbar />
      
      {/* Navigation buttons for tabs */}
      <div className="tab-buttons">
        <button 
          onClick={() => setActiveTab('video')} 
          className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
        >
          Video Call
        </button>
        <button 
          onClick={() => setActiveTab('chat')} 
          className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
        >
          Chat
        </button>
        <button 
          onClick={() => setActiveTab('whiteboard')} 
          className={`tab-button ${activeTab === 'whiteboard' ? 'active' : ''}`}
        >
          Whiteboard
        </button>
      </div>

      {/* Render components based on active tab */}
      <div className="content">
        {activeTab === 'video' && <VideoCall />}
        {activeTab === 'chat' && <ChatBox />}
        {activeTab === 'whiteboard' && <Whiteboard />}
      </div>

      <FileUpload />
    </div>
  );
}