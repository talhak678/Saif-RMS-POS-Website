import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatbotWidget: React.FC = () => {
  const { cmsConfig } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi there! Welcome to ${cmsConfig?.restaurantName || 'our restaurant'}. How can I help you today?` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff0000";

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !cmsConfig?.restaurantId) return;

    const userMsg = inputMessage.trim();
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Use the production Vercel backend URL for the AI chatbot
      const backendUrl = 'https://saif-rms-pos-backend-tau.vercel.app/api/ai/chatbot';
      
      const response = await axios.post(
        backendUrl, 
        {
          // Ensure we capture the correct ID since AppContext nested it under data sometimes
          restaurantId: cmsConfig.restaurantId || cmsConfig._id || cmsConfig.id || (cmsConfig.data && cmsConfig.data.restaurantId),
          messages: newMessages
        }
      );

      if (response.data && response.data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: response.data.reply }]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Chatbot API Error:', error);
      
      const whatsappLink = `https://wa.me/${cmsConfig?.whatsappNumber || ''}?text=Hi, I need help with ${cmsConfig?.restaurantName || 'the restaurant'}. The AI assistant is currently unavailable.`;
      
      setMessages([
        ...newMessages, 
        { 
          role: 'assistant', 
          content: "I'm sorry, I'm having trouble connecting to my brain right now. 🧠\n\nDirectly humein WhatsApp par message karein, hum aapki madad kar dein ge!" 
        }
      ]);

      // Add a small delay then show the WhatsApp button suggestion
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `[Click here to chat on WhatsApp](${whatsappLink})`
          }
        ]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  // Only render if we have a restaurant ID
  if (!cmsConfig?.restaurantId) return null;

  return (
    <>
      {/* Component Scoped Styles */}
      <style>{`
        .ai-chatbot-icon-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-fab {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
        }

        .chatbot-fab:hover {
          transform: scale(1.05);
        }



        .ai-chatbot-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px;
          max-width: 100%;
          height: 100vh;
          background: #fff;
          z-index: 10001;
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 25px rgba(0,0,0,0.1);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .ai-chatbot-sidebar.show {
          transform: translateX(0);
        }

        .ai-chatbot-sidebar .chatbot-header {
          padding: 20px;
          border-radius: 0;
        }

        .ai-chatbot-sidebar .chatbot-body {
          flex: 1;
          overflow-y: auto;
          background-color: #f8f9fa;
          padding: 20px;
        }
        
        .ai-chatbot-sidebar .chatbot-footer {
          padding: 20px;
          border-top: 1px solid #eee;
          background: #fff;
        }

        .chatbot-body::-webkit-scrollbar {
          width: 6px;
        }
        .chatbot-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-body::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }

        .typing-indicator {
          padding: 5px;
        }
        .typing-indicator .dot {
          opacity: 0.6;
        }

        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }

        @media (max-width: 576px) {
          .ai-chatbot-icon-wrapper {
            bottom: 20px;
            right: 20px;
          }
          .ai-chatbot-sidebar {
            width: 100%;
          }
        }

        .chatbot-intro-card {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 260px;
          background: #fff;
          padding: 15px 20px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          animation: slideUpIntro 0.5s ease-out;
          z-index: 10000;
          border: 1px solid #eee;
          cursor: pointer;
        }

        .chatbot-intro-card::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 20px;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #fff;
        }

        .ai-chatbot-icon-wrapper .chatbot-intro-card button.close-intro,
        .ai-chatbot-icon-wrapper .chatbot-intro-card button.close-intro i {
          color: ${primaryColor} !important;
          background-color: #f0f0f0 !important;
          opacity: 1 !important;
          font-size: 12px !important;
          font-weight: 900 !important;
        }

        .chatbot-intro-card .close-intro {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f0;
          border-radius: 50%;
          transition: all 0.2s;
          border: 1px solid rgba(0,0,0,0.05) !important;
        }

        .chatbot-intro-card .close-intro:hover {
          background: #e0e0e0;
          color: #333;
        }

        .chatbot-intro-content {
          font-size: 0.9rem;
          line-height: 1.4;
          color: #333;
          margin: 0;
          padding-right: 15px;
        }

        @keyframes slideUpIntro {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .whatsapp-redirect-btn {
          background: #25d366;
          color: white;
          border-radius: 50px;
          padding: 8px 15px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 10px;
          transition: all 0.3s ease;
          border: none;
          font-size: 0.85rem;
        }
        .whatsapp-redirect-btn:hover {
          background: #128c7e;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }
      `}</style>

      {/* Floating Action Button (Always remains in bottom right) */}
      <div className="ai-chatbot-icon-wrapper">
        {/* Intro Card */}
        {showIntro && !isOpen && (
          <div className="chatbot-intro-card" onClick={toggleChat}>
            <button 
              className="close-intro border-0" 
              onClick={(e) => {
                e.stopPropagation();
                setShowIntro(false);
              }}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <p className="chatbot-intro-content">
              <strong>Hi there!</strong> Welcome to {cmsConfig?.restaurantName || 'our restaurant'}. How can I help you today?
            </p>
          </div>
        )}

        <button 
          className="chatbot-fab btn btn-primary bg-primary text-white border-0 shadow-primary" 
          onClick={toggleChat}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <i className="fa-solid fa-times"></i>
          ) : (
            <i className="fa-solid fa-robot"></i>
          )}
        </button>
      </div>


      {/* Sliding Sidebar for Chat Window */}
      <div className={`ai-chatbot-sidebar ${isOpen ? 'show' : ''}`}>
        {/* Header */}
        <div className="chatbot-header bg-primary text-white d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="robot-icon-bg bg-white text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px', fontSize: '1.2rem'}}>
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h5 className="mb-0 text-white fw-bold">AI Assistant</h5>
              <small className="opacity-75" style={{fontSize: '0.8rem'}}>Ask me anything about the menu!</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">

            <button className="btn btn-sm btn-link text-white shadow-none p-0 fs-5" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="chatbot-body">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div 
                className={`p-3 rounded-3 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-bottom-end-0' 
                    : 'bg-white text-dark border rounded-bottom-start-0'
                }`}
                style={{ maxWidth: '85%', fontSize: '0.95rem' }}
              >
                {/* Parse line breaks safely and handle special WhatsApp link format */}
                {msg.content.includes('[Click here to chat on WhatsApp]') ? (
                  <div>
                    <p className="mb-2">I'm sorry, I'm having trouble connecting. Hum se WhatsApp par baat karein:</p>
                    <a 
                      href={msg.content.match(/\((.*?)\)/)?.[1] || `https://wa.me/${cmsConfig?.whatsappNumber || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-redirect-btn"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                    </a>
                  </div>
                ) : (
                  msg.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== msg.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="d-flex justify-content-start mb-3">
              <div className="p-3 rounded-3 bg-white text-dark border rounded-bottom-start-0 shadow-sm" style={{ width: '70px' }}>
                <div className="typing-indicator d-flex justify-content-center gap-1">
                  <span className="dot bg-secondary rounded-circle" style={{width: '8px', height: '8px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s'}}></span>
                  <span className="dot bg-secondary rounded-circle" style={{width: '8px', height: '8px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s'}}></span>
                  <span className="dot bg-secondary rounded-circle" style={{width: '8px', height: '8px', animation: 'bounce 1.4s infinite ease-in-out both'}}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="chatbot-footer">
          <form onSubmit={sendMessage} className="d-flex gap-2">
            <input 
              type="text" 
              className="form-control border bg-light shadow-none px-3" 
              placeholder="Type your message..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              style={{ borderRadius: '25px', padding: '10px 15px' }}
            />
            <button 
              type="submit" 
              className="btn btn-primary bg-primary text-white border-0 rounded-circle shadow-none d-flex align-items-center justify-content-center"
              style={{ width: '45px', height: '45px', flexShrink: 0 }}
              disabled={!inputMessage.trim() || isLoading}
            >
              <i className="fa-solid fa-paper-plane" style={{ marginLeft: '-2px' }}></i>
            </button>
          </form>
          <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
            <small className="text-muted" style={{ fontSize: '0.8rem' }}>Powered by AI – Mandi House or Contact via WhatsApp.</small>
            <a 
              href={`https://wa.me/${cmsConfig?.whatsappNumber || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-success"
              title="Chat on WhatsApp"
              style={{ fontSize: '2rem', lineHeight: 1, textDecoration: 'none' }}
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
