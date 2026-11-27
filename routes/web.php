<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminPostController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [PostController::class, 'index'])->name('home');

Route::resource('posts', PostController::class);

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

// auth routes
Route::middleware('auth')->group(function () {
    // admin routes
    Route::prefix('admin')->name('admin.')->middleware(AdminMiddleware::class)->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::resource('users', AdminUserController::class)->except(['show']);
        Route::resource('posts', AdminPostController::class)->only(['index', 'edit', 'update', 'destroy']);
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// guest routes
Route::middleware('guest')->group(function () {
    Route::view('/register', 'auth.register')->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    Route::view('/login', 'auth.login')->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('/{user}/posts', [DashboardController::class, 'userPosts'])->name('posts.user');
