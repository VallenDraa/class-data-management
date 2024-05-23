<?php

namespace Domain\Shared\Data;

use Illuminate\Http\JsonResponse;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public readonly ?string $name,
        public readonly ?string $password,
        public readonly ?string $role,
        public readonly ?bool $remember_me,
    ) {
    }

    public static function responseWithToken(string $token, ?int $expires_at): JsonResponse
    {
        return response()->json([
            'success' => [
                'token' => $token,
                'expires_at' => $expires_at
            ]
        ])->setStatusCode(200);
    }
}
