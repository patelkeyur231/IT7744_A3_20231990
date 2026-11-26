<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    // Dashboard: show the logged-in user's latest posts
    public function index()
    {
        $posts = Auth::user()->posts()->latest()->paginate(6);

        return view('users.dashboard', ['posts' => $posts]);
    }

    // All posts written by one user (clicking an author's name)
    public function userPosts(User $user)
    {
        $userPosts = $user->posts()->latest()->paginate(6);

        return view('users.posts', [
            'posts' => $userPosts,
            'user' => $user,
        ]);
    }
}
