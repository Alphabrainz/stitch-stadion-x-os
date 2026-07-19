import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useArcChat } from '../useArcChat';
import { aiService } from '../../services/aiService';

vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/fan' })
}));

vi.mock('../../services/aiService', () => ({
  aiService: {
    streamARC: vi.fn(),
    getSuggestedPrompts: vi.fn().mockReturnValue(['What is the score?'])
  }
}));

const mockSpeechRecognition = {
  isListening: false,
  startListening: vi.fn()
};

vi.mock('../useSpeechRecognition', () => ({
  useSpeechRecognition: (props: any) => {
    // Expose a way to manually trigger onResult for testing
    (global as any).triggerSpeechResult = props.onResult;
    return mockSpeechRecognition;
  }
}));

describe('useArcChat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock speech synthesis
    global.window.speechSynthesis = {
      speak: vi.fn(),
      getVoices: vi.fn().mockReturnValue([{ name: 'Google US English', lang: 'en-US' }]),
      cancel: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      onvoiceschanged: null,
      paused: false,
      pending: false,
      speaking: false
    } as unknown as SpeechSynthesis;
    
    global.SpeechSynthesisUtterance = class {
      text: string;
      voice: any;
      rate: number;
      pitch: number;
      constructor(text: string) {
        this.text = text;
        this.voice = null;
        this.rate = 1;
        this.pitch = 1;
      }
    } as any;
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useArcChat());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].text).toContain('ARC Initialized');
    expect(result.current.input).toBe('');
    expect(result.current.isTyping).toBe(false);
  });

  it('can toggle open state', () => {
    const { result } = renderHook(() => useArcChat());
    
    act(() => {
      result.current.setIsOpen(true);
    });
    
    expect(result.current.isOpen).toBe(true);
  });

  it('handles sending a message', async () => {
    vi.mocked(aiService.streamARC).mockImplementation(async (text, role, onChunk) => {
      onChunk('Hello');
      onChunk('Hello World');
      return 'Hello World';
    });

    const { result } = renderHook(() => useArcChat());
    
    await act(async () => {
      await result.current.handleSend('Test message');
    });

    expect(result.current.messages).toHaveLength(3); // Initial, User, AI
    expect(result.current.messages[1].role).toBe('user');
    expect(result.current.messages[1].text).toBe('Test message');
    
    expect(result.current.messages[2].role).toBe('ai');
    expect(result.current.messages[2].text).toBe('Hello World');
    expect(result.current.messages[2].isStreaming).toBe(false);
    
    expect(global.window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('handles AI service failure gracefully', async () => {
    vi.mocked(aiService.streamARC).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useArcChat());
    
    await act(async () => {
      await result.current.handleSend('Fail message');
    });

    expect(result.current.messages[2].text).toContain('lost connection');
  });

  it('can clear chat', () => {
    const { result } = renderHook(() => useArcChat());
    
    act(() => {
      result.current.clearChat();
    });
    
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].text).toContain('Memory cleared');
  });
  
  it('handles speech recognition result', async () => {
    vi.mocked(aiService.streamARC).mockResolvedValue('Response');
    
    const { result } = renderHook(() => useArcChat());
    
    await act(async () => {
      (global as any).triggerSpeechResult('Spoken message');
    });
    
    expect(result.current.messages[1].role).toBe('user');
    expect(result.current.messages[1].text).toBe('Spoken message');
  });
});
