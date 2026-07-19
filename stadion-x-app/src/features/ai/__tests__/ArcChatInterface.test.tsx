import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArcChatInterface } from '../ArcChatInterface';
import * as useArcChatModule from '../../../hooks/useArcChat';

vi.mock('../../../hooks/useSpeechRecognition', () => ({
  useSpeechRecognition: vi.fn()
}));

describe('ArcChatInterface', () => {
  const mockHandleSend = vi.fn();
  const mockSetIsOpen = vi.fn();
  const mockSetInput = vi.fn();
  const mockStartListening = vi.fn();
  const mockClearChat = vi.fn();
  const mockGetSuggestedPrompts = vi.fn().mockReturnValue(['What is the score?']);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useArcChatModule, 'useArcChat').mockReturnValue({
      isOpen: false,
      setIsOpen: mockSetIsOpen,
      user: { role: 'fan' } as any,
      messagesEndRef: { current: null },
      inputRef: { current: null },
      messages: [{ id: '1', role: 'ai', text: 'Hello' }],
      input: '',
      setInput: mockSetInput,
      isTyping: false,
      isListening: false,
      startListening: mockStartListening,
      handleSend: mockHandleSend,
      clearChat: mockClearChat,
      getSuggestedPrompts: mockGetSuggestedPrompts
    });
  });

  const renderComponent = () => render(<ArcChatInterface />);

  it('renders closed state (floating action button)', () => {
    renderComponent();
    const fab = screen.getByRole('button', { name: /open arc chat/i });
    expect(fab).toBeInTheDocument();
    
    fireEvent.click(fab);
    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it('renders open state and messages', () => {
    vi.spyOn(useArcChatModule, 'useArcChat').mockReturnValueOnce({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      user: { role: 'fan' } as any,
      messagesEndRef: { current: null },
      inputRef: { current: null },
      messages: [{ id: '1', role: 'ai', text: 'Hello from ARC' }],
      input: '',
      setInput: mockSetInput,
      isTyping: false,
      isListening: false,
      startListening: mockStartListening,
      handleSend: mockHandleSend,
      clearChat: mockClearChat,
      getSuggestedPrompts: mockGetSuggestedPrompts
    });

    renderComponent();
    expect(screen.getByText('Hello from ARC')).toBeInTheDocument();
    
    const closeBtn = screen.getByLabelText('Close ARC Chat');
    fireEvent.click(closeBtn);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('submits input form', () => {
    vi.spyOn(useArcChatModule, 'useArcChat').mockReturnValueOnce({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      user: { role: 'fan' } as any,
      messagesEndRef: { current: null },
      inputRef: { current: null },
      messages: [],
      input: 'Test message',
      setInput: mockSetInput,
      isTyping: false,
      isListening: false,
      startListening: mockStartListening,
      handleSend: mockHandleSend,
      clearChat: mockClearChat,
      getSuggestedPrompts: mockGetSuggestedPrompts
    });

    renderComponent();
    
    // Find input
    const input = screen.getByPlaceholderText('Ask ARC anything...');
    fireEvent.change(input, { target: { value: 'Test message' } });

    // Submit form
    const form = input.closest('form');
    fireEvent.submit(form!);
    expect(mockHandleSend).toHaveBeenCalledWith('Test message');
  });

  it('toggles microphone', () => {
    vi.spyOn(useArcChatModule, 'useArcChat').mockReturnValueOnce({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      user: { role: 'fan' } as any,
      messagesEndRef: { current: null },
      inputRef: { current: null },
      messages: [],
      input: '',
      setInput: mockSetInput,
      isTyping: false,
      isListening: false,
      startListening: mockStartListening,
      handleSend: mockHandleSend,
      clearChat: mockClearChat,
      getSuggestedPrompts: mockGetSuggestedPrompts
    });

    renderComponent();
    
    const micBtn = screen.getByLabelText('Speak to ARC');
    fireEvent.click(micBtn);
    expect(mockStartListening).toHaveBeenCalled();
  });
  
  it('clears chat', () => {
    vi.spyOn(useArcChatModule, 'useArcChat').mockReturnValueOnce({
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      user: { role: 'fan' } as any,
      messagesEndRef: { current: null },
      inputRef: { current: null },
      messages: [],
      input: '',
      setInput: mockSetInput,
      isTyping: false,
      isListening: false,
      startListening: mockStartListening,
      handleSend: mockHandleSend,
      clearChat: mockClearChat,
      getSuggestedPrompts: mockGetSuggestedPrompts
    });

    renderComponent();
    
    const clearBtn = screen.getByLabelText('Reset Chat');
    fireEvent.click(clearBtn);
    expect(mockClearChat).toHaveBeenCalled();
  });
});
