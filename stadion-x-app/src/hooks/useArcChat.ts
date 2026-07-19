import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { aiService } from '../services/aiService';
import { useSpeechRecognition } from './useSpeechRecognition';

export type Message = {
  id: string;
  role: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
};

export const useArcChat = () => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

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

    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: text.trim() }]);
    setInput('');
    setIsTyping(true);

    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true }]);

    try {
      const fullResponse = await aiService.streamARC(text, user?.role || undefined, (chunk) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: chunk } : msg
          )
        );
      });
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
      
      try {
        const utterance = new SpeechSynthesisUtterance(fullResponse);
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google')) || voices.find(v => v.lang.includes('en'));
        if (englishVoice) utterance.voice = englishVoice;
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("Speech Synthesis failed", e);
      }
      
    } catch (error) {
      console.error('AI response failed:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, text: "I'm sorry, I lost connection to the intelligence core.", isStreaming: false } : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const { isListening, startListening } = useSpeechRecognition({
    onResult: (transcript: string) => {
      setInput(transcript);
      handleSend(transcript);
    }
  });

  return {
    isOpen,
    setIsOpen,
    user,
    messagesEndRef,
    inputRef,
    messages,
    input,
    setInput,
    isTyping,
    isListening,
    startListening,
    handleSend,
    clearChat,
    getSuggestedPrompts
  };
};
