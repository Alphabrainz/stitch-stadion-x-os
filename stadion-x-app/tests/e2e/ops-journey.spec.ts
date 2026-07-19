import { test, expect } from '@playwright/test';

test.describe('Ops Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Setup authenticated state for employee
    await page.addInitScript(() => {
      window.localStorage.setItem('stadion-auth-storage', JSON.stringify({
        state: { user: { uid: '999', role: 'employee', displayName: 'Ops Admin' } },
        version: 0
      }));
    });
  });

  test('should load Ops dashboard and ARC Mission Control', async ({ page }) => {
    await page.goto('/ops');
    
    // Verify Dashboard loads
    await expect(page.getByRole('heading', { name: /mission control/i })).toBeVisible();
    
    // Verify ARC AI is present
    await expect(page.getByText(/ARC AI Operations/i)).toBeVisible();
    
    // Verify Security Audit Log
    await expect(page.getByText(/Security Audit Log/i)).toBeVisible();
  });

  test('should trigger Global Lockdown', async ({ page }) => {
    await page.goto('/ops');
    
    // Initial state: not in lockdown
    const lockdownBtn = page.getByRole('button', { name: /INITIATE GLOBAL LOCKDOWN/i });
    await expect(lockdownBtn).toBeVisible();
    
    // Click it
    await lockdownBtn.click();
    
    // State changes
    await expect(page.getByRole('button', { name: /LIFT LOCKDOWN/i })).toBeVisible();
    
    // The top right badge should show LOCKDOWN ACTIVE
    await expect(page.getByText('LOCKDOWN ACTIVE')).toBeVisible();
  });
});
