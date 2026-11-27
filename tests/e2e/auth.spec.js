import { test, expect } from '@playwright/test';
import { admin, testUser, login, logout, unique } from './helpers.js';

test.describe('Register, login and logout', () => {
    test('browser blocks an empty register form', async ({ page }) => {
        await page.goto('/register');
        await page.click('button:has-text("Register")');

        await expect(page).toHaveURL(/register/);
        expect(await page.locator('#username').evaluate((input) => input.validity.valueMissing)).toBe(true);
    });

    test('server shows errors for a taken email and short password', async ({ page }) => {
        await page.goto('/register');
        await page.evaluate(() => { document.querySelector('form').noValidate = true; });

        await page.fill('#username', unique('user'));
        await page.fill('#email', 'test@example.com');
        await page.fill('#password', 'a');
        await page.fill('#password_confirmation', 'b');
        await page.click('button:has-text("Register")');

        await expect(page.locator('text=The email has already been taken.')).toBeVisible();
        await expect(page.locator('.error', { hasText: 'password' }).first()).toBeVisible();
    });

    test('a new user can register and is logged in', async ({ page }) => {
        const name = `user${Date.now()}`;

        await page.goto('/register');
        await page.fill('#username', name);
        await page.fill('#email', `${name}@example.com`);
        await page.fill('#password', 'secret');
        await page.fill('#password_confirmation', 'secret');
        await page.click('button:has-text("Register")');

        await expect(page).toHaveURL(/dashboard/);
        await expect(page.locator('h1')).toContainText(`Welcome ${name}`);
    });

    test('admin can log in with username admin and password admin', async ({ page }) => {
        await login(page, admin);

        await expect(page.locator('h1')).toContainText('Welcome admin');
    });

    test('login works with an email address too', async ({ page }) => {
        await login(page, { login: 'test@example.com', password: 'password' });

        await expect(page.locator('h1')).toContainText('Welcome testuser');
    });

    test('wrong password shows a message', async ({ page }) => {
        await page.goto('/login');
        await page.fill('#email', 'testuser');
        await page.fill('#password', 'wrong');
        await page.click('button:has-text("Login")');

        await expect(page.locator('text=Wrong username, email or password')).toBeVisible();
        await expect(page.locator('#email')).toHaveValue('testuser');
    });

    test('logout ends the session', async ({ page }) => {
        await login(page, testUser);
        await logout(page);

        await page.goto('/dashboard');
        await expect(page).toHaveURL(/login/);
    });
});
