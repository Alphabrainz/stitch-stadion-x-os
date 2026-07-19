import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { useAuthStore } from '../../store/useAuthStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the store
vi.mock('../../store/useAuthStore', () => ({
  useAuthStore: vi.fn()
}));

const MockComponent = () => <div>Protected Content</div>;
const MockLogin = () => <div>Login Page</div>;
const MockOps = () => <div>Ops Dashboard</div>;

describe('ProtectedRoute', () => {
  const renderRoute = (allowedRole: 'fan' | 'employee') => {
    return render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<MockLogin />} />
          <Route path="/ops/*" element={<MockOps />} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute allowedRole={allowedRole}>
                <MockComponent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login if user is not authenticated', () => {
    // @ts-ignore - mocking store
    useAuthStore.mockReturnValue({ user: null });
    
    renderRoute('fan');
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('redirects employee attempting to access fan route', () => {
    // @ts-ignore
    useAuthStore.mockReturnValue({ user: { role: 'employee' } });
    
    renderRoute('fan');
    expect(screen.getByText('Ops Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders content if role matches', () => {
    // @ts-ignore
    useAuthStore.mockReturnValue({ user: { role: 'fan' } });
    
    renderRoute('fan');
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
