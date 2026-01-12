"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ChevronDown,
  Sparkles,
  Gamepad2,
  BookOpen,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  { label: "Career Roadmap", icon: Briefcase, query: "Can you help me build a career roadmap for Web Development?" },
  { label: "Internships", icon: Sparkles, query: "What are the best platforms to find tech internships?" },
  { label: "Projects", icon: Gamepad2, query: "Give me some unique project ideas for a 2nd-year CS student." },
  { label: "Skill Path", icon: BookOpen, query: "How should I start learning AI and Machine Learning?" },
];

export function CampusConnectChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi there! I'm CampusConnect AI, your career mentor. How can I help you today? Whether it's internships, skills, or projects, I've got your back!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content
          }))
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "bot", content: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I'm having some trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] sm:w-[420px] h-[600px] max-h-[80vh] flex flex-col bg-black/80 backdrop-blur-3xl border border-white/20 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 p-[1px]">
                  <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">CampusConnect AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Always Online</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border",
                      msg.role === "user" ? "bg-white/10 border-white/10" : "bg-cyan-500/10 border-cyan-500/20"
                    )}>
                      {msg.role === "user" ? <User className="w-4 h-4 text-white/60" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user" 
                        ? "bg-cyan-500 text-black font-medium rounded-tr-none" 
                        : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                    )}>
                      {msg.content.split('\n').map((line, j) => (
                        <p key={j} className={j > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border bg-cyan-500/10 border-cyan-500/20">
                      <Bot className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span className="text-sm text-white/40">CampusConnect is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
              
              {messages.length === 1 && (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {SUGGESTED_QUESTIONS.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(item.query)}
                      className="text-left p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all group"
                    >
                      <item.icon className="w-4 h-4 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-white/60 group-hover:text-white">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10 bg-black/40">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="relative flex items-center gap-3"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your career..."
                  className="h-12 bg-white/5 border-white/10 rounded-2xl text-sm focus:border-cyan-500/30 text-white placeholder:text-white/20"
                />
                <Button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="h-12 w-12 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black flex-shrink-0 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
              <p className="mt-4 text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                Powered by Gemini 1.5 Flash
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-[24px] flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-500",
          isOpen 
            ? "bg-rose-500 rotate-90" 
            : "bg-gradient-to-br from-cyan-400 to-purple-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
        )}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white fill-white/20" />
        )}
      </motion.button>
    </div>
  );
}
