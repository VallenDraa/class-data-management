<?php

namespace Domain\Shared\Enums;

use Domain\Mahasiswa\MahasiswaPolicyTrait;

enum UserRoleses: string
{
    use MahasiswaPolicyTrait;

    case Admin = 'Admin';
    case Mahasiswa = 'Mahasiswa';
    public static function getRequiredRole(string $method): array
    {
        $roles = [];

        foreach (self::cases() as $role)
            if (method_exists(self::class, $method)) {
                if (self::from($role->value)->$method())
                    $roles[] = $role->value;
            } else {
                throw new \InvalidArgumentException("Method $method doesn't exist.");
            }

        return $roles;
    }
}
