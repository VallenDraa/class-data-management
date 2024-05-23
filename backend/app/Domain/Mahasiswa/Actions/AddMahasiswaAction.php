<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Shared\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\BadRequestException;

use Lorisleiva\Actions\Concerns\AsAction;

class AddMahasiswaAction
{
    use AsAction;

    public function handle(UserData $data,)
    {
        if (User::where('nim', $data->nim)->exists())
            throw BadRequestException::because("NIM sudah terdaftar sebelumnya! Tolong gunakan NIM lain");

        if (!$data->password || !$data->name)
            throw BadRequestException::because("Data tidak boleh ada yang kosong!");

        if (strlen($data->password) < 6)
            throw BadRequestException::because("Password minimal 6 karakter!");

        $user = User::create([
            'name' => $data->name,
            'role' => 'Mahasiswa',
            'nim' => $data->nim,
            'password' => Hash::make($data->password),
        ]);

        Mahasiswa::create([
            'user_id' => $user->id
        ]);
    }

    public function asController(UserData $data): JsonResponse
    {
        $this->handle($data);

        return response()->json([
            'success' => [
                'message' => 'Akunmu berhasil ditambahkan!'
            ]
        ])->setStatusCode(201);
    }
}
