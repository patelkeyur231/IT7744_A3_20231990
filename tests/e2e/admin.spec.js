import { test, expect } from '@playwright/test';
import { admin, testUser, login } from './helpers.js';

test.describe('Admin panel', () => {
    test.beforeEach(async ({ page }) => {
        page.on('dialog', (dialog) => dialog.accept());
    });

    test('normal users are blocked from the admin pages', async ({ page }) => {
        await login(page, testUser);

        await page.click('.round-btn');
        await expect(page.locator('a:has-text("Admin Panel")')).toHaveCount(0);

        for (const url of ['/admin/dashboard', '/admin/users', '/admin/posts']) {
            const response = await page.goto(url);
            expect(response.status()).toBe(403);
        }
    });

    test('admin can open the admin dashboard', async ({ page }) => {
        await login(page, admin);
        await page.click('.round-btn');
        await page.click('a:has-text("Admin Panel")');

        await expect(page.locator('h1')).toHaveText('Admin Dashboard');
        await expect(page.locator('a:has-text("Manage Users")')).toBeVisible();
        await expect(page.locator('a:has-text("Manage Posts")')).toBeVisible();
    });

    test('admin can create, edit and delete a user', async ({ page }) => {
        const name = `admintest${Date.now()}`;
        await login(page, admin);
        await page.goto('/admin/users/create');

        await page.fill('#username', name);
        await page.fill('#email', `${name}@example.com`);
        await page.fill('#password', 'secret');
        await page.fill('#password_confirmation', 'secret');
        await page.click('button:has-text("Create User")');
        await expect(page.locator('text=User created successfully.')).toBeVisible();

        await page.goto('/admin/users?page=1');
        const row = page.locator('tr', { hasText: `${name}@example.com` });
        let pageNumber = 1;
        while (await row.count() === 0 && pageNumber < 10) {
            pageNumber += 1;
            await page.goto(`/admin/users?page=${pageNumber}`);
        }

        await row.locator('a:has-text("Edit")').click();
        await page.selectOption('#role', 'admin');
        await page.click('button:has-text("Save")');
        await expect(page.locator('text=User updated!')).toBeVisible();

        await page.goto(`/admin/users?page=${pageNumber}`);
        await expect(row.locator('td').nth(2)).toHaveText('admin');
        await row.locator('button:has-text("Delete")').click();
        await expect(page.locator('text=User deleted!')).toBeVisible();
        await expect(row).toHaveCount(0);
    });

    test('admin can edit and delete any post', async ({ page }) => {
        await login(page, admin);
        await page.goto('/admin/posts');

        await page.locator('tbody tr').first().locator('a:has-text("Edit")').click();
        await page.fill('#title', 'Edited by the admin test');
        await page.click('button:has-text("Update")');
        await expect(page.locator('text=Post updated.')).toBeVisible();

        const row = page.locator('tr', { hasText: 'Edited by the admin test' });
        await row.locator('button:has-text("Delete")').click();
        await expect(page.locator('text=Post deleted.')).toBeVisible();
        await expect(row).toHaveCount(0);
    });
});
