import React, { useState } from 'react';
import './ChatBox.css';
import { MessageSquare, X, Send } from 'lucide-react';

const ChatbotWidget = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}
      onClick={isMinimized ? toggleChatbot : undefined}
    >
      {isMinimized ? (
        <div className="chatbot-icon">
          <MessageSquare size={24} />
        </div>
      ) : (
        <>
          <div
            className="chatbot-header"
            style={{
              padding: '12px 15px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f1f1f1',
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'black',
                backgroundColor: 'transparent',
              }}
            >
              Pharma Chain Assistant
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleChatbot();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'black',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
          <div className="chatbot-iframe-container">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/dPW29kqfmhmO2Gmr0CjCT"
              width="100%"
              height="100%"
              style={{ border: 'none', backgroundColor: 'transparent' }}
              frameBorder="0"
              title="Pharma Supply Chain Assistant"
              allow="microphone"
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatbotWidget;
