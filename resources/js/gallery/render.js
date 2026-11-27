// builds the post cards with textContent so user text is never run as html
export function createCard(post, { onEdit, onDelete } = {}) {
    const card = document.createElement('article');
    card.className = 'card gallery-card';
    card.dataset.id = post.id;

    const title = document.createElement('h2');
    title.className = 'font-bold text-xl';
    title.textContent = post.title;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'h-52 rounded-md my-3 w-full overflow-hidden';

    const image = document.createElement('img');
    image.src = post.image_url;
    image.alt = post.title;
    image.loading = 'lazy';
    image.className = `w-full h-full object-cover filter-${post.filter}`;
    imageWrap.append(image);

    const meta = document.createElement('p');
    meta.className = 'text-xs font-light mb-3';
    meta.textContent = `Posted ${post.created_at} by ${post.author.username} · filter: ${post.filter}`;

    const body = document.createElement('p');
    body.className = 'text-sm';
    body.textContent = post.body.length > 120 ? `${post.body.slice(0, 120)}...` : post.body;

    card.append(title, imageWrap, meta, body);

    if (post.can_edit && (onEdit || onDelete)) {
        const actions = document.createElement('div');
        actions.className = 'flex items-center justify-end gap-4 mt-6';

        if (onEdit) {
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'bg-green-500 text-white px-2 py-1 text-xs rounded-md cursor-pointer';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => onEdit(post));
            actions.append(editButton);
        }

        if (onDelete) {
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'bg-red-500 text-white px-2 py-1 text-xs rounded-md cursor-pointer';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => onDelete(post, deleteButton));
            actions.append(deleteButton);
        }

        card.append(actions);
    }

    return card;
}

export function showMessage(element, text, type = 'success') {
    element.textContent = '';

    if (!text) {
        return;
    }

    const message = document.createElement('p');
    message.className = `mb-2 text-sm font-medium text-white px-3 py-1 rounded-md ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
    message.textContent = text;
    element.append(message);
}

export function showFieldErrors(form, errors) {
    form.querySelectorAll('[data-error-for]').forEach((element) => {
        const field = element.dataset.errorFor;
        element.textContent = errors[field] || '';

        const input = form.querySelector(`[name="${field}"]`);
        if (input) {
            input.classList.toggle('ring-red-500', Boolean(errors[field]));
            input.setAttribute('aria-invalid', errors[field] ? 'true' : 'false');
        }
    });
}
