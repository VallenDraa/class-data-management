<?php

namespace Domain\Mahasiswa\Data;

use Spatie\LaravelData\Data;

class MahasiswaPreviewData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $nama,
        public readonly string $nim,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }
}
