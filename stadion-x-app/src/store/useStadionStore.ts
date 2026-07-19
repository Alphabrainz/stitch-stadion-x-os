import { create } from 'zustand';

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

const initialIncidents: Incident[] = [
  { id: 'INC-991', type: 'Medical', location: 'Sector 204', priority: 'High', status: 'In Progress', time: '14:22:11' },
  { id: 'INC-992', type: 'Security', location: 'Gate B4', priority: 'Critical', status: 'Unassigned', time: '14:25:00' },
  { id: 'INC-993', type: 'Maintenance', location: 'Floodlight 7', priority: 'Low', status: 'Resolved', time: '13:10:45' },
];

const initialLeaderboard: TeamLeaderboard[] = [
  { rank: 1, country: 'India', code: 'IND', played: 5, won: 5, points: 10, nrr: '+1.353', flag: 'in' },
  { rank: 2, country: 'Australia', code: 'AUS', played: 5, won: 4, points: 8, nrr: '+0.976', flag: 'au' },
  { rank: 3, country: 'South Africa', code: 'RSA', played: 5, won: 4, points: 8, nrr: '+0.765', flag: 'za' },
  { rank: 4, country: 'England', code: 'ENG', played: 5, won: 2, points: 4, nrr: '-0.122', flag: 'gb-eng' },
  { rank: 5, country: 'New Zealand', code: 'NZ', played: 5, won: 1, points: 2, nrr: '-0.567', flag: 'nz' },
];

export const useStadionStore = create<StadionState>((set) => ({
  incidents: initialIncidents,
  orders: [],
  revenue: 245000, // starting mock revenue
  notifications: [],
  leaderboard: initialLeaderboard,
  lockdownMode: false,

  addIncident: (incident) => {
    const id = `INC-${Math.floor(Math.random() * 1000) + 1000}`;
    const time = new Date().toLocaleTimeString('en-GB'); // HH:MM:SS
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
    const time = new Date().toLocaleTimeString('en-GB');
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
