import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { useAuthStore } from '../../store/useAuthStore';
import { aiService } from '../../services/aiService';

type Message = {
  id: string;
  role: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
};

export const ArcChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', role: 'ai', text: 'ARC Initialized. I have synced with your location context. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const getSuggestedPrompts = () => {
    return aiService.getSuggestedPrompts(user?.role || undefined, location.pathname);
  };

  const clearChat = () => {
    setMessages([
      { id: Date.now().toString(), role: 'ai', text: 'Memory cleared. How can I help you?' }
    ]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsgId = Date.now().toString();
    const aiMsgId = (Date.now() + 1).toString();

    // Add user message
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: text.trim() }]);
    setInput('');
    setIsTyping(true);

    // Create an empty AI message to stream into
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true }]);

    try {
      const fullResponse = await aiService.streamARC(text, user?.role || undefined, (chunk) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: chunk } : msg
          )
        );
      });
      
      // Mark as done streaming
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
      
      // Speak the response!
      try {
        const utterance = new SpeechSynthesisUtterance(fullResponse);
        // Find a good voice if possible
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google')) || voices.find(v => v.lang.includes('en'));
        if (englishVoice) utterance.voice = englishVoice;
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("Speech Synthesis failed", e);
      }
      
    } catch (_error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, text: "I'm sorry, I lost connection to the intelligence core.", isStreaming: false } : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const startListening = () => {
    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Your browser does not support Voice Recognition.");
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const isOps = user?.role === 'employee';
  const themeColor = isOps ? 'text-brand-red' : 'text-primary';
  const themeBg = isOps ? 'bg-brand-red' : 'bg-primary';
  const themeBorder = isOps ? 'border-brand-red' : 'border-primary';

  return (
    <>
      {/* Floating Launcher Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-[110px] md:bottom-8 right-4 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all z-50 group shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity ${themeBg}`}></div>
        <span className={`material-symbols-outlined text-[28px] md:text-[32px] relative z-10 transition-transform group-hover:scale-110 ${themeColor}`}>
          {isOps ? 'radar' : 'smart_toy'}
        </span>
      </button>

      {/* Chatbase-Style Widget Modal */}
      <div className={`fixed bottom-0 md:bottom-8 right-0 md:right-8 w-full md:w-[400px] h-[85vh] md:h-[650px] max-h-screen z-50 flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <GlassCard className="flex flex-col h-full w-full p-0 border-white/10 md:rounded-3xl rounded-b-none shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden bg-surface-container-high/90 backdrop-blur-[80px]">
          
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-black border ${themeBorder}/30 shadow-lg relative`}>
                 <span className={`material-symbols-outlined text-[20px] ${themeColor}`}>
                   {isOps ? 'psychology' : 'smart_toy'}
                 </span>
                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-white tracking-tight text-sm">
                  ARC {isOps ? 'Tactical AI' : 'Assistant'}
                </h3>
                <p className="text-[11px] text-white/50 font-medium tracking-wide">
                  Typically replies instantly
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button onClick={clearChat} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10" title="Reset Chat">
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10 hidden md:block">
                <span className="material-symbols-outlined text-[24px]">expand_more</span>
              </button>
              {/* Mobile close button */}
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10 md:hidden">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 custom-scrollbar bg-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                
                {/* AI Avatar */}
                {msg.role === 'ai' && (
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 mr-3 flex items-center justify-center bg-black/50 border border-white/10 ${themeColor}`}>
                    <span className="material-symbols-outlined text-[16px]">{isOps ? 'psychology' : 'smart_toy'}</span>
                  </div>
                )}
                
                <div className={`max-w-[80%] p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? `${themeBg} text-black font-medium rounded-br-sm`
                    : 'bg-white/10 border border-white/5 text-white/90 rounded-bl-sm backdrop-blur-md'
                }`}>
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-white/70 animate-pulse align-middle"></span>}
                  
                  {/* Inline 3D Map for Wayfinding queries */}
                  {!msg.isStreaming && msg.role === 'ai' && (msg.text.toLowerCase().includes('washroom') || msg.text.toLowerCase().includes('sector 204') || msg.text.toLowerCase().includes('golden grill') || msg.text.toLowerCase().includes('gate b4')) && (
                    <div className="mt-4 p-0 relative w-full aspect-[4/3] rounded-xl border border-primary/30 overflow-hidden group">
                      {/* Interactive WebGL 3D Stadium Model */}
                      <iframe 
                        title="3D Stadium Viewer" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; fullscreen; xr-spatial-tracking" 
                        xr-spatial-tracking="true" 
                        execution-while-out-of-viewport="true" 
                        execution-while-not-rendered="true" 
                        web-share="true" 
                        src="https://sketchfab.com/models/67602830cbd54d4799e76a6931c5d150/embed?autostart=1&camera=0&preload=1&transparent=1&ui_infos=0&ui_controls=1&ui_stop=0&ui_watermark=0&scrollwheel=1" 
                        className="w-full h-full bg-black"
                      ></iframe>
                      
                      {/* Pin Overlay */}
                      <div className="absolute top-[35%] left-[65%] pointer-events-none">
                        <div className="relative flex flex-col items-center animate-bounce shadow-2xl">
                          <div className="bg-primary px-3 py-1.5 rounded-lg text-xs font-black text-black whitespace-nowrap border-2 border-white mb-1 shadow-[0_0_20px_rgba(212,175,55,1)] flex items-center gap-1 uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[14px]">
                              {msg.text.toLowerCase().includes('washroom') ? 'wc' : 
                               msg.text.toLowerCase().includes('golden grill') ? 'restaurant' : 'event_seat'}
                            </span> 
                            {msg.text.toLowerCase().includes('washroom') ? 'Washroom' : 
                             msg.text.toLowerCase().includes('golden grill') ? 'Food' : 'Your Seat'}
                          </div>
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]"></div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 left-0 w-full flex justify-center pointer-events-none">
                        <span className="bg-black/60 text-white/50 text-[10px] px-2 py-1 rounded backdrop-blur-md uppercase tracking-widest">Interactive 3D View - Drag to rotate</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && messages[messages.length - 1].role === 'user' && (
              <div className="flex justify-start animate-fade-in-up">
                <div className={`w-8 h-8 rounded-full flex-shrink-0 mr-3 flex items-center justify-center bg-black/50 border border-white/10 ${themeColor}`}>
                    <span className="material-symbols-outlined text-[16px]">{isOps ? 'psychology' : 'smart_toy'}</span>
                </div>
                <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm p-4 flex items-center gap-1.5 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/60 border-t border-white/10 backdrop-blur-xl">
             {/* Suggested Prompts (Scrollable pills) */}
             {!isTyping && messages.length < 3 && (
              <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-2 snap-x">
                {getSuggestedPrompts().map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="snap-start whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-medium transition-all bg-white/5 border border-white/10 text-white hover:bg-white/10 flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative flex items-center">
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask ARC anything..."}
                disabled={isTyping || isListening}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-4 pr-24 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all disabled:opacity-50"
              />
              
              <div className="absolute right-2 flex gap-1 items-center">
                <button 
                  type="button" 
                  onClick={startListening}
                  disabled={isTyping || isListening}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                    isListening ? 'bg-brand-red text-white animate-pulse' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Speak to ARC"
                >
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                </button>
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                    input.trim() && !isTyping ? `${themeBg} text-black hover:scale-105 shadow-lg` : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <p className="text-[10px] text-white/30 font-medium">Powered by ARC Intelligence</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );
};
