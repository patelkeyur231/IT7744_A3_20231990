<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class GalleryController extends Controller
{
    public function index()
    {
        // make sure a logged in user has an api token (e.g. after "remember me")
        if (Auth::check() && ! session('api_token')) {
            session(['api_token' => Auth::user()->createToken('web')->plainTextToken]);
        }

        return view('gallery.index', ['filters' => Post::FILTERS]);
    }
}
