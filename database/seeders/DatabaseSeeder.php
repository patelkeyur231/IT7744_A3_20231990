<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // admin user
        User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'admin',
            'role' => 'admin',
        ]);

        // test user
        User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
        ]);

        // random users
        User::factory(4)->create();

        // dummy posts
        $this->call(PostSeeder::class);
    }
}
