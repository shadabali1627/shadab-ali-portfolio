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

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', content }];
    setMessages(newMessages);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  if (!isOpen) {
    return (
      <>
        {/* Greeting Bubble */}
        <div
          className={`fixed bottom-24 right-4 sm:right-6 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-[#0a0a12]/95 backdrop-blur-2xl px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-500 origin-bottom-right cursor-pointer hover:border-indigo-500/40 hover:bg-[#0f0f18]/95 ${
            showGreeting
              ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
              : 'translate-y-3 scale-95 opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-xs font-semibold text-white leading-tight">
              AI Assistant
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Ask about projects & skills!
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(false);
            }}
            className="ml-1 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
            aria-label="Dismiss greeting"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Launcher Button with Ambient Pulse */}
        <div className="fixed bottom-5 right-4 sm:right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowGreeting(true)}
            onMouseLeave={() => setShowGreeting(false)}
            className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 group"
            aria-label="Open AI chat"
          >
            {/* Ambient Pulse Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-60 blur-md animate-pulse-ring pointer-events-none" />
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop overlay for mobile drawer */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 sm:hidden transition-opacity"
        onClick={() => setIsOpen(false)} 
      />

      {/* Main Chat Container / Drawer */}
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] h-[80vh] rounded-t-3xl sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[560px] sm:max-h-[85vh] sm:rounded-3xl z-50 flex flex-col overflow-hidden border border-white/15 bg-[#07070d]/90 backdrop-blur-2xl shadow-[0_12px_50px_rgba(0,0,0,0.8)] animate-slide-up-drawer sm:animate-none">
        {/* Subtle top border glow highlight */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent pointer-events-none" />

        {/* Mobile Grab Handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-12 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#07070d] bg-emerald-400"></span>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">AI Portfolio Assistant</h3>
              <p className="font-mono text-[10px] text-slate-400">Online • Powered by Groq & LLaMA</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleNewChat}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              title="Reset Conversation"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-3 shadow-inner">
                <Sparkles className="h-6 w-6 text-indigo-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">How can I help you today?</h4>
              <p className="text-xs text-slate-400 mb-6 max-w-[260px] leading-relaxed">
                Ask about Shadab's tech stack, production projects, background, or how to get in touch.
              </p>
              
              {/* Sleek Interactive Pill Chips */}
              <div className="flex flex-wrap justify-center gap-2 w-full max-w-sm">
                {[
                  "Tell me about Shadab",
                  "Core AI & Tech Stack",
                  "Featured Projects",
                  "How to get in touch?",
                ].map((question, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(question)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white text-xs text-slate-300 font-mono transition-all duration-200 hover:scale-105 active:scale-95 text-left"
                  >
                    <span>{question}</span>
                    <span className="text-indigo-400 text-xs">→</span>
                  </button>
                ))}
              </div>
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
                    className={`flex max-w-[88%] items-start gap-2.5 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-xs shadow-md'
                        : 'bg-white/[0.04] text-slate-200 border border-white/10 rounded-tl-xs backdrop-blur-md'
                    }`}
                  >
                    <div className="flex-1 break-words prose prose-invert max-w-none text-xs sm:text-sm">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                          li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                          a: ({ node, ...props }) => <a className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                          code: ({ node, ...props }) => <code className="bg-white/10 text-indigo-300 rounded px-1.5 py-0.5 font-mono text-[11px]" {...props} />,
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
                  <div className="flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-tl-xs border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-white/10 bg-white/[0.01] p-3 sm:p-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#050508]/80 px-4 py-2 focus-within:border-indigo-500/60 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about Shadab..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
