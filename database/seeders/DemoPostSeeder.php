<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class DemoPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('username', 'admin')->first();
        $testUser = User::where('username', 'testuser')->first();

        $posts = [
            [$testUser, 'Sunset at the beach', 'Golden hour at the beach with the sun going down over the water.', 'beach-sunset.jpg', 'warm'],
            [$testUser, 'Mountain view', 'A clear day in the mountains with snow on the highest peak.', 'mountain-view.jpg', 'none'],
            [$admin, 'City lights', 'The city at night, taken from the top of a hill.', 'city-lights.jpg', 'vivid'],
            [$admin, 'Forest lake', 'A quiet lake surrounded by pine trees.', 'forest-lake.jpg', 'grayscale'],
        ];

        foreach ($posts as [$user, $title, $body, $image, $filter]) {
            // copy the photo into storage so deleting the post never removes the original
            $path = Storage::disk('public')->putFile('post_images', new File(database_path('seeders/images/' . $image)));

            $post = new Post([
                'title' => $title,
                'body' => $body,
                'image' => $path,
                'filter' => $filter,
            ]);
            $post->user()->associate($user);
            $post->save();
        }
    }
}
