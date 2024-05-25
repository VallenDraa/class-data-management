<?php

namespace Domain\Shared\Exceptions;

use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;

class ForbiddenException extends HttpResponseException
{
    public function __construct()
    {
        parent::__construct(response()->json([
            'errors' => [
                'message' => 'Forbidden!'
            ]
        ])->setStatusCode(403));
    }
}
