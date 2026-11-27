<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env('APP_NAME') }}</title>
    @vite(['resources/css/app.css', 'resources/sass/app.scss', 'resources/js/app.js'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js"></script>
</head>
<body class="bg-slate-100 text-slate-900">
    <header class="bg-slate-800 shadow-lg">
        <nav aria-label="Main" class="max-w-screen-lg mx-auto flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-2">
                <a href="{{ route('home') }}" class="nav-link">Home</a>
                <a href="{{ route('gallery') }}" class="nav-link">Gallery</a>
            </div>

            @auth
                <div class="relative grid place-items-center" x-data="{ open: false }">
                    {{-- dropdown menu button --}}
                    <button type="button" @click="open = !open" class="round-btn">
                        <img src="{{ auth()->user()->avatar ? asset('storage/' . auth()->user()->avatar) : asset('img/img_avatar2.png') }}" alt="profile" class="w-8 h-8 rounded-full object-cover">
                    </button>

                    {{-- dropdown menu --}}
                    <div x-show="open" @click.outside="open = false"
                        class="bg-white shadow-lg absolute top-10 right-0 rounded-lg overflow-hidden font-light min-w-[180px] z-10">
                        <p class="px-4 py-2 text-sm text-gray-700 border-b text-center font-semibold">{{ auth()->user()->username }}</p>
                        <a href="{{ route('dashboard') }}" class="block hover:bg-slate-100 px-4 py-2">Dashboard</a>
                        <a href="{{ route('profile.edit') }}" class="block hover:bg-slate-100 px-4 py-2">Edit Profile</a>
                        @if (auth()->user()->role === 'admin')
                            <a href="{{ route('admin.dashboard') }}" class="block hover:bg-slate-100 px-4 py-2">Admin Panel</a>
                        @endif

                        <form action="{{ route('logout') }}" method="post">
                            @csrf
                            <button type="submit" class="block w-full text-left hover:bg-slate-100 px-4 py-2 cursor-pointer">Logout</button>
                        </form>
                    </div>
                </div>
            @endauth

            @guest
                <div class="flex items-center gap-4">
                    <a href="{{ route('login') }}" class="nav-link">Login</a>
                    <a href="{{ route('register') }}" class="nav-link">Register</a>
                </div>
            @endguest
        </nav>
    </header>

    <main class="py-8 px-4 mx-auto max-w-screen-lg">
        {{ $slot }}
    </main>
</body>
</html>
