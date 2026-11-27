<x-layout>
    <h1 class="title">Edit Profile</h1>

    <div class="mx-auto max-w-screen-sm card">
        @if (session('success'))
            <x-flashMsg msg="{{ session('success') }}" />
        @endif

        <form method="POST" action="{{ route('profile.update') }}" enctype="multipart/form-data">
            @csrf

            <div class="mb-4">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required maxlength="255" autocomplete="username" value="{{ old('username', $user->username) }}"
                    class="input @error('username') ring-red-500 @enderror">
                @error('username')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required maxlength="255" autocomplete="email" value="{{ old('email', $user->email) }}"
                    class="input @error('email') ring-red-500 @enderror">
                @error('email')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password">New Password</label>
                <input type="password" name="password" id="password" minlength="3" autocomplete="new-password" class="input @error('password') ring-red-500 @enderror">
                @error('password')
                    <p class="error">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password_confirmation">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" autocomplete="new-password" class="input">
            </div>

            <div class="mb-6">
                <label for="avatar">Profile Image</label>
                <input type="file" name="avatar" id="avatar" accept="image/*" class="input">
                @error('avatar')
                    <p class="error">{{ $message }}</p>
                @enderror
                @if ($user->avatar)
                    <img src="{{ asset('storage/' . $user->avatar) }}" class="w-16 h-16 rounded-full mt-2">
                @endif
            </div>

            <button type="submit" class="btn">Update Profile</button>
        </form>
    </div>
</x-layout>
