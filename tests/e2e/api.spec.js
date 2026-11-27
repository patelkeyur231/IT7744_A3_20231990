import fs from 'fs';
import { test, expect } from '@playwright/test';

const json = { Accept: 'application/json' };

test.describe('REST API', () => {
    test('latest posts are public and return json', async ({ request }) => {
        const response = await request.get('/api/posts', { headers: json });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.data.length).toBeGreaterThan(0);
        expect(body.data[0]).toHaveProperty('image_url');
        expect(body.data[0]).toHaveProperty('filter');
        expect(body.data[0].can_edit).toBe(false);
    });

    test('the users list does not show emails', async ({ request }) => {
        const body = await (await request.get('/api/users', { headers: json })).json();

        expect(body.data[0]).toHaveProperty('username');
        expect(body.data[0]).not.toHaveProperty('email');
    });

    test('protected routes need a token', async ({ request }) => {
        for (const url of ['/api/user', '/api/my/posts']) {
            expect((await request.get(url, { headers: json })).status()).toBe(401);
        }
        expect((await request.post('/api/posts', { headers: json })).status()).toBe(401);
    });

    test('login gives a token that works, logout removes it', async ({ request }) => {
        const login = await request.post('/api/login', { headers: json, form: { email: 'testuser', password: 'password' } });
        const { token } = await login.json();
        const auth = { ...json, Authorization: `Bearer ${token}` };

        const me = await (await request.get('/api/user', { headers: auth })).json();
        expect(me.username).toBe('testuser');

        await request.post('/api/logout', { headers: auth });
        expect((await request.get('/api/user', { headers: auth })).status()).toBe(401);
    });

    test('wrong password returns 401', async ({ request }) => {
        const response = await request.post('/api/login', { headers: json, form: { email: 'testuser', password: 'nope' } });

        expect(response.status()).toBe(401);
    });

    test('creating a post validates and cleans the data', async ({ request }) => {
        const { token } = await (await request.post('/api/login', { headers: json, form: { email: 'testuser', password: 'password' } })).json();
        const auth = { ...json, Authorization: `Bearer ${token}` };

        const bad = await request.post('/api/posts', { headers: auth, multipart: { title: '', body: '', filter: 'nope' } });
        expect(bad.status()).toBe(422);
        expect(Object.keys((await bad.json()).errors)).toEqual(expect.arrayContaining(['title', 'body', 'filter', 'image']));

        const title = `Api test ${Date.now()}`;
        const good = await request.post('/api/posts', {
            headers: auth,
            multipart: {
                title: `<i>${title}</i>`,
                body: 'Made by the api test',
                filter: 'cool',
                image: { name: 'test.jpg', mimeType: 'image/jpeg', buffer: fs.readFileSync('tests/fixtures/test-image.jpg') },
            },
        });
        expect(good.status()).toBe(201);
        const post = (await good.json()).data;
        expect(post.title).toBe(title);

        const deleted = await request.delete(`/api/posts/${post.id}`, { headers: auth });
        expect(deleted.status()).toBe(200);
    });

    test('a user cannot delete someone else\'s post', async ({ request }) => {
        const { token } = await (await request.post('/api/login', { headers: json, form: { email: 'testuser', password: 'password' } })).json();
        const posts = await (await request.get('/api/posts', { headers: json })).json();
        const otherPost = posts.data.find((post) => post.author.username !== 'testuser');

        const response = await request.delete(`/api/posts/${otherPost.id}`, { headers: { ...json, Authorization: `Bearer ${token}` } });

        expect(response.status()).toBe(403);
    });
});
