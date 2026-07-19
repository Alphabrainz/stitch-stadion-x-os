import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DigitalTicket } from '../DigitalTicket';
import { useToastStore } from '../../../store/useToastStore';
import { ticketService } from '../../../services/ticketService';

vi.mock('../../../services/ticketService', () => ({
  ticketService: {
    cancelTicket: vi.fn()
  }
}));

describe('DigitalTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useToastStore.setState({ toasts: [] });
    vi.useRealTimers();
  });

  const renderTicket = () => render(<DigitalTicket />);

  it('renders standard ticket details', () => {
    renderTicket();
    expect(screen.getByText(/INDIA/)).toBeInTheDocument();
    expect(screen.getByText(/AUSTRALIA/)).toBeInTheDocument();
    expect(screen.getByText('Row F, Seat 12')).toBeInTheDocument();
    expect(screen.getByAltText('Ticket QR')).toBeInTheDocument();
  });

  it('toggles smart biometric pass', () => {
    renderTicket();
    const enableBtn = screen.getByText('Enable Smart Biometric Pass');
    fireEvent.click(enableBtn);
    
    // QR is still visible in the background, but scan instructions appear
    expect(screen.getByText('Scan Face ID to Activate')).toBeInTheDocument();
    expect(screen.getByText('Revert to QR Code')).toBeInTheDocument();
  });

  it('simulates biometric scanning flow', async () => {
    renderTicket();
    fireEvent.click(screen.getByText('Enable Smart Biometric Pass'));
    
    const scanBtn = screen.getByText('Scan Face ID to Activate');
    fireEvent.click(scanBtn);

    // After 2 seconds it should authenticate
    await waitFor(() => {
      expect(screen.getByText('Identity Verified - Pass Active')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Biometrics Verified. Smart Pass Activated.', type: 'success' })
      ])
    );
  });

  it('triggers wallet addition toasts', () => {
    renderTicket();
    
    fireEvent.click(screen.getByText('Add to Apple Wallet'));
    fireEvent.click(screen.getByText('Save to GPay'));
    fireEvent.click(screen.getByText('Save to Photos'));

    const toasts = useToastStore.getState().toasts;
    expect(toasts).toHaveLength(3);
    expect(toasts[0].message).toBe('Added to Apple Wallet');
    expect(toasts[1].message).toBe('Saved to Google Pay');
    expect(toasts[2].message).toBe('Ticket Saved to Photos');
  });

  it('cancels and refunds ticket', async () => {
    vi.useRealTimers();
    vi.mocked(ticketService.cancelTicket).mockResolvedValueOnce({ success: true, refundAmount: 150 });
    
    renderTicket();
    
    // Click Cancel Ticket
    fireEvent.click(screen.getByText('Cancel & Refund Ticket'));
    
    // Confirmation modal should appear
    expect(screen.getByText('Cancel Ticket?')).toBeInTheDocument();
    
    // Click Confirm Cancel
    fireEvent.click(screen.getByText('Confirm Cancel'));
    
    await waitFor(() => {
      expect(screen.getByText('Ticket Cancelled & Refunded')).toBeInTheDocument();
    });
    
    // Check ticket info has strikethrough (implied by text change or visual cancellation logic)
    // The image should be replaced or augmented by a VOID badge
    expect(screen.getAllByText('VOID')[0]).toBeInTheDocument();
    
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Refund of ₹15000 processed.', type: 'success' })
      ])
    );
  });
});
