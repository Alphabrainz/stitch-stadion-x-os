import type { Incident, TeamLeaderboard } from '../store/useStadionStore';

export const initialIncidents: Incident[] = [
  { id: 'INC-991', type: 'Medical', location: 'Sector 204', priority: 'High', status: 'In Progress', time: '14:22:11' },
  { id: 'INC-992', type: 'Security', location: 'Gate B4', priority: 'Critical', status: 'Unassigned', time: '14:25:00' },
  { id: 'INC-993', type: 'Maintenance', location: 'Floodlight 7', priority: 'Low', status: 'Resolved', time: '13:10:45' },
];

export const initialLeaderboard: TeamLeaderboard[] = [
  { rank: 1, country: 'India', code: 'IND', played: 5, won: 5, points: 10, nrr: '+1.353', flag: 'in' },
  { rank: 2, country: 'Australia', code: 'AUS', played: 5, won: 4, points: 8, nrr: '+0.976', flag: 'au' },
  { rank: 3, country: 'South Africa', code: 'RSA', played: 5, won: 4, points: 8, nrr: '+0.765', flag: 'za' },
  { rank: 4, country: 'England', code: 'ENG', played: 5, won: 2, points: 4, nrr: '-0.122', flag: 'gb-eng' },
  { rank: 5, country: 'New Zealand', code: 'NZ', played: 5, won: 1, points: 2, nrr: '-0.567', flag: 'nz' },
];
