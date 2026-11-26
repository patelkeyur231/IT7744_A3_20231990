<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Homepage = list of all posts
Route::get('/', [PostController::class, 'index'])->name('home');

// Posts resource routes (index, create, store, show, edit, update, destroy)
// Creating a post needs a logged-in user; viewing posts is public.
Route::resource('posts', PostController::class)->except(['index', 'show'])->middleware('auth');
Route::resource('posts', PostController::class)->only(['index', 'show']);

// Posts by a specific user
Route::get('/{user}/posts', [DashboardController::class, 'userPosts'])->name('posts.user');

// Routes for logged-in users only
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Routes for guests (not logged in) only
Route::middleware('guest')->group(function () {
    Route::view('/register', 'auth.register')->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    Route::view('/login', 'auth.login')->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});
