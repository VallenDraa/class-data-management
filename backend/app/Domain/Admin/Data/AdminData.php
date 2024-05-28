<?php

namespace Domain\Admin\Data;

use Spatie\LaravelData\Data;

class AdminData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $nama,
        public readonly string $email,
        public readonly ?string $jabatan,
        public readonly string $created_at,
    ) {
    }
}
