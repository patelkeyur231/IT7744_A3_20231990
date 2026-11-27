<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $user = $request->user('sanctum');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'image_url' => $this->image ? asset('storage/' . $this->image) : asset('storage/post_images/default.jpg'),
            'filter' => $this->filter,
            'author' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
            ],
            'can_edit' => $user ? $user->can('modify', $this->resource) : false,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
