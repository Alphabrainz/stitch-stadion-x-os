import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow manual sign in and redirect to role selection', async ({ page }) => {
    await page.goto('/');

    // Wait for the terminal boot animation (or just skip by waiting for the inputs)
    const emailInput = page.getByRole('textbox', { name: /email address/i });
    const passwordInput = page.getByLabel(/password/i);
    const signInButton = page.getByRole('button', { name: /sign in with email and password/i });

    // Since we have a brute force lockout, we should be careful not to trigger it.
    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');
    
    // Intercept or assume the mock handles it. Since we are hitting the dev server, 
    // it will actually hit Supabase unless mocked. If we use the fallback in catch block,
    // it triggers the brute force error now instead of fallback logging in.
    // To make this pass robustly in CI without real Supabase, we'd mock the route:
    await page.route('**/*supabase.co/auth/v1/token*', async route => {
      const json = {
        access_token: 'fake-token',
        user: { id: '123', email: 'test@example.com', user_metadata: { full_name: 'Test User' } }
      };
      await route.fulfill({ json });
    });

    await signInButton.click();

    // Verify it redirects to role selection
    await expect(page).toHaveURL(/.*role-selection/);
    await expect(page.getByRole('heading', { name: /select your access level/i })).toBeVisible();
  });

  test('should enforce rate limiting after 3 failed attempts', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.getByRole('textbox', { name: /email address/i });
    const passwordInput = page.getByLabel(/password/i);
    const signInButton = page.getByRole('button', { name: /sign in with email and password/i });

    // Mock failure
    await page.route('**/*supabase.co/auth/v1/token*', async route => {
      await route.fulfill({ status: 400, json: { error: 'invalid_credentials' } });
    });

    await emailInput.fill('hacker@hacker.com');
    await passwordInput.fill('wrongpassword');

    await signInButton.click();
    await expect(page.getByText(/2 attempts remaining/i)).toBeVisible();

    await signInButton.click();
    await expect(page.getByText(/1 attempts remaining/i)).toBeVisible();

    await signInButton.click();
    await expect(page.getByText(/SECURITY LOCKDOWN/i)).toBeVisible();
    await expect(signInButton).toBeDisabled();
  });
});
