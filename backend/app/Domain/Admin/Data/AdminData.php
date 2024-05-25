<?php

namespace Domain\Admin\Data;

use Spatie\LaravelData\Data;

class AdminData extends Data
{
    public function __construct(
        public readonly string $email,
        public readonly ?string $jabatan,
    ) {
    }
}
