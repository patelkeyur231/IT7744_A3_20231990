<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Run with: php artisan migrate:fresh --seed
     */
    public function run(): void
    {
        // A known test account you can log in with (password: password)
        User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
        ]);

        // 4 more random users
        User::factory(4)->create();

        // 20 dummy posts for those users
        $this->call(PostSeeder::class);
    }
}
