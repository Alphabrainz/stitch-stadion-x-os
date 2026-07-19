import { render, screen, fireEvent } from '@testing-library/react';
import { OpsDashboard } from '../OpsDashboard';
import { useStadionStore } from '../../../store/useStadionStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { axe } from 'jest-axe';

vi.mock('../../../store/useStadionStore', () => ({
  useStadionStore: vi.fn()
}));

// Mock the ARC Mission Control since it has complex internal logic (which should be unit tested separately)
vi.mock('../../ai/ArcMissionControl', () => ({
  ArcMissionControl: () => <div data-testid="mock-arc-mission-control">ARC AI Active</div>
}));

describe('OpsDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    // @ts-ignore
    useStadionStore.mockReturnValue({
      updateTeamPoints: vi.fn(),
      lockdownMode: false,
      setLockdownMode: vi.fn()
    });
  });

  it('renders Mission Control header', () => {
    render(<OpsDashboard />);
    expect(screen.getByText('Mission Control')).toBeInTheDocument();
  });

  it('renders Security Audit Log', () => {
    render(<OpsDashboard />);
    expect(screen.getByText('Security Audit Log')).toBeInTheDocument();
    expect(screen.getByText('BRUTE_FORCE_PREVENTION')).toBeInTheDocument();
  });

  it('shows LOCKDOWN ACTIVE badge when lockdownMode is true', () => {
    // @ts-ignore
    useStadionStore.mockReturnValue({
      updateTeamPoints: vi.fn(),
      lockdownMode: true,
      setLockdownMode: vi.fn()
    });
    
    render(<OpsDashboard />);
    expect(screen.getByText('LOCKDOWN ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('LIFT LOCKDOWN')).toBeInTheDocument();
  });

  it('calls setLockdownMode when Initiate Lockdown is clicked', () => {
    const mockSetLockdown = vi.fn();
    // @ts-ignore
    useStadionStore.mockReturnValue({
      updateTeamPoints: vi.fn(),
      lockdownMode: false,
      setLockdownMode: mockSetLockdown
    });
    
    render(<OpsDashboard />);
    const button = screen.getByText('INITIATE LOCKDOWN');
    fireEvent.click(button);
    expect(mockSetLockdown).toHaveBeenCalledWith(true);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<OpsDashboard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
