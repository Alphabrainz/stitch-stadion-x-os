import { describe, it, expect } from 'vitest';
import { analyticsService } from '../analyticsService';

describe('analyticsService', () => {
  it('should fetch predictive metrics successfully', async () => {
    const metrics = await analyticsService.fetchPredictiveMetrics();
    expect(metrics).toHaveProperty('predictedCrowdPeakTime');
    expect(metrics.predictedCrowdPeakTime).toBe('19:30');
    expect(metrics.estimatedConcessionWaitTime).toBe('14 mins');
    expect(metrics.securityIncidentProbability).toBe(0.12);
  });

  it('should fetch revenue stats successfully', async () => {
    const revenue = await analyticsService.fetchRevenueStats();
    expect(revenue).toHaveProperty('foodAndBeverage');
    expect(revenue.foodAndBeverage).toBe(42500);
    expect(revenue.merchandise).toBe(18200);
    expect(revenue.ticketUpgrades).toBe(5400);
  });
});
