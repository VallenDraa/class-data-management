<?php

namespace Domain\History\Data;

use Spatie\LaravelData\Data;

class HistoryData extends Data
{
    public function __construct(
        public readonly string $nim,
        public readonly string $nama,
        public readonly string $aksi,
        public readonly string $created_at
    ) {
    }
}
