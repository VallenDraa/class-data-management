<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;

class BadRequestException extends HttpResponseException
{
    public static function because(string $message): self
    {
        return new self(response()->json([
            'errors' => [
                'message' => $message
            ]
        ])->setStatusCode(400));
    }
}
