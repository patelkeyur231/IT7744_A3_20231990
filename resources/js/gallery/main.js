import * as api from './api.js';
import { state, setLoggedIn, setLoggedOut } from './state.js';
import { createCard, showMessage, showFieldErrors } from './render.js';
import { validatePost, validateImage } from './validation.js';

const app = document.getElementById('gallery-app');

if (app) {
    const gallery = document.getElementById('gallery');
    const galleryMessage = document.getElementById('gallery-message');
    const loginStatus = document.getElementById('login-status');
    const loadMoreButton = document.getElementById('load-more');
    const filterSelect = document.getElementById('filter-select');
    const userSelect = document.getElementById('user-select');
    const tabs = document.querySelectorAll('.tab');

    const uploadSection = document.getElementById('upload-section');
    const form = document.getElementById('upload-form');
    const formTitle = document.getElementById('form-title');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-button');
    const cancelEditButton = document.getElementById('cancel-edit');
    const progress = document.getElementById('upload-progress');
    const preview = document.getElementById('preview');
    const previewImage = document.getElementById('preview-image');

    // ---------- login state ----------

    async function checkLogin() {
        const token = app.dataset.token;

        if (!token) {
            setLoggedOut();
            return;
        }

        try {
            const user = await api.getCurrentUser(token);
            setLoggedIn(token, user);
        } catch {
            setLoggedOut();
        }
    }

    function updateLoginUi() {
        uploadSection.hidden = !state.loggedIn;
        loginStatus.textContent = state.loggedIn
            ? `Logged in as ${state.user.username}. You can publish, edit and delete your images.`
            : 'You are browsing as a guest. Log in to publish your own images.';
    }

    // ---------- loading posts ----------

    function cardHandlers() {
        return state.loggedIn ? { onEdit: startEdit, onDelete: removePost } : {};
    }

    async function loadPosts(append = false) {
        if (!append) {
            gallery.textContent = '';
            state.nextPage = null;
        }

        galleryMessage.textContent = 'Loading...';
        loadMoreButton.hidden = true;

        try {
            let response;

            if (state.view === 'mine') {
                if (!state.loggedIn) {
                    galleryMessage.textContent = 'Log in to see your images.';
                    return;
                }
                response = await api.getMyPosts(state.token, append ? state.nextPage : undefined);
            } else if (state.view === 'users') {
                if (!state.selectedUserId) {
                    galleryMessage.textContent = 'Choose a user to see their images.';
                    return;
                }
                response = await api.getUserPosts(state.selectedUserId, append ? state.nextPage : null);
            } else {
                response = await api.getLatestPosts(append ? state.nextPage : '/api/posts', append ? '' : state.filter);
            }

            response.data.forEach((post) => gallery.append(createCard(post, cardHandlers())));

            state.nextPage = response.links && response.links.next ? response.links.next : null;
            loadMoreButton.hidden = !state.nextPage;
            galleryMessage.textContent = gallery.children.length ? '' : 'No images to show yet.';
        } catch (error) {
            galleryMessage.textContent = error.status === 401
                ? 'Your session has expired. Please log in again.'
                : 'Could not load images. Please try again.';
        }
    }

    async function loadUsers() {
        try {
            const response = await api.getUsers();
            userSelect.textContent = '';

            const placeholder = new Option('Choose a user', '');
            userSelect.append(placeholder);

            response.data
                .filter((user) => !state.user || user.id !== state.user.id)
                .forEach((user) => userSelect.append(new Option(`${user.username} (${user.posts_count})`, user.id)));
        } catch {
            galleryMessage.textContent = 'Could not load the list of users.';
        }
    }

    function switchView(view) {
        state.view = view;

        tabs.forEach((tab) => {
            const active = tab.dataset.view === view;
            tab.classList.toggle('tab-active', active);
            tab.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        filterSelect.hidden = view !== 'latest';
        userSelect.hidden = view !== 'users';

        if (view === 'users' && userSelect.options.length === 0) {
            loadUsers();
        }

        loadPosts();
    }

    // ---------- upload form ----------

    function resetForm() {
        form.reset();
        state.editingId = null;
        formTitle.textContent = 'Publish a new image';
        submitButton.textContent = 'Publish';
        cancelEditButton.hidden = true;
        preview.hidden = true;
        previewImage.src = '';
        showFieldErrors(form, {});
    }

    function updatePreview() {
        const file = form.image.files[0];
        previewImage.className = `h-48 rounded-md object-cover filter-${form.filter.value}`;

        if (!file) {
            preview.hidden = !state.editingId;
            return;
        }

        const error = validateImage(file);
        showFieldErrors(form, error ? { image: error } : {});

        if (!error) {
            previewImage.src = URL.createObjectURL(file);
            preview.hidden = false;
        }
    }

    function startEdit(post) {
        state.editingId = post.id;
        form.title.value = post.title;
        form.body.value = post.body;
        form.filter.value = post.filter;
        form.image.value = '';
        previewImage.src = post.image_url;
        previewImage.className = `h-48 rounded-md object-cover filter-${post.filter}`;
        preview.hidden = false;

        formTitle.textContent = `Edit "${post.title}"`;
        submitButton.textContent = 'Save changes';
        cancelEditButton.hidden = false;
        showMessage(formMessage, '');
        uploadSection.scrollIntoView({ behavior: 'smooth' });
    }

    async function removePost(post, button) {
        if (!window.confirm(`Delete "${post.title}"?`)) {
            return;
        }

        button.disabled = true;

        try {
            const response = await api.deletePost(state.token, post.id);
            showMessage(formMessage, response.message);
            loadPosts();
        } catch (error) {
            button.disabled = false;
            showMessage(formMessage, error.status === 403 ? 'You can only delete your own images.' : 'Could not delete the image.', 'error');
        }
    }

    async function submitForm(event) {
        event.preventDefault();

        // stop double clicks sending the post twice
        if (submitButton.disabled) {
            return;
        }

        const editing = Boolean(state.editingId);
        const { clean, errors, isValid } = validatePost({
            title: form.title.value,
            body: form.body.value,
            filter: form.filter.value,
            image: form.image.files[0],
        }, !editing);

        showFieldErrors(form, errors);
        showMessage(formMessage, '');

        if (!isValid) {
            showMessage(formMessage, 'Please fix the errors below.', 'error');
            return;
        }

        // send the cleaned values, not what was typed
        const formData = new FormData();
        formData.append('title', clean.title);
        formData.append('body', clean.body);
        formData.append('filter', clean.filter);
        if (form.image.files[0]) {
            formData.append('image', form.image.files[0]);
        }

        submitButton.disabled = true;
        submitButton.textContent = editing ? 'Saving...' : 'Publishing...';
        progress.hidden = false;
        progress.value = 0;

        try {
            const onProgress = (percent) => { progress.value = percent; };
            const response = editing
                ? await api.updatePost(state.token, state.editingId, formData, onProgress)
                : await api.createPost(state.token, formData, onProgress);

            resetForm();
            showMessage(formMessage, response.message);
            switchView('mine');
        } catch (error) {
            const fieldErrors = api.errorMessages(error);
            showFieldErrors(form, fieldErrors);

            let message = 'Something went wrong. Please try again.';
            if (error.status === 401) {
                message = 'Your session has expired. Please log in again.';
            } else if (error.status === 403) {
                message = 'You can only edit your own images.';
            } else if (error.data && error.data.message && Object.keys(fieldErrors).length === 0) {
                message = error.data.message;
            } else if (Object.keys(fieldErrors).length) {
                message = 'Please fix the errors below.';
            }

            showMessage(formMessage, message, 'error');
            submitButton.textContent = editing ? 'Save changes' : 'Publish';
        } finally {
            submitButton.disabled = false;
            progress.hidden = true;
        }
    }

    // ---------- events ----------

    tabs.forEach((tab) => tab.addEventListener('click', () => switchView(tab.dataset.view)));
    filterSelect.addEventListener('change', () => {
        state.filter = filterSelect.value;
        loadPosts();
    });
    userSelect.addEventListener('change', () => {
        state.selectedUserId = userSelect.value || null;
        loadPosts();
    });
    loadMoreButton.addEventListener('click', () => loadPosts(true));
    form.addEventListener('submit', submitForm);
    form.image.addEventListener('change', updatePreview);
    form.filter.addEventListener('change', updatePreview);
    cancelEditButton.addEventListener('click', resetForm);

    // ---------- start ----------

    (async () => {
        await checkLogin();
        updateLoginUi();

        const tabMine = document.querySelector('.tab[data-view="mine"]');
        tabMine.disabled = !state.loggedIn;
        tabMine.title = state.loggedIn ? '' : 'Log in to see your images';

        switchView(state.loggedIn ? 'mine' : 'latest');
    })();
}
