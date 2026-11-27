const STORAGE_KEY = 'gallery_user';

// one place that knows if the user is logged in
export const state = {
    loggedIn: false,
    token: null,
    user: null,
    view: 'latest',
    filter: '',
    selectedUserId: null,
    nextPage: null,
    editingId: null,
};

export function setLoggedIn(token, user) {
    state.loggedIn = true;
    state.token = token;
    state.user = user;

    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: user.id, username: user.username }));
    } catch {
        // storage can be blocked in private windows, the app still works without it
    }
}

export function setLoggedOut() {
    state.loggedIn = false;
    state.token = null;
    state.user = null;

    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch {
        // nothing to remove
    }
}

export function savedUser() {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    } catch {
        return null;
    }
}
