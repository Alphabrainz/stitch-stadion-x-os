import { describe, it, expect, beforeEach } from 'vitest';
import { useStadionStore } from '../useStadionStore';

describe('useStadionStore', () => {
  beforeEach(() => {
    // Reset state before each test if necessary by getting initial state manually or resetting it.
    useStadionStore.setState({
      incidents: [],
      orders: [],
      revenue: 0,
      notifications: [],
      lockdownMode: false,
      leaderboard: [
        { rank: 1, country: 'India', code: 'IND', played: 0, won: 0, points: 0, nrr: '0.0', flag: 'in' },
        { rank: 2, country: 'Australia', code: 'AUS', played: 0, won: 0, points: 0, nrr: '0.0', flag: 'au' }
      ]
    });
  });

  it('should initialize with lockdownMode false', () => {
    const { lockdownMode } = useStadionStore.getState();
    expect(lockdownMode).toBe(false);
  });

  it('should toggle lockdownMode', () => {
    useStadionStore.getState().setLockdownMode(true);
    expect(useStadionStore.getState().lockdownMode).toBe(true);
    
    useStadionStore.getState().setLockdownMode(false);
    expect(useStadionStore.getState().lockdownMode).toBe(false);
  });

  it('should add and resolve an incident', () => {
    const id = useStadionStore.getState().addIncident({
      type: 'Medical',
      location: 'Sector A',
      priority: 'High'
    });
    
    const stateAfterAdd = useStadionStore.getState();
    expect(stateAfterAdd.incidents).toHaveLength(1);
    expect(stateAfterAdd.incidents[0].id).toBe(id);
    expect(stateAfterAdd.incidents[0].status).toBe('Unassigned');

    useStadionStore.getState().resolveIncident(id);
    const stateAfterResolve = useStadionStore.getState();
    expect(stateAfterResolve.incidents[0].status).toBe('Resolved');
  });

  it('should add an order and update revenue', () => {
    useStadionStore.getState().addOrder({
      items: [{ name: 'Burger', qty: 2, price: 10 }],
      total: 20
    });

    const state = useStadionStore.getState();
    expect(state.orders).toHaveLength(1);
    expect(state.revenue).toBe(20);
    expect(state.orders[0].status).toBe('Preparing');

    // Update status
    useStadionStore.getState().updateOrderStatus(state.orders[0].id, 'Delivered');
    expect(useStadionStore.getState().orders[0].status).toBe('Delivered');
  });

  it('should manage notifications', () => {
    useStadionStore.getState().addNotification('Test Alert', 'warning');
    const stateAfterAdd = useStadionStore.getState();
    expect(stateAfterAdd.notifications).toHaveLength(1);
    expect(stateAfterAdd.notifications[0].message).toBe('Test Alert');
    
    const notifId = stateAfterAdd.notifications[0].id;
    useStadionStore.getState().removeNotification(notifId);
    expect(useStadionStore.getState().notifications).toHaveLength(0);
  });

  it('should update team points and rerank leaderboard', () => {
    useStadionStore.getState().updateTeamPoints('AUS', true);
    const state = useStadionStore.getState();
    
    const aus = state.leaderboard.find(t => t.code === 'AUS');
    expect(aus?.points).toBe(2);
    expect(aus?.won).toBe(1);
    expect(aus?.rank).toBe(1); // AUS should overtake IND because 2 > 0

    const ind = state.leaderboard.find(t => t.code === 'IND');
    expect(ind?.rank).toBe(2);
  });
});
