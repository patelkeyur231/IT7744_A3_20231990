import { describe, it, expect, vi } from 'vitest';
import { createCard, showMessage, showFieldErrors } from '../../resources/js/gallery/render.js';

const post = {
    id: 1,
    title: 'Sunset',
    body: 'A nice evening at the beach',
    image_url: '/storage/post_images/sunset.jpg',
    filter: 'sepia',
    author: { id: 2, username: 'testuser' },
    can_edit: true,
    created_at: '1 minute ago',
};

describe('createCard', () => {
    it('shows the title, author, filter and image', () => {
        const card = createCard(post);

        expect(card.querySelector('h2').textContent).toBe('Sunset');
        expect(card.textContent).toContain('by testuser');
        expect(card.querySelector('img').getAttribute('src')).toBe('/storage/post_images/sunset.jpg');
        expect(card.querySelector('img').classList.contains('filter-sepia')).toBe(true);
    });

    it('never turns user text into html', () => {
        const card = createCard({ ...post, title: '<img src=x onerror=alert(1)>' });

        expect(card.querySelector('h2 img')).toBeNull();
        expect(card.querySelector('h2').textContent).toBe('<img src=x onerror=alert(1)>');
    });

    it('shortens long descriptions', () => {
        const card = createCard({ ...post, body: 'word '.repeat(60) });

        expect(card.textContent).toContain('...');
    });

    it('adds edit and delete buttons only for posts the user can edit', () => {
        const handlers = { onEdit: vi.fn(), onDelete: vi.fn() };

        expect(createCard(post, handlers).querySelectorAll('button')).toHaveLength(2);
        expect(createCard({ ...post, can_edit: false }, handlers).querySelectorAll('button')).toHaveLength(0);
        expect(createCard(post).querySelectorAll('button')).toHaveLength(0);
    });

    it('calls the handlers with the post when buttons are clicked', () => {
        const handlers = { onEdit: vi.fn(), onDelete: vi.fn() };
        const card = createCard(post, handlers);
        const [editButton, deleteButton] = card.querySelectorAll('button');

        editButton.click();
        deleteButton.click();

        expect(handlers.onEdit).toHaveBeenCalledWith(post);
        expect(handlers.onDelete).toHaveBeenCalledWith(post, deleteButton);
    });
});

describe('messages', () => {
    it('shows a green success and a red error message', () => {
        const box = document.createElement('div');

        showMessage(box, 'Saved');
        expect(box.querySelector('p').className).toContain('bg-green-500');

        showMessage(box, 'Failed', 'error');
        expect(box.querySelector('p').className).toContain('bg-red-500');
        expect(box.querySelectorAll('p')).toHaveLength(1);
    });

    it('shows field errors next to the right input', () => {
        document.body.innerHTML = `
            <form>
                <input name="title"><p data-error-for="title"></p>
                <input name="body"><p data-error-for="body"></p>
            </form>`;
        const form = document.querySelector('form');

        showFieldErrors(form, { title: 'Please enter a title.' });

        expect(form.querySelector('[data-error-for="title"]').textContent).toBe('Please enter a title.');
        expect(form.querySelector('[name="title"]').getAttribute('aria-invalid')).toBe('true');
        expect(form.querySelector('[name="body"]').getAttribute('aria-invalid')).toBe('false');
    });
});
