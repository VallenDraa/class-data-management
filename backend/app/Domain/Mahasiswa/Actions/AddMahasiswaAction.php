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
use Domain\Shared\Exceptions\ForbiddenException;
use Illuminate\Support\Facades\Gate;
use Lorisleiva\Actions\Concerns\AsAction;

class AddMahasiswaAction
{
    use AsAction;

    public function handle(UserData $userData, MahasiswaData $mahasiswaData): void
    {
        if (User::where('nim', $mahasiswaData->nim)->exists())
            throw BadRequestException::because("NIM sudah terdaftar sebelumnya! Tolong gunakan NIM lain");

        if (strlen($userData->password) < 6)
            throw BadRequestException::because("Password minimal 6 karakter!");

        $user = User::create([
            'name' => $userData->name,
            'role' => 'Mahasiswa',
            'password' => Hash::make($mahasiswaData->nim),
        ]);

        $alamat = Alamat::create([
            'alamat' => $mahasiswaData->alamat
        ]);

        Mahasiswa::create([
            'nim' => $mahasiswaData->nim,
            'tanggal_lahir' => $mahasiswaData->tanggal_lahir,
            'user_id' => $user->id,
            'alamat_id' => $alamat->id
        ]);
    }

    public function asController(UserData $userData, MahasiswaData $mahasiswaData): JsonResponse
    {
        if (Gate::denies('add-mahasiswa'))
            throw new ForbiddenException();

        $this->handle($userData, $mahasiswaData);

        return response()->json([
            'success' => [
                'message' => 'Data mahasiswa berhasil ditambahkan!'
            ]
        ])->setStatusCode(201);
    }
}
