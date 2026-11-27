import { expect } from '@playwright/test';

export const admin = { login: 'admin', password: 'admin' };
export const testUser = { login: 'testuser', password: 'password' };

export async function login(page, user) {
    await page.goto('/login');
    await page.fill('#email', user.login);
    await page.fill('#password', user.password);
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/dashboard/);
}

export async function logout(page) {
    await page.click('.round-btn');
    await page.click('button:has-text("Logout")');
}

export function unique(text) {
    return `${text} ${Date.now()}`;
}
