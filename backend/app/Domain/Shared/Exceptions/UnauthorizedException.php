<?php

namespace Domain\Shared\Exceptions;

use Illuminate\Http\Exceptions\HttpResponseException;


class UnauthorizedException extends HttpResponseException
{
    public static function handle(): self
    {
        return new self(response()->json([
            'errors' => [
                'message' => 'Tidak dapat diakses tanpa login!'
            ]
        ])->setStatusCode(401));
    }
}
