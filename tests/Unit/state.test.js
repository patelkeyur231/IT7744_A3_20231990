import { describe, it, expect, beforeEach } from 'vitest';
import { state, setLoggedIn, setLoggedOut, savedUser } from '../../resources/js/gallery/state.js';

beforeEach(() => {
    sessionStorage.clear();
    setLoggedOut();
});

describe('login state', () => {
    it('starts logged out', () => {
        expect(state.loggedIn).toBe(false);
        expect(state.token).toBeNull();
        expect(savedUser()).toBeNull();
    });

    it('stores the user when logged in', () => {
        setLoggedIn('token-1', { id: 2, username: 'testuser', email: 'test@example.com' });

        expect(state.loggedIn).toBe(true);
        expect(state.token).toBe('token-1');
        expect(state.user.username).toBe('testuser');
    });

    it('saves only the id and username in session storage', () => {
        setLoggedIn('token-1', { id: 2, username: 'testuser', email: 'test@example.com' });

        expect(savedUser()).toEqual({ id: 2, username: 'testuser' });
        expect(sessionStorage.getItem('gallery_user')).not.toContain('token-1');
    });

    it('clears everything on logout', () => {
        setLoggedIn('token-1', { id: 2, username: 'testuser' });
        setLoggedOut();

        expect(state.loggedIn).toBe(false);
        expect(state.user).toBeNull();
        expect(savedUser()).toBeNull();
    });
});
