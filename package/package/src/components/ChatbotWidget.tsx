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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const response = await axios.post(
        'https://saif-rms-pos-backend-tau.vercel.app/api/ai/chatbot', 
        {
          restaurantId: cmsConfig.restaurantId,
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
      setMessages([
        ...newMessages, 
        { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later or contact our staff directly." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Only render if we have a restaurant ID
  if (!cmsConfig?.restaurantId) return null;

  return (
    <div className={`ai-chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      {/* Floating Action Button */}
      <button 
        className="chatbot-fab btn btn-primary shadow-primary" 
        onClick={toggleChat}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <i className="fa-solid fa-times"></i>
        ) : (
          <i className="fa-solid fa-robot"></i>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window card bg-white ${isOpen ? 'show' : 'hide'}`}>
        {/* Header */}
        <div className="chatbot-header bg-primary text-white p-3 rounded-top d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="robot-icon-bg bg-white text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h6 className="mb-0 text-white fw-bold">AI Assistant</h6>
              <small className="opacity-75" style={{fontSize: '0.7rem'}}>Ask me anything!</small>
            </div>
          </div>
          <button className="btn btn-sm btn-link text-white shadow-none p-0" onClick={toggleChat}>
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>

        {/* Messages Body */}
        <div className="chatbot-body p-3" style={{ height: '350px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div 
                className={`p-2 rounded-3 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-bottom-end-0' 
                    : 'bg-white text-dark border rounded-bottom-start-0'
                }`}
                style={{ maxWidth: '85%', fontSize: '0.9rem' }}
              >
                {/* Parse line breaks safely */}
                {msg.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== msg.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="d-flex justify-content-start mb-3">
              <div className="p-2 rounded-3 bg-white text-dark border rounded-bottom-start-0 shadow-sm" style={{ width: '60px' }}>
                <div className="typing-indicator d-flex justify-content-center gap-1">
                  <span className="dot bg-secondary rounded-circle" style={{width: '6px', height: '6px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s'}}></span>
                  <span className="dot bg-secondary rounded-circle" style={{width: '6px', height: '6px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s'}}></span>
                  <span className="dot bg-secondary rounded-circle" style={{width: '6px', height: '6px', animation: 'bounce 1.4s infinite ease-in-out both'}}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="chatbot-footer p-2 border-top bg-white rounded-bottom">
          <form onSubmit={sendMessage} className="d-flex gap-2">
            <input 
              type="text" 
              className="form-control form-control-sm border-0 bg-light shadow-none" 
              placeholder="Type your message..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              style={{ borderRadius: '20px' }}
            />
            <button 
              type="submit" 
              className="btn btn-sm btn-primary rounded-circle shadow-none d-flex align-items-center justify-content-center"
              style={{ width: '38px', height: '38px', flexShrink: 0 }}
              disabled={!inputMessage.trim() || isLoading}
            >
              <i className="fa-solid fa-paper-plane" style={{ marginLeft: '-2px' }}></i>
            </button>
          </form>
          <div className="text-center mt-1">
            <small className="text-muted" style={{ fontSize: '0.65rem' }}>Powered by AI • {cmsConfig?.restaurantName}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
