<?php

use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

// JSON API (all URLs start with /api)
// GET /api/posts          -> list posts (paginated, ?page=2)
// GET /api/posts/{id}     -> one post
// GET /api/users/{id}/posts -> posts by one user
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::get('/users/{user}/posts', [PostController::class, 'userPosts']);
