# IT7744 Assessment 3 – CMS Web Application

**Keyur Patel – Student ID 20231990**

A Laravel 12 content management web application with a secure admin section, user accounts, an image publishing section and a RESTful API that returns JSON. A client-side JavaScript gallery uses the API to show, publish, edit and delete images with XHR requests that carry a Sanctum `Authorization: Bearer` token.

GitHub: https://github.com/patelkeyur231/IT7744_A3_20231990

---

## Login details

| Role | Username | Email | Password |
|---|---|---|---|
| Administrator | `admin` | admin@example.com | `admin` |
| Normal user | `testuser` | test@example.com | `password` |

You can log in with either the username or the email address.

---

## Requirements

- XAMPP with PHP 8.2 or newer and MySQL / MariaDB
- Composer
- Node.js 20 or newer and npm

## Installation

1. Start **Apache** and **MySQL** in the XAMPP Control Panel.
2. Copy the `my_app` folder to `C:\xampp\htdocs\my_app` and open a terminal there.
3. Install the PHP and JavaScript packages:

   ```bash
   composer install
   npm install
   ```

4. Create the environment file and app key:

   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

   The database settings in `.env` are already set for XAMPP (`my_app`, user `root`, no password).

5. Set up the database – **either**:
   - import `database.sql` in phpMyAdmin (it creates the `my_app` database), **or**
   - run `php artisan migrate:fresh --seed` to build it from the migrations and seeders.

6. Link the storage folder so uploaded images can be shown:

   ```bash
   php artisan storage:link
   ```

7. Start the app in two terminals:

   ```bash
   php artisan serve
   npm run dev
   ```

8. Open http://127.0.0.1:8000

---

## Features

### Users
- Register and log in (username or email), with "Remember me" and clear error messages
- Edit profile: username, email, password and avatar image
- Dashboard: create, update and delete your own posts with a featured image

### Admin section (admins only)
- `AdminMiddleware` blocks everyone except users with the `admin` role (403 for others)
- **Manage Users**: list, create (with avatar), edit role and details, delete
- **Manage Posts**: list, edit (title, content, image, author), delete

### Publishing section – JavaScript gallery (`/gallery`)
- Tabs for **Latest images** (with a filter dropdown and "Load more"), **My images** and **Other users**
- Upload form with **title, description, filter and image file**, live filter preview and progress bar
- Sent to the API with **XMLHttpRequest** and an `Authorization: Bearer` token for the logged in user
- Edit and delete your own images
- Login state is checked against `/api/user` and kept in one `state` object (and `sessionStorage`)

### Security
- **CSRF**: every Blade form uses `@csrf`; the API uses bearer tokens instead of cookies
- **Authorisation**: `PostPolicy` (owner or admin), `Gate::authorize('modify', $post)`, `auth` and `guest` middleware
- **Client-side validation**: HTML attributes (`required`, `maxlength`, `type="email"`, `accept`) and JavaScript checks before any request is sent
- **Server-side validation**: `$request->validate()` in every controller
- **Sanitising**: `SanitizeInput` middleware strips HTML tags from every text field (not passwords); the JavaScript also strips tags before sending; cards are built with `textContent`
- **Duplicate submissions**: submit buttons are disabled after one click, and the same post title cannot be posted twice within a minute

---

## REST API

All responses are JSON. Routes marked **token** need `Authorization: Bearer <token>`.

| Method | URL | Access | Description |
|---|---|---|---|
| POST | `/api/login` | public | Get a token (`email` = email or username, `password`) |
| GET | `/api/posts?filter=sepia` | public | Latest images, 6 per page, optional filter |
| GET | `/api/posts/{id}` | public | One image |
| GET | `/api/users` | public | Users and their post counts (no emails) |
| GET | `/api/users/{id}/posts` | public | Images from one user |
| GET | `/api/user` | token | The logged in user |
| GET | `/api/my/posts` | token | My images |
| POST | `/api/posts` | token | Publish (title, body, filter, image) |
| PUT | `/api/posts/{id}` | token, owner/admin | Update |
| DELETE | `/api/posts/{id}` | token, owner/admin | Delete |
| POST | `/api/logout` | token | Delete the token |

Filters: `none`, `grayscale`, `sepia`, `warm`, `cool`, `vivid`.

---

## Tests

```bash
npm test               # 40 Vitest unit tests for the gallery JavaScript
npx playwright install # first time only, downloads the test browsers
npx playwright test    # 37 Playwright acceptance tests (the app must be running)
```

- `tests/unit/` – validation and sanitising, the XHR wrapper, login state, card rendering
- `tests/e2e/` – home, single post, user posts, register, login, logout, dashboard, profile, admin, gallery and API

---

## Project structure (main files)

```
app/Http/Controllers/        AuthController, PostController, DashboardController, ProfileController, GalleryController
app/Http/Controllers/Admin/  AdminController, AdminUserController, AdminPostController
app/Http/Controllers/Api/    AuthController, PostController (REST API)
app/Http/Middleware/         AdminMiddleware, SanitizeInput
app/Policies/PostPolicy.php
resources/views/             Blade views (layout, auth, posts, users, admin, gallery)
resources/js/gallery/        api.js, validation.js, state.js, render.js, main.js
resources/sass/              abstracts (variables, mixins) and components (forms, tabs, filters, gallery)
routes/web.php, routes/api.php
tests/unit, tests/e2e
database.sql
```

## Version control

The project is in Git and on GitHub. `.gitignore` excludes `vendor/`, `node_modules/`, `.env`, `public/build`, `public/storage`, uploaded images and test output.
