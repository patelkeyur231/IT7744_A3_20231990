# IT7744 Laravel Project – Lab Notes (Weeks 1–5)

## Run it
1. XAMPP Control Panel → start **Apache** and **MySQL**.
2. First time only: double-click `setup.bat` (or run the commands inside it).
3. Every time: open a terminal in this folder and run `composer run dev`
   (or `php artisan serve` in one terminal and `npm run dev` in another).
4. Open http://127.0.0.1:8000 — test account: `test@example.com` / `password`

Reset the database with fresh dummy data any time: `php artisan migrate:fresh --seed`

## Where each lab lives

| Lab | Files |
|---|---|
| Week 2 – Register | `resources/views/auth/register.blade.php`, `AuthController@register` |
| Week 3 Part 1 – Login + Remember me | `resources/views/auth/login.blade.php`, `AuthController@login` (`Auth::attempt`, `redirect()->intended`) |
| Week 3 Part 2 – Logout, Alpine dropdown, Dashboard | `resources/views/components/layout.blade.php` (`@auth`/`@guest`, `x-data`, `@click.outside`), `AuthController@logout`, `DashboardController@index`, `resources/views/users/dashboard.blade.php`, `public/img/profile.jpg` |
| Week 3 Part 3 – Middleware | `routes/web.php` (`auth` and `guest` route groups) |
| Week 4 – Post model, factory, seeder, homepage | `app/Models/Post.php`, `database/migrations/..._create_posts_table.php`, `database/factories/PostFactory.php`, `database/seeders/PostSeeder.php`, `DatabaseSeeder.php`, `resources/views/posts/index.blade.php` |
| Week 5 Part 1 – Create post + validation + flash message | `PostController@store`, `User::posts()` (hasMany), `components/flashMsg.blade.php` |
| Week 5 Part 2 – Posts by user, pagination, postCard | `Post::user()` (belongsTo), `DashboardController@userPosts`, `components/postCard.blade.php`, `resources/views/users/posts.blade.php`, `->paginate(6)` + `{{ $posts->links() }}` |
| Week 5 Part 3 – Single post / Read more | `PostController@show`, `resources/views/posts/show.blade.php`, `postCard` `full` prop |
| Extra – REST API (from Nabeel's resource link) | `routes/api.php`, `app/Http/Controllers/Api/PostController.php`, `app/Http/Resources/PostResource.php` — try `/api/posts`, `/api/posts/1`, `/api/users/1/posts` |

## Useful artisan commands (what each file was generated with)
```
php artisan make:controller AuthController
php artisan make:controller DashboardController
php artisan make:model Post -mfsc --resource   # model + migration + factory + seeder + resource controller
php artisan make:resource PostResource
php artisan route:list
```

## Routes
- `/` and `/posts` – all posts (public, paginated)
- `/posts/{id}` – single post (public)
- `/{userId}/posts` – posts by one author
- `/dashboard` – create post + your posts (**login required**)
- `/login`, `/register` – **guests only**
- `POST /logout`
