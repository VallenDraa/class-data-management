<?php

namespace Domain\Costumer\Actions;

use Domain\Shared\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;
use Domain\Costumer\Models\Costumer;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\BadRequestException;

class AddCostumerAction
{
    use AsAction;

    public function handle(UserData $data)
    {
        if (User::where('email', $data->email)->exists()) {
            throw BadRequestException::because("Email sudah terdaftar sebelumnya! Tolong gunakan email lain");
        }

        if (!$data->password || !$data->name) {
            throw BadRequestException::because("Data tidak boleh ada yang kosong!");
        }

        if (strlen($data->password) < 6) {
            throw BadRequestException::because("Password minimal 6 karakter!");
        }

        $user = User::create([
            'name' => $data->name,
            'role' => 'Costumer',
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);

        Costumer::create([
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
