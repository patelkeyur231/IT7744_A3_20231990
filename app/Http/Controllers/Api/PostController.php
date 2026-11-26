<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
    // GET /api/posts
    public function index()
    {
        return PostResource::collection(Post::with('user')->latest()->paginate(10));
    }

    // GET /api/posts/{post}
    public function show(Post $post)
    {
        return new PostResource($post->load('user'));
    }

    // GET /api/users/{user}/posts
    public function userPosts(User $user)
    {
        return PostResource::collection($user->posts()->with('user')->latest()->paginate(10));
    }
}
