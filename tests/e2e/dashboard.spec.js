import { test, expect } from '@playwright/test';
import { testUser, login, unique } from './helpers.js';

test.describe('Dashboard and post security', () => {
    test('dashboard is only for logged in users', async ({ page }) => {
        await page.goto('/dashboard');

        await expect(page).toHaveURL(/login/);
    });

    test('dashboard shows the post count and the create form', async ({ page }) => {
        await login(page, testUser);

        await expect(page.locator('h1')).toHaveText(/Welcome testuser, you have \d+ posts/);
        await expect(page.locator('#title')).toBeVisible();
        await expect(page.locator('#image')).toHaveAttribute('accept', /png/);
    });

    test('server rejects an empty post', async ({ page }) => {
        await login(page, testUser);
        await page.evaluate(() => { document.querySelector('form[enctype]').noValidate = true; });

        await page.click('button:has-text("Create")');

        await expect(page.locator('text=The title field is required.')).toBeVisible();
        await expect(page.locator('text=The body field is required.')).toBeVisible();
    });

    test('html tags are removed from a new post', async ({ page }) => {
        const title = unique('Clean');
        await login(page, testUser);

        await page.fill('#title', `<b>${title}</b>`);
        await page.fill('#body', '<script>alert(1)</script>Plain text');
        await page.click('button:has-text("Create")');

        await expect(page.locator('.card h2.text-xl').first()).toHaveText(title);
        await expect(page.locator('.card').first()).not.toContainText('<script>');
    });

    test('a user cannot edit someone else\'s post', async ({ page, request }) => {
        const posts = await (await request.get('/api/posts')).json();
        const otherPost = posts.data.find((post) => post.author.username !== 'testuser');

        await login(page, testUser);
        const response = await page.goto(`/posts/${otherPost.id}/edit`);

        expect(response.status()).toBe(403);
    });
});
