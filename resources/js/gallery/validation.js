export const FILTERS = ['none', 'grayscale', 'sepia', 'warm', 'cool', 'vivid'];
export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const MAX_IMAGE_SIZE = 3000 * 1024;

// remove html tags and extra spaces from user text
export function sanitizeText(value) {
    if (typeof value !== 'string') {
        return '';
    }

    const withoutScripts = value.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '');
    const withoutTags = withoutScripts.replace(/<[^>]*>/g, '');

    return withoutTags.replace(/\s+/g, ' ').trim();
}

export function validateImage(file, required = true) {
    if (!file) {
        return required ? 'Please choose an image.' : null;
    }

    if (!IMAGE_TYPES.includes(file.type)) {
        return 'The image must be a png, jpg or webp file.';
    }

    if (file.size > MAX_IMAGE_SIZE) {
        return 'The image must not be bigger than 3MB.';
    }

    return null;
}

// returns the cleaned values and any error messages
export function validatePost({ title, body, filter, image }, imageRequired = true) {
    const clean = {
        title: sanitizeText(title),
        body: sanitizeText(body),
        filter: filter,
    };

    const errors = {};

    if (!clean.title) {
        errors.title = 'Please enter a title.';
    } else if (clean.title.length > 255) {
        errors.title = 'The title must be 255 characters or less.';
    }

    if (!clean.body) {
        errors.body = 'Please enter a description.';
    } else if (clean.body.length > 5000) {
        errors.body = 'The description must be 5000 characters or less.';
    }

    if (!FILTERS.includes(clean.filter)) {
        errors.filter = 'Please choose a filter from the list.';
    }

    const imageError = validateImage(image, imageRequired);
    if (imageError) {
        errors.image = imageError;
    }

    return {
        clean,
        errors,
        isValid: Object.keys(errors).length === 0,
    };
}
