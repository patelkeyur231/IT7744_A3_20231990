import { test, expect } from '@playwright/test';
import { testUser, login, unique } from './helpers.js';

test.describe('JavaScript gallery', () => {
    test('guests can browse but not publish', async ({ page }) => {
        await page.goto('/gallery');

        await expect(page.locator('#login-status')).toContainText('browsing as a guest');
        await expect(page.locator('#upload-section')).toBeHidden();
        await expect(page.locator('.tab[data-view="mine"]')).toBeDisabled();
        await expect(page.locator('.gallery-card')).toHaveCount(6);
    });

    test('latest images can be filtered and paged', async ({ page }) => {
        await page.goto('/gallery');
        await page.locator('.gallery-card').first().waitFor();

        await page.click('#load-more');
        await expect(page.locator('.gallery-card')).toHaveCount(12);

        await page.selectOption('#filter-select', 'grayscale');
        await expect(page.locator('.gallery-card').first()).toContainText('filter: grayscale');
        for (const text of await page.locator('.gallery-card p.text-xs').allTextContents()) {
            expect(text).toContain('filter: grayscale');
        }
    });

    test('images from another user can be shown', async ({ page }) => {
        await page.goto('/gallery');
        await page.click('.tab[data-view="users"]');

        const option = page.locator('#user-select option', { hasText: 'testuser' });
        await page.selectOption('#user-select', await option.getAttribute('value'));

        await expect(page.locator('.gallery-card').first()).toContainText('by testuser');
        for (const text of await page.locator('.gallery-card p.text-xs').allTextContents()) {
            expect(text).toContain('by testuser');
        }
    });

    test('logged in state shows my images and the upload form', async ({ page }) => {
        await login(page, testUser);
        await page.goto('/gallery');

        await expect(page.locator('#login-status')).toContainText('Logged in as testuser');
        await expect(page.locator('#upload-section')).toBeVisible();
        await expect(page.locator('.tab[data-view="mine"]')).toHaveAttribute('aria-pressed', 'true');
        expect(await page.evaluate(() => sessionStorage.getItem('gallery_user'))).toContain('testuser');
    });

    test('client side validation stops a bad upload', async ({ page }) => {
        await login(page, testUser);
        await page.goto('/gallery');

        let sent = false;
        page.on('request', (request) => {
            if (request.method() === 'POST' && request.url().includes('/api/posts')) {
                sent = true;
            }
        });

        await page.click('#submit-button');

        await expect(page.locator('[data-error-for="title"]')).toHaveText('Please enter a title.');
        await expect(page.locator('[data-error-for="image"]')).toHaveText('Please choose an image.');
        expect(sent).toBe(false);
    });

    test('publish, edit and delete an image through the api', async ({ page }) => {
        const title = unique('Gallery test');
        await login(page, testUser);
        await page.goto('/gallery');

        await page.fill('#title', `<b>${title}</b>`);
        await page.fill('#body', 'Uploaded by the Playwright test');
        await page.selectOption('#filter', 'sepia');
        await page.setInputFiles('#image', 'tests/fixtures/test-image.jpg');
        await expect(page.locator('#preview-image')).toHaveClass(/filter-sepia/);

        const [upload] = await Promise.all([
            page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/api/posts')),
            page.click('#submit-button'),
        ]);

        expect(upload.resourceType()).toBe('xhr');
        expect(upload.headers().authorization).toMatch(/^Bearer /);
        await expect(page.locator('#form-message')).toHaveText('Your post was created.');

        const card = page.locator('.gallery-card', { hasText: title });
        await expect(card.locator('h2')).toHaveText(title);
        await expect(card.locator('img')).toHaveClass(/filter-sepia/);

        await card.locator('button:has-text("Edit")').click();
        await page.fill('#title', `${title} edited`);
        await page.selectOption('#filter', 'vivid');
        await page.click('#submit-button');
        await expect(page.locator('#form-message')).toHaveText('Your post was updated.');

        page.on('dialog', (dialog) => dialog.accept());
        const editedCard = page.locator('.gallery-card', { hasText: `${title} edited` });
        await expect(editedCard.locator('img')).toHaveClass(/filter-vivid/);
        await editedCard.locator('button:has-text("Delete")').click();
        await expect(page.locator('#form-message')).toHaveText('Your post was deleted.');
        await expect(editedCard).toHaveCount(0);
    });
});
