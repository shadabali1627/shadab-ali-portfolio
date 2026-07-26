'use client';

import { Minus, RefreshCcw, Send, Bot, Loader2, X, Sparkles } from 'lucide-react';
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
          className={`fixed bottom-[5.5rem] right-6 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-bg-surface1/95 backdrop-blur-xl px-4 py-2.5 shadow-2xl transition-all duration-500 origin-bottom-right cursor-pointer hover:bg-bg-surface2/95 ${
            showGreeting
              ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
              : 'translate-y-4 scale-90 opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary shadow-inner">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-[13px] font-semibold text-white leading-tight">
              AI Assistant
            </span>
            <span className="text-[12px] text-white/70 leading-tight">
              Ask me about Shadab!
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(false);
            }}
            className="ml-1 rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
            aria-label="Dismiss greeting"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-6 right-6 z-50 animate-float">
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowGreeting(true)}
            onMouseLeave={() => setShowGreeting(false)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all hover:scale-110 active:scale-95 group relative"
            aria-label="Open chat"
          >
            <div className="absolute inset-0 rounded-full bg-accent-purple/40 animate-ping opacity-75"></div>
            <Sparkles className="h-7 w-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[500px] max-h-[80vh] w-[350px] flex-col overflow-hidden rounded-card border border-white/10 bg-bg-surface1/95 backdrop-blur-xl shadow-2xl transition-all duration-300 sm:w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-bg-surface2 to-bg-surface1 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-bg-surface2 bg-green-500"></span>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold text-white drop-shadow-sm">Chat with Shadab</h3>
            <p className="font-sans text-[11px] text-white/60">AI Assistant • Online</p>
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
          <div className="flex h-full flex-col items-center justify-center space-y-4 text-center opacity-70">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
              <Sparkles className="h-6 w-6 text-accent-indigo" />
            </div>
            <p className="text-sm text-text-secondary max-w-[80%]">
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
                <div className="flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/5 bg-bg-surface2 px-4 py-3 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce"></div>
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
