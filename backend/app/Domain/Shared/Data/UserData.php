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
        return self::from([
            'id' => Auth::user()->id,
            'nama' => Auth::user()->nama,
            'password' => Auth::user()->password,
            'role' => UserRoleses::from(Auth::user()->role)
        ]);
    }
}
