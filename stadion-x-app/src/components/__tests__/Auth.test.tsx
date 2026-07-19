import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Auth } from '../../auth/Auth';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

// Mock dependencies
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signInWithOAuth: vi.fn(),
    }
  }
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Auth Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ user: null, loading: false });
  });

  const renderAuth = () => render(
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  );

  it('renders sign in form properly', () => {
    renderAuth();
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('staff@stadion-x.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('shows error when email or password is empty on submit', async () => {
    renderAuth();
    const submitBtn = screen.getByRole('button', { name: 'Sign in with email and password' });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Please enter both email and password.')).toBeInTheDocument();
  });

  it('allows user to type into inputs', () => {
    renderAuth();
    
    const emailInput = screen.getByPlaceholderText('staff@stadion-x.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'test@stadion-x.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@stadion-x.com');
    expect(passwordInput.value).toBe('password123');
  });
});
