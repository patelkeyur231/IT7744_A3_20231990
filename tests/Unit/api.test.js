import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as api from '../../resources/js/gallery/api.js';

// a fake XMLHttpRequest that records what was sent and lets each test choose the reply
class FakeXhr {
    static last = null;
    static reply = { status: 200, body: '{}' };

    constructor() {
        this.headers = {};
        this.listeners = {};
        this.upload = { addEventListener: (name, callback) => { this.uploadProgress = callback; } };
        FakeXhr.last = this;
    }

    open(method, url) {
        this.method = method;
        this.url = url;
    }

    setRequestHeader(name, value) {
        this.headers[name] = value;
    }

    addEventListener(name, callback) {
        this.listeners[name] = callback;
    }

    send(body) {
        this.body = body;
        this.status = FakeXhr.reply.status;
        this.responseText = FakeXhr.reply.body;
        this.listeners.load();
    }
}

beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', FakeXhr);
    FakeXhr.reply = { status: 200, body: '{"data":[]}' };
});

describe('request', () => {
    it('asks for json and parses the reply', async () => {
        FakeXhr.reply = { status: 200, body: '{"data":[{"id":1}]}' };

        const result = await api.request('GET', '/api/posts');

        expect(FakeXhr.last.headers.Accept).toBe('application/json');
        expect(result.data[0].id).toBe(1);
    });

    it('sends the bearer token when one is given', async () => {
        await api.request('GET', '/api/user', { token: 'abc123' });

        expect(FakeXhr.last.headers.Authorization).toBe('Bearer abc123');
    });

    it('does not send a token for public requests', async () => {
        await api.getLatestPosts();

        expect(FakeXhr.last.headers.Authorization).toBeUndefined();
    });

    it('rejects with the status and data on an error', async () => {
        FakeXhr.reply = { status: 422, body: '{"errors":{"title":["Required"]}}' };

        await expect(api.request('POST', '/api/posts')).rejects.toEqual({
            status: 422,
            data: { errors: { title: ['Required'] } },
        });
    });
});

describe('endpoints', () => {
    it('fetches the latest images with a filter', async () => {
        await api.getLatestPosts('/api/posts', 'sepia');

        expect(FakeXhr.last.method).toBe('GET');
        expect(FakeXhr.last.url).toBe('/api/posts?filter=sepia');
    });

    it('keeps existing query strings when adding a filter', async () => {
        await api.getLatestPosts('/api/posts?page=2', 'cool');

        expect(FakeXhr.last.url).toBe('/api/posts?page=2&filter=cool');
    });

    it('fetches my images with the token', async () => {
        await api.getMyPosts('tok');

        expect(FakeXhr.last.url).toBe('/api/my/posts');
        expect(FakeXhr.last.headers.Authorization).toBe('Bearer tok');
    });

    it('fetches images from another user', async () => {
        await api.getUserPosts(7);

        expect(FakeXhr.last.url).toBe('/api/users/7/posts');
    });

    it('uploads a new post as a POST with form data', async () => {
        const formData = new FormData();
        formData.append('title', 'Hi');

        await api.createPost('tok', formData);

        expect(FakeXhr.last.method).toBe('POST');
        expect(FakeXhr.last.url).toBe('/api/posts');
        expect(FakeXhr.last.body.get('title')).toBe('Hi');
        expect(FakeXhr.last.headers.Authorization).toBe('Bearer tok');
    });

    it('sends updates as POST with _method=PUT so files still work', async () => {
        const formData = new FormData();

        await api.updatePost('tok', 5, formData);

        expect(FakeXhr.last.method).toBe('POST');
        expect(FakeXhr.last.url).toBe('/api/posts/5');
        expect(FakeXhr.last.body.get('_method')).toBe('PUT');
    });

    it('deletes a post', async () => {
        await api.deletePost('tok', 9);

        expect(FakeXhr.last.method).toBe('DELETE');
        expect(FakeXhr.last.url).toBe('/api/posts/9');
    });

    it('reports upload progress as a percentage', async () => {
        const onProgress = vi.fn();
        const promise = api.createPost('tok', new FormData(), onProgress);

        FakeXhr.last.uploadProgress({ lengthComputable: true, loaded: 50, total: 200 });
        await promise;

        expect(onProgress).toHaveBeenCalledWith(25);
    });
});

describe('errorMessages', () => {
    it('turns a laravel 422 reply into one message per field', () => {
        const error = { status: 422, data: { errors: { title: ['Too long', 'Other'], image: ['Required'] } } };

        expect(api.errorMessages(error)).toEqual({ title: 'Too long', image: 'Required' });
    });

    it('returns nothing for other errors', () => {
        expect(api.errorMessages({ status: 500, data: null })).toEqual({});
    });
});
