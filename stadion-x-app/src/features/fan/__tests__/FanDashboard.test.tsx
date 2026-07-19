import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FanDashboard } from '../FanDashboard';
import { BrowserRouter } from 'react-router-dom';
import { useToastStore } from '../../../store/useToastStore';
import { useStadionStore } from '../../../store/useStadionStore';

// Mock DigitalTwinViewer as it uses Canvas/ThreeJS which doesn't render well in JSDOM
vi.mock('../../digitalTwin/DigitalTwinViewer', () => ({
  DigitalTwinViewer: () => <div data-testid="mock-digital-twin">3D Twin</div>
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('FanDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useToastStore.setState({ toasts: [] });
    useStadionStore.setState({ incidents: [] });
    vi.useFakeTimers();
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <FanDashboard />
      </BrowserRouter>
    );
  };

  it('renders welcome banner and widgets', () => {
    renderDashboard();
    
    expect(screen.getByText(/Welcome to Stadion X/i)).toBeInTheDocument();
    expect(screen.getByText(/INDIA VS AUSTRALIA/i)).toBeInTheDocument();
    expect(screen.getByText(/Gate B4 Wait Time/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-digital-twin')).toBeInTheDocument();
  });

  it('navigates to Smart Ticket on click', () => {
    renderDashboard();
    const ticketCard = screen.getByText('Smart Ticket').closest('.glass-card') || screen.getByText('Smart Ticket');
    fireEvent.click(ticketCard);
    expect(mockNavigate).toHaveBeenCalledWith('/fan/tickets');
  });

  it('navigates to Food Ordering on click', () => {
    renderDashboard();
    const foodCard = screen.getByText('Order Food').closest('.glass-card') || screen.getByText('Order Food');
    fireEvent.click(foodCard);
    expect(mockNavigate).toHaveBeenCalledWith('/fan/food');
  });

  it('triggers toast notifications for placeholder actions', () => {
    renderDashboard();
    
    fireEvent.click(screen.getByText('Seat Finder'));
    expect(useToastStore.getState().toasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Interactive Seat Finder launched on map.', type: 'info' })
      ])
    );
    
    fireEvent.click(screen.getByText('Smart Parking'));
    expect(useToastStore.getState().toasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Smart Parking Guidance Activated' })
      ])
    );
  });

  it('triggers SOS and creates incident on click', () => {
    renderDashboard();
    
    fireEvent.click(screen.getByText('SOS Report'));
    
    const incidents = useStadionStore.getState().incidents;
    expect(incidents.length).toBe(1);
    expect(incidents[0].type).toBe('Medical');
    
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'error' })
      ])
    );
  });

  it('updates timer every second', () => {
    renderDashboard();
    const initialTimer = screen.getByText(/Starts in 02:14:59/i);
    expect(initialTimer).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Starts in 02:14:58/i)).toBeInTheDocument();
  });
});
