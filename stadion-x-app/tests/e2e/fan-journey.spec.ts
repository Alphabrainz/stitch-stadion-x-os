import { test, expect } from '@playwright/test';

test.describe('Fan Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Setup authenticated state for fan
    await page.addInitScript(() => {
      window.localStorage.setItem('stadion-auth-storage', JSON.stringify({
        state: { user: { uid: '123', role: 'fan', displayName: 'Fan User' } },
        version: 0
      }));
    });
  });

  test('should load fan dashboard and render 3D Twin', async ({ page }) => {
    await page.goto('/fan');
    
    // Verify Dashboard loads
    await expect(page.getByRole('heading', { name: /welcome to stadion x/i })).toBeVisible();
    
    // Verify Digital Twin Canvas exists (React Three Fiber canvas element)
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    // Verify Quick Actions
    await expect(page.getByText('My Tickets')).toBeVisible();
    await expect(page.getByText('Order Food')).toBeVisible();
  });

  test('should navigate to map and back', async ({ page }) => {
    await page.goto('/fan');
    
    // Click Navigation Map
    await page.getByText('Navigation Map').click();
    await expect(page).toHaveURL(/.*fan\/map/);
    
    // Should see Map placeholder
    await expect(page.getByText(/Interactive Map/i)).toBeVisible();
  });
});
