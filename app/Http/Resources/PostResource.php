<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Shape of one post in the JSON response.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'author' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
            ],
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
