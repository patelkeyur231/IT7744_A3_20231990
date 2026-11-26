<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        // validate
        $fields = $request->validate([
            'username' => ['required', 'max:255', 'unique:users'],
            'email' => ['required', 'max:255', 'email', 'unique:users'],
            'password' => ['required', 'min:3', 'confirmed'],
        ]);

        // register
        $user = User::create($fields);

        // login
        Auth::login($user);

        // redirect
        return redirect()->route('dashboard');
    }

    // Login User
    public function login(Request $request)
    {
        // validate
        $fields = $request->validate([
            'email' => ['required', 'max:255', 'email'],
            'password' => ['required'],
        ]);

        // try to login the user
        if (Auth::attempt($fields, $request->remember)) {
            return redirect()->intended('dashboard');
        } else {
            return back()->withErrors([
                'failed' => 'Wrong password or email',
            ])->onlyInput('email');
        }
    }

    // Logout User
    public function logout(Request $request)
    {
        // logout the user
        Auth::logout();

        // invalidate user's session
        $request->session()->invalidate();

        // regenerate CSRF token
        $request->session()->regenerateToken();

        // redirect to home
        return redirect('/');
    }
}
