import './bootstrap';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

// stop a form being sent twice by a double click
document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
        // the gallery form handles this itself, and a cancelled confirm() should not lock the button
        if (event.defaultPrevented || form.id === 'upload-form') {
            return;
        }

        form.querySelectorAll('button[type="submit"]').forEach((button) => {
            button.disabled = true;
            button.classList.add('opacity-60', 'cursor-wait');
        });
    });
});

// buttons come back enabled when the page is shown again with the back button
window.addEventListener('pageshow', () => {
    document.querySelectorAll('button[type="submit"]:disabled').forEach((button) => {
        button.disabled = false;
        button.classList.remove('opacity-60', 'cursor-wait');
    });
});
