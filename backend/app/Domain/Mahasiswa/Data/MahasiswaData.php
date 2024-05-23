<?php

namespace Domain\Mahasiswa\Data;

use Spatie\LaravelData\Data;

class MahasiswaData extends Data
{
    public function __construct(
        public readonly string $nim,
        public readonly ?string $tanggal_lahir,
        public readonly ?string $no_telepon,
        public readonly ?string $list_kesukaan
        ){

    }
}
