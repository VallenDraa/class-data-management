<?php

namespace Domain\Shared\Data;

use Domain\Shared\Enums\UserRoleses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public readonly ?int $id,
        public readonly ?string $nama,
        public readonly ?string $password,
        public readonly ?UserRoleses $role,
        public readonly ?bool $remember_me,
    ) {
    }

    public static function fromAuth(): self
    {
        return new self(
            Auth::user()->id,
            Auth::user()->nama,
            Auth::user()->password,
            UserRoleses::from(Auth::user()->role),
            null
        );
    }
}
