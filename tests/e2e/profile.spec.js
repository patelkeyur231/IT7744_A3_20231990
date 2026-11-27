import { test, expect } from '@playwright/test';

test.describe('Edit profile', () => {
    test('a user can change their username, password and avatar', async ({ page }) => {
        const name = `profile${Date.now()}`;

        await page.goto('/register');
        await page.fill('#username', name);
        await page.fill('#email', `${name}@example.com`);
        await page.fill('#password', 'secret');
        await page.fill('#password_confirmation', 'secret');
        await page.click('button:has-text("Register")');

        await page.click('.round-btn');
        await page.click('a:has-text("Edit Profile")');
        await expect(page.locator('#username')).toHaveValue(name);

        await page.fill('#username', `${name}x`);
        await page.fill('#password', 'newsecret');
        await page.fill('#password_confirmation', 'newsecret');
        await page.setInputFiles('#avatar', 'tests/fixtures/test-image.jpg');
        await page.click('button:has-text("Update Profile")');

        await expect(page.locator('text=Profile updated successfully!')).toBeVisible();
        await expect(page.locator('.round-btn img')).toHaveAttribute('src', /storage\/avatars\//);

        // new password works
        await page.click('.round-btn');
        await page.click('button:has-text("Logout")');
        await page.goto('/login');
        await page.fill('#email', `${name}x`);
        await page.fill('#password', 'newsecret');
        await page.click('button:has-text("Login")');
        await expect(page.locator('h1')).toContainText(`Welcome ${name}x`);
    });

    test('email already used by someone else is rejected', async ({ page }) => {
        await page.goto('/login');
        await page.fill('#email', 'testuser');
        await page.fill('#password', 'password');
        await page.click('button:has-text("Login")');

        await page.goto('/profile');
        await page.fill('#email', 'admin@example.com');
        await page.click('button:has-text("Update Profile")');

        await expect(page.locator('text=The email has already been taken.')).toBeVisible();
    });
});
