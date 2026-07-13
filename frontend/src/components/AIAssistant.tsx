'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hi, I am Abhay's portfolio assistant. Ask me anything about his skills, projects, education, or contact info!" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${backendUrl}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response || "No response received." }]);
    } catch (error) {
      console.error('AI assistant API error:', error);
      const fallbackMsg = "I couldn't reach the live backend API, but I can tell you that Abhay studies at RIT Roorkee, has an 8.5 CGPA, and has worked on Truth Lense and Portfolio Website.";
      setMessages((prev) => [...prev, { sender: 'ai', text: fallbackMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center focus:outline-none cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Dialog Drawer */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] bg-background/30 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-card/20 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-500" />
              <span className="font-display font-medium text-foreground text-sm">Abhay's AI Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-500 shrink-0 mt-0.5 font-bold">
                    AI
                  </div>
                )}
                <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-card border border-border text-foreground/90 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] text-blue-500 shrink-0 font-bold">
                  AI
                </div>
                <div className="bg-card border border-border px-3 py-2 rounded-xl rounded-tl-none text-xs text-muted">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-card/20 backdrop-blur-md flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about Abhay..."
              className="flex-1 bg-input border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder-muted focus:outline-none focus:border-blue-500 transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
