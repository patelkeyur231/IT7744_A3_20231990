<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TransformsRequest;

class SanitizeInput extends TransformsRequest
{
    // fields that must be saved exactly as typed
    protected $except = [
        '_token',
        'password',
        'password_confirmation',
    ];

    // remove html tags from every text field before validation
    protected function transform($key, $value)
    {
        if (in_array($key, $this->except, true) || ! is_string($value)) {
            return $value;
        }

        return trim(strip_tags($value));
    }
}
