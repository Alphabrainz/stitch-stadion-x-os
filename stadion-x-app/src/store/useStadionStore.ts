import { create } from 'zustand';
import { getCurrentTimeString } from '../utils/dateUtils';
import { initialIncidents, initialLeaderboard } from '../constants/mockData';

export interface Incident {
  id: string;
  type: string;
  location: string;
  priority: 'Critical' | 'High' | 'Low';
  status: 'In Progress' | 'Unassigned' | 'Resolved';
  time: string;
}

export interface FoodOrder {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  time: string;
  status: 'Preparing' | 'Ready' | 'Delivered';
}

export interface FanNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface TeamLeaderboard {
  rank: number;
  country: string;
  code: string;
  played: number;
  won: number;
  points: number;
  nrr: string;
  flag: string;
}

interface StadionState {
  incidents: Incident[];
  orders: FoodOrder[];
  revenue: number;
  notifications: FanNotification[];
  leaderboard: TeamLeaderboard[];
  lockdownMode: boolean;
  
  // Actions
  addIncident: (incident: Omit<Incident, 'id' | 'time' | 'status'>) => string;
  resolveIncident: (id: string) => void;
  addOrder: (order: Omit<FoodOrder, 'id' | 'time' | 'status'>) => void;
  updateOrderStatus: (id: string, status: FoodOrder['status']) => void;
  addNotification: (message: string, type: FanNotification['type']) => void;
  removeNotification: (id: string) => void;
  updateTeamPoints: (code: string, isWin: boolean) => void;
  setLockdownMode: (active: boolean) => void;
}



export const useStadionStore = create<StadionState>((set) => ({
  incidents: initialIncidents,
  orders: [],
  revenue: 245000, // starting revenue
  notifications: [],
  leaderboard: initialLeaderboard,
  lockdownMode: false,

  addIncident: (incident) => {
    const id = `INC-${Math.floor(Math.random() * 1000) + 1000}`;
    const time = getCurrentTimeString(); // HH:MM:SS
    const newIncident: Incident = { ...incident, id, time, status: 'Unassigned' };
    
    set((state) => ({
      incidents: [newIncident, ...state.incidents]
    }));
    return id;
  },

  resolveIncident: (id) => {
    set((state) => ({
      incidents: state.incidents.map(inc => 
        inc.id === id ? { ...inc, status: 'Resolved' } : inc
      )
    }));
  },

  addOrder: (order) => {
    const id = `ORD-${Math.floor(Math.random() * 10000)}`;
    const time = getCurrentTimeString();
    const newOrder: FoodOrder = { ...order, id, time, status: 'Preparing' };
    
    set((state) => ({
      orders: [newOrder, ...state.orders],
      revenue: state.revenue + order.total
    }));
  },

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
    }));
  },

  addNotification: (message, type) => {
    set((state) => ({
      notifications: [...state.notifications, { id: Math.random().toString(), message, type }]
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  updateTeamPoints: (code, isWin) => {
    set((state) => {
      let updated = state.leaderboard.map(team => {
        if (team.code === code) {
          return {
            ...team,
            played: team.played + 1,
            won: team.won + (isWin ? 1 : 0),
            points: team.points + (isWin ? 2 : 0)
          };
        }
        return team;
      });

      // Re-sort and re-rank
      updated.sort((a, b) => b.points - a.points || parseFloat(b.nrr) - parseFloat(a.nrr));
      updated = updated.map((team, idx) => ({ ...team, rank: idx + 1 }));

      return { leaderboard: updated };
    });
  },

  setLockdownMode: (active) => {
    set({ lockdownMode: active });
  }
}));
