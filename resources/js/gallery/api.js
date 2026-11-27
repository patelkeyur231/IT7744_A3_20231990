// small wrapper around XMLHttpRequest that returns a promise with the JSON response
export function request(method, url, { token = null, body = null, onProgress = null } = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.setRequestHeader('Accept', 'application/json');

        if (token) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        if (onProgress && xhr.upload) {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    onProgress(Math.round((event.loaded / event.total) * 100));
                }
            });
        }

        xhr.addEventListener('load', () => {
            let data = null;

            try {
                data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            } catch {
                data = null;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(data);
            } else {
                reject({ status: xhr.status, data });
            }
        });

        xhr.addEventListener('error', () => reject({ status: 0, data: null }));

        xhr.send(body);
    });
}

export function getLatestPosts(url = '/api/posts', filter = '') {
    const fullUrl = filter ? `${url}${url.includes('?') ? '&' : '?'}filter=${encodeURIComponent(filter)}` : url;

    return request('GET', fullUrl);
}

export function getMyPosts(token, url = '/api/my/posts') {
    return request('GET', url, { token });
}

export function getUserPosts(userId, url = null) {
    return request('GET', url || `/api/users/${encodeURIComponent(userId)}/posts`);
}

export function getUsers() {
    return request('GET', '/api/users');
}

export function getCurrentUser(token) {
    return request('GET', '/api/user', { token });
}

export function createPost(token, formData, onProgress) {
    return request('POST', '/api/posts', { token, body: formData, onProgress });
}

export function updatePost(token, id, formData, onProgress) {
    // multipart data can't be sent with PUT, so Laravel reads _method instead
    formData.append('_method', 'PUT');

    return request('POST', `/api/posts/${encodeURIComponent(id)}`, { token, body: formData, onProgress });
}

export function deletePost(token, id) {
    return request('DELETE', `/api/posts/${encodeURIComponent(id)}`, { token });
}

// turns a laravel error response into one message per field
export function errorMessages(error) {
    if (error && error.status === 422 && error.data && error.data.errors) {
        const messages = {};

        Object.entries(error.data.errors).forEach(([field, list]) => {
            messages[field] = list[0];
        });

        return messages;
    }

    return {};
}
