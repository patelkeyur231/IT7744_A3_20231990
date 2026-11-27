import { test, expect } from '@playwright/test';

test.describe('Home, single post and user posts', () => {
    test('home page lists the latest posts with pagination', async ({ page }) => {
        await page.goto('/');

        await expect(page.locator('h1')).toHaveText('Latest Posts');
        await expect(page.locator('.card')).toHaveCount(6);
        await expect(page.locator('nav[role="navigation"]')).toBeVisible();
    });

    test('next page shows different posts', async ({ page }) => {
        await page.goto('/');
        const firstTitle = await page.locator('.card h2').first().textContent();

        await page.goto('/?page=2');

        await expect(page.locator('.card h2').first()).not.toHaveText(firstTitle);
    });

    test('read more opens the full post', async ({ page }) => {
        await page.goto('/');
        const title = await page.locator('.card h2').first().textContent();

        await page.locator('a:has-text("Read more")').first().click();

        await expect(page).toHaveURL(/\/posts\/\d+$/);
        await expect(page.locator('h2')).toHaveText(title);
    });

    test('author link shows only that user\'s posts', async ({ page }) => {
        await page.goto('/');
        const author = await page.locator('.card a.font-medium').first().textContent();

        await page.locator('.card a.font-medium').first().click();

        await expect(page.locator('h1')).toContainText(`${author}'s Posts`);
        for (const name of await page.locator('.card a.font-medium').allTextContents()) {
            expect(name).toBe(author);
        }
    });

    test('guests see login and register links', async ({ page }) => {
        await page.goto('/');

        await expect(page.locator('nav a:has-text("Login")')).toBeVisible();
        await expect(page.locator('nav a:has-text("Register")')).toBeVisible();
    });
});
