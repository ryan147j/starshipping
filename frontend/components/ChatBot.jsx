import React, { useEffect, useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const containerStyle = {
    position: 'fixed',
    right: '24px',
    bottom: '24px',
    zIndex: 1500
  };

  const buttonStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '999px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 18px 40px rgba(79, 70, 229, 0.55)',
    cursor: 'pointer',
    fontSize: '26px'
  };

  const panelStyle = {
    position: 'absolute',
    right: 0,
    bottom: '72px',
    width: '360px',
    maxHeight: '520px',
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 24px 80px rgba(15, 23, 42, 0.60)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  };

  const headerStyle = {
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const headerLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '999px',
    overflow: 'hidden',
    background: '#a855f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  };

  const headerTextStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontSize: '0.95rem',
    fontWeight: 700
  };

  const statusRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.78rem',
    opacity: 0.9
  };

  const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    background: '#22c55e'
  };

  const headerCloseButtonStyle = {
    border: 'none',
    background: 'transparent',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: '18px'
  };

  const bodyWrapperStyle = {
    flex: 1,
    background: '#f3f4ff',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 12px',
    gap: '10px',
    overflowY: 'auto'
  };

  const assistantBubbleStyle = {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '10px 12px',
    fontSize: '0.9rem',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)'
  };

  const bubbleMetaStyle = {
    marginTop: '4px',
    fontSize: '0.7rem',
    color: '#9ca3af'
  };


  const userBubbleRowStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '6px'
  };

  const userBubbleStyle = {
    maxWidth: '85%',
    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '10px 12px',
    fontSize: '0.9rem',
    boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)'
  };

  const footerStyle = {
    padding: '8px 10px',
    borderTop: '1px solid #e5e7eb',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const footerInputRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const inputStyle = {
    flex: 1,
    borderRadius: '999px',
    border: '1px solid #e5e7eb',
    padding: '8px 12px',
    fontSize: '0.85rem',
    outline: 'none'
  };

  const sendButtonStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '999px',
    border: 'none',
    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 8px 18px rgba(79, 70, 229, 0.45)'
  };

  const footerHintStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.7rem',
    color: '#9ca3af'
  };

  useEffect(() => {
    // Seed initial transcript similar to the static UI
    setMessages([
      {
        id: 'init-assistant',
        sender: 'assistant',
        text: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
        meta: 'Just now'
      }
    ]);
  }, []);

  const sendMessage = (overrideText) => {
    const raw = overrideText !== undefined ? overrideText : inputValue;
    const trimmed = (raw || '').trim();
    if (!trimmed) return;

    const userMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: trimmed,
      meta: 'Just now'
    };

    setMessages(prev => prev.concat(userMessage));
    setInputValue('');

    fetch('/api/chat/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: trimmed
      })
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        var replyText = (result.data && result.data.answer) ||
          (result.data && result.data.message) ||
          'Sorry, I could not get an answer right now.';

        const assistantMessage = {
          id: 'as-' + Date.now(),
          sender: 'assistant',
          text: replyText,
          meta: 'Just now'
        };

        setMessages(prev => prev.concat(assistantMessage));
      })
      .catch(function () {
        const assistantMessage = {
          id: 'as-' + Date.now(),
          sender: 'assistant',
          text: 'Sorry, there was a problem contacting the assistant. Please try again later.',
          meta: 'Just now'
        };
        setMessages(prev => prev.concat(assistantMessage));
      });
  };

  return (
    <div style={containerStyle}>
      {isOpen && (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <div style={headerLeftStyle}>
              <div style={avatarStyle}>
                🤖
              </div>
              <div style={headerTextStyle}>
                <span style={titleStyle}>AI Assistant</span>
                <div style={statusRowStyle}>
                  <span style={statusDotStyle} />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleOpen}
              style={headerCloseButtonStyle}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div style={bodyWrapperStyle}>
            {/* Messages list */}
            {messages.map(function (m) {
              if (m.sender === 'assistant') {
                return (
                  <div key={m.id} style={assistantBubbleStyle}>
                    <div>{m.text}</div>
                    {m.meta && <div style={bubbleMetaStyle}>{m.meta}</div>}
                  </div>
                );
              }

              return (
                <div key={m.id} style={userBubbleRowStyle}>
                  <div style={userBubbleStyle}>
                    <div>{m.text}</div>
                    {m.meta && <div style={bubbleMetaStyle}>{m.meta}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={footerStyle}>
            <div style={footerInputRowStyle}>
              <input
                type="text"
                placeholder="Type your message..."
                style={inputStyle}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                type="button"
                style={sendButtonStyle}
                onClick={() => sendMessage()}
              >
                ➤
              </button>
            </div>
            <div style={footerHintStyle}>
              <span>Press Enter to send</span>
              <span>Secure chat</span>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        style={buttonStyle}
        aria-label="Open chat support"
      >
        💬
      </button>
    </div>
  );
};

export default ChatBot;

