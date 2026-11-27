import { describe, it, expect } from 'vitest';
import { sanitizeText, validateImage, validatePost, MAX_IMAGE_SIZE } from '../../resources/js/gallery/validation.js';

function fakeFile(type, size) {
    return { type, size };
}

describe('sanitizeText', () => {
    it('removes html tags and keeps the text', () => {
        expect(sanitizeText('My <b>beach</b> photo')).toBe('My beach photo');
    });

    it('removes script and style blocks completely', () => {
        expect(sanitizeText('<script>alert(1)</script>Hello<style>p{}</style>')).toBe('Hello');
    });

    it('trims and collapses extra spaces', () => {
        expect(sanitizeText('   lots    of   space  ')).toBe('lots of space');
    });

    it('returns an empty string for non text values', () => {
        expect(sanitizeText(null)).toBe('');
        expect(sanitizeText(42)).toBe('');
    });
});

describe('validateImage', () => {
    it('accepts png, jpg and webp under 3MB', () => {
        expect(validateImage(fakeFile('image/png', 1000))).toBeNull();
        expect(validateImage(fakeFile('image/jpeg', 1000))).toBeNull();
        expect(validateImage(fakeFile('image/webp', 1000))).toBeNull();
    });

    it('rejects other file types', () => {
        expect(validateImage(fakeFile('image/gif', 1000))).toMatch(/png, jpg or webp/);
        expect(validateImage(fakeFile('text/plain', 10))).toMatch(/png, jpg or webp/);
    });

    it('rejects files bigger than 3MB', () => {
        expect(validateImage(fakeFile('image/png', MAX_IMAGE_SIZE + 1))).toMatch(/3MB/);
    });

    it('only requires a file when asked to', () => {
        expect(validateImage(undefined)).toMatch(/choose an image/);
        expect(validateImage(undefined, false)).toBeNull();
    });
});

describe('validatePost', () => {
    const goodPost = {
        title: 'Sunset',
        body: 'At the beach',
        filter: 'sepia',
        image: fakeFile('image/jpeg', 2000),
    };

    it('passes a valid post', () => {
        const result = validatePost(goodPost);

        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
    });

    it('returns the cleaned values', () => {
        const result = validatePost({ ...goodPost, title: ' <i>Sunset</i> ' });

        expect(result.clean.title).toBe('Sunset');
    });

    it('reports every missing field', () => {
        const result = validatePost({ title: '', body: '', filter: 'none', image: undefined });

        expect(result.isValid).toBe(false);
        expect(Object.keys(result.errors)).toEqual(['title', 'body', 'image']);
    });

    it('treats a title made only of tags as empty', () => {
        const result = validatePost({ ...goodPost, title: '<b></b>' });

        expect(result.errors.title).toBe('Please enter a title.');
    });

    it('rejects a filter that is not in the list', () => {
        const result = validatePost({ ...goodPost, filter: 'hacked' });

        expect(result.errors.filter).toBeDefined();
    });

    it('rejects a title longer than 255 characters', () => {
        const result = validatePost({ ...goodPost, title: 'a'.repeat(256) });

        expect(result.errors.title).toMatch(/255/);
    });

    it('does not need an image when editing', () => {
        const result = validatePost({ ...goodPost, image: undefined }, false);

        expect(result.isValid).toBe(true);
    });
});
