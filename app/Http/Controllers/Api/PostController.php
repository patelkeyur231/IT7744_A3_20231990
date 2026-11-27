<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // latest posts from everyone
    public function index(Request $request)
    {
        $posts = Post::with('user')->latest();

        if ($request->filled('filter') && in_array($request->filter, Post::FILTERS)) {
            $posts->where('filter', $request->filter);
        }

        return PostResource::collection($posts->paginate(6)->withQueryString());
    }

    public function show(Post $post)
    {
        return new PostResource($post->load('user'));
    }

    // posts by one user
    public function userPosts(User $user)
    {
        return PostResource::collection($user->posts()->with('user')->latest()->paginate(6));
    }

    // posts by the logged in user
    public function myPosts(Request $request)
    {
        return PostResource::collection($request->user()->posts()->with('user')->latest()->paginate(6));
    }

    // all users for the "other users" list
    public function users()
    {
        $users = User::withCount('posts')->orderBy('username')->get()->map(fn ($user) => [
            'id' => $user->id,
            'username' => $user->username,
            'posts_count' => $user->posts_count,
        ]);

        return response()->json(['data' => $users]);
    }

    public function store(Request $request)
    {
        // validate
        $request->validate([
            'title' => ['required', 'max:255'],
            'body' => ['required', 'max:5000'],
            'filter' => ['required', 'in:' . implode(',', Post::FILTERS)],
            'image' => ['required', 'file', 'max:3000', 'mimes:png,jpg,webp'],
        ]);

        // stop the same post being sent twice
        $duplicate = $request->user()->posts()
            ->where('title', $request->title)
            ->where('created_at', '>=', now()->subMinute())
            ->exists();

        if ($duplicate) {
            return response()->json(['message' => 'You already posted this a moment ago.'], 422);
        }

        // store image
        $path = Storage::disk('public')->put('post_images', $request->image);

        // create a post
        $post = $request->user()->posts()->create([
            'title' => $request->title,
            'body' => $request->body,
            'image' => $path,
            'filter' => $request->filter,
        ]);

        return (new PostResource($post->load('user')))
            ->additional(['message' => 'Your post was created.'])
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, Post $post)
    {
        // Authorizing the action
        Gate::forUser($request->user())->authorize('modify', $post);

        // validate
        $request->validate([
            'title' => ['required', 'max:255'],
            'body' => ['required', 'max:5000'],
            'filter' => ['required', 'in:' . implode(',', Post::FILTERS)],
            'image' => ['nullable', 'file', 'max:3000', 'mimes:png,jpg,webp'],
        ]);

        // update image if exists
        $path = $post->image;
        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $path = Storage::disk('public')->put('post_images', $request->image);
        }

        // update the post
        $post->update([
            'title' => $request->title,
            'body' => $request->body,
            'image' => $path,
            'filter' => $request->filter,
        ]);

        return (new PostResource($post->load('user')))->additional(['message' => 'Your post was updated.']);
    }

    public function destroy(Request $request, Post $post)
    {
        // Authorizing the action
        Gate::forUser($request->user())->authorize('modify', $post);

        // delete post image if exists
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        // delete the post
        $post->delete();

        return response()->json(['message' => 'Your post was deleted.']);
    }
}
