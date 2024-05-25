<?php

namespace Domain\Shared\Exceptions;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class RoleForbiddenException extends HttpResponseException
{
    public function __construct(array $required_role)
    {
        parent::__construct(response()->json([
            'errors' => [
                'user_role' => Auth::user()->role,
                'required_role' => implode(", ", $required_role),
                'message' => 'Forbidden!'
            ]
        ])->setStatusCode(403));
    }
}
