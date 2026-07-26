'use client';

import { MessageSquare, Minus, RefreshCcw, Send, Bot, Loader2, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
    }
  }, [isOpen]);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';

      setMessages((prev) => [...prev, { id: 'bot-' + Date.now(), role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          botMessage += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].content = botMessage;
            return updated;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: 'bot-error', role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <>
        {/* Greeting Bubble */}
        <div
          className={`fixed bottom-9 right-24 z-50 flex items-center gap-2 rounded-2xl rounded-br-sm border border-border-default bg-bg-surface1 px-4 py-3 shadow-card transition-all duration-500 ${
            showGreeting
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <span className="text-sm font-medium text-text-primary whitespace-nowrap">
            👋 Ask me about Shadab.
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(false);
            }}
            className="ml-1 rounded-full p-1 text-text-muted hover:bg-bg-surface2 hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo"
            aria-label="Dismiss greeting"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-white shadow-glow transition-transform hover:scale-110 active:scale-95"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[500px] max-h-[80vh] w-[350px] flex-col overflow-hidden rounded-card border border-border-default bg-bg-surface1 shadow-card-hover transition-all duration-300 sm:w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-surface2 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold text-text-primary">Chat with Shadab</h3>
            <p className="font-sans text-xs text-text-secondary">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleNewChat}
            className="rounded-badge p-2 text-text-secondary transition-colors hover:bg-bg-surface1 hover:text-text-primary"
            title="New Chat"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-badge p-2 text-text-secondary transition-colors hover:bg-bg-surface1 hover:text-text-primary"
            title="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-bg-surface2 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-3 text-center opacity-70">
            <Bot className="h-10 w-10 text-accent-indigo" />
            <p className="text-sm text-text-secondary">
              Hi! Ask me anything about Shadab's experience, projects, or skills.
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex w-full ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[85%] items-start gap-2 rounded-2xl px-4 py-3 text-sm ${
                    message.role === 'user'
                      ? 'bg-accent-indigo text-white rounded-tr-sm'
                      : 'bg-bg-surface2 text-text-primary border border-border-default rounded-tl-sm'
                  }`}
                >
                  <div className="flex-1 leading-relaxed break-words markdown-body text-[15px]">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold text-inherit" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        a: ({ node, ...props }) => <a className="underline underline-offset-2 hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex w-full justify-start">
                <div className="flex max-w-[85%] items-center gap-2 rounded-2xl rounded-tl-sm border border-border-default bg-bg-surface2 px-4 py-3 text-sm text-text-secondary">
                  <Loader2 className="h-4 w-4 animate-spin text-accent-indigo" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border-default bg-bg-surface1 p-3">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-full border border-border-default bg-bg-page px-4 py-2 focus-within:border-accent-indigo transition-colors"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-indigo text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
