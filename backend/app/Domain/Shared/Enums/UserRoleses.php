<?php

namespace Domain\Shared\Enums;

enum UserRoleses: string
{
    case Admin = 'Admin';
    case Mahasiswa = 'Mahasiswa';
    public function canAddMahasiswa(): bool
    {
        return match ($this) {
            self::Admin => true,
            self::Mahasiswa => false,
        };
    }
    public function canUpdateOtherMahasiswa(): bool
    {
        return match ($this) {
            self::Admin => true,
            self::Mahasiswa => false,
        };
    }
    public function canDeleteMahasiswa(): bool
    {
        return match ($this) {
            self::Admin => true,
            self::Mahasiswa => false,
        };
    }
    public function canReadHistory(): bool
    {
        return match ($this) {
            self::Admin => true,
            self::Mahasiswa => false,
        };
    }
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
