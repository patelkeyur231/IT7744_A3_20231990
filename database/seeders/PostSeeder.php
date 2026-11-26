<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Create 20 dummy posts spread across the existing users.
     */
    public function run(): void
    {
        $users = User::all();

        Post::factory(20)
            ->state(fn () => ['user_id' => $users->random()->id])
            ->create();
    }
}
