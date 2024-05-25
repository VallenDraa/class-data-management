<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Domain\Shared\Data\UserData;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Mahasiswa\Data\MahasiswaData;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\Hash;
use Lorisleiva\Actions\Concerns\AsAction;

class MahasiswaAuthenticationAction
{
    use AsAction;

    public function handle(UserData $userData, MahasiswaData $mahasiswaData): User
    {
        $mahasiswa = Mahasiswa::where('nim', $mahasiswaData->nim)->first();

        if (!$mahasiswa)
            throw BadRequestException::because('NIM atau Password tidak sesuai!');

        $user = User::find($mahasiswa->user_id);

        if (!$user || !Hash::check($userData->password, $user->password))
            throw BadRequestException::because('NIM atau Password tidak sesuai!');

        return $user;
    }

    public function asController(UserData $userData, MahasiswaData $mahasiswaData): JsonResponse
    {
        $user = $this->handle($userData, $mahasiswaData);

        return response()->json([
            'success' => [
                'message' => 'Berhasil login!',
                'token' => $user->createToken(
                    'personal_access_tokens',
                    [],
                    null
                )->plainTextToken,
                'expires_at' => null
            ]
        ])->setStatusCode(200);
    }
}
