<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Shared\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Mahasiswa\Data\MahasiswaData;
use Domain\Mahasiswa\Models\Alamat;

use Lorisleiva\Actions\Concerns\AsAction;

class AddMahasiswaAction
{
    use AsAction;

    public function handle(UserData $userData, MahasiswaData $mahasiswaData)
    {
        if (User::where('nim', $mahasiswaData->nim)->exists())
            throw BadRequestException::because("NIM sudah terdaftar sebelumnya! Tolong gunakan NIM lain");

        if (
            !$userData->password ||
            !$userData->name
            ) throw BadRequestException::because("Data tidak boleh ada yang kosong!");

        if (strlen($userData->password) < 6)
            throw BadRequestException::because("Password minimal 6 karakter!");

        $user = User::create([
            'name' => $userData->name,
            'role' => 'Mahasiswa',
            'nim' => $mahasiswaData->nim,
            'password' => Hash::make($userData->password),
        ]);

        $alamat = Alamat::create([
            'alamat' => $mahasiswaData->alamat,
            'latitude' => $mahasiswaData->latitude,
            'longitude' => $mahasiswaData->longitude
        ]);

        Mahasiswa::create([
            'user_id' => $user->id,
            'alamat_id' => $alamat->id
        ]);
    }

    public function asController(UserData $userData): JsonResponse
    {
        $this->handle($userData);

        return response()->json([
            'success' => [
                'message' => 'Akunmu berhasil ditambahkan!'
            ]
        ])->setStatusCode(201);
    }
}
