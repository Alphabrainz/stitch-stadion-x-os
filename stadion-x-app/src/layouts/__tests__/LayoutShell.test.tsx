import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LayoutShell } from '../LayoutShell';
import { useAuthStore } from '../../store/useAuthStore';
import { useStadionStore } from '../../store/useStadionStore';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../TopNav', () => ({ TopNav: () => <div data-testid="topnav">TopNav</div> }));
vi.mock('../SideNav', () => ({ SideNav: () => <div data-testid="sidenav">SideNav</div> }));
vi.mock('../BottomDock', () => ({ BottomDock: () => <div data-testid="bottomdock">BottomDock</div> }));
vi.mock('../../hooks/useInactivityTimeout', () => ({ useInactivityTimeout: vi.fn() }));

describe('LayoutShell', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ user: { uid: '123', email: 'test@stadion-x.com', role: 'fan', displayName: 'Test Fan', photoURL: null } });
    useStadionStore.setState({ lockdownMode: false, notifications: [], incidents: [] });
  });

  const renderLayout = () => render(
    <BrowserRouter>
      <LayoutShell>
        <div data-testid="children">Content</div>
      </LayoutShell>
    </BrowserRouter>
  );

  it('renders standard layout for fan', () => {
    renderLayout();
    expect(screen.getByTestId('topnav')).toBeInTheDocument();
    expect(screen.queryByTestId('sidenav')).not.toBeInTheDocument(); // Fans don't see sidenav
    expect(screen.getByTestId('bottomdock')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('renders layout with SideNav for employee', () => {
    useAuthStore.setState({ user: { uid: '123', email: 'staff@stadion-x.com', role: 'employee', displayName: 'Test Staff', photoURL: null } });
    renderLayout();
    
    expect(screen.getByTestId('topnav')).toBeInTheDocument();
    expect(screen.getByTestId('sidenav')).toBeInTheDocument(); // Employees see sidenav
    expect(screen.getByTestId('bottomdock')).toBeInTheDocument();
  });

  it('renders notifications', () => {
    useStadionStore.getState().addNotification('Test Notification', 'info');
    renderLayout();
    
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    
    // Close notification
    fireEvent.click(screen.getByLabelText('Close notification'));
    expect(screen.queryByText('Test Notification')).not.toBeInTheDocument();
  });

  it('renders global lockdown mode for fans', () => {
    useStadionStore.setState({ lockdownMode: true });
    renderLayout();
    
    expect(screen.getByText('Lockdown')).toBeInTheDocument();
    expect(screen.getByText('Emergency Protocols Active')).toBeInTheDocument();
    
    // Trigger SOS
    fireEvent.click(screen.getByText('Trigger SOS'));
    
    const state = useStadionStore.getState();
    expect(state.lockdownMode).toBe(false); // Should dismiss
    expect(state.incidents).toHaveLength(1);
    expect(state.incidents[0].type).toBe('Security');
  });

  it('does not render lockdown mode for employees', () => {
    useAuthStore.setState({ user: { uid: '123', email: 'staff@stadion-x.com', role: 'employee', displayName: 'Test Staff', photoURL: null } });
    useStadionStore.setState({ lockdownMode: true });
    renderLayout();
    
    expect(screen.queryByText('Lockdown')).not.toBeInTheDocument();
  });
});
