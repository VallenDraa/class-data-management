<?php

namespace Domain\Mahasiswa;

use Domain\Shared\Enums\UserRoleses;

trait MahasiswaPolicyTrait
{
    public function canAddMahasiswa(): bool
    {
        return match ($this) {
            UserRoleses::Admin => true,
            UserRoleses::Mahasiswa => false,
        };
    }

    public function canUpdateOtherMahasiswa(): bool
    {
        return match ($this) {
            UserRoleses::Admin => true,
            UserRoleses::Mahasiswa => false,
        };
    }

    public function canDeleteMahasiswa(): bool
    {
        return match ($this) {
            UserRoleses::Admin => true,
            UserRoleses::Mahasiswa => false,
        };
    }

    public function canReadHistory(): bool
    {
        return match ($this) {
            UserRoleses::Admin => true,
            UserRoleses::Mahasiswa => false,
        };
    }

    public function canAddHistory(): bool
    {
        return match ($this) {
            UserRoleses::Admin => false,
            UserRoleses::Mahasiswa => true,
        };
    }
}
