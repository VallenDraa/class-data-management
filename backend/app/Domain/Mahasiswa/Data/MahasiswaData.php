<?php

namespace Domain\Mahasiswa\Data;

use Spatie\LaravelData\Data;

class MahasiswaData extends Data
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $nama,
        public readonly string $nim,
        public readonly ?string $tanggal_lahir,
        public readonly ?string $no_telepon,
        public readonly ?string $foto_profile,
        public readonly ?string $list_kesukaan,
        public readonly ?string $alamat,
        public readonly ?string $latitude,
        public readonly ?string $longitude,
    ) {
    }
}
