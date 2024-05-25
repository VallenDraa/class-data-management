<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Mahasiswa\Data\MahasiswaData;
use Domain\Mahasiswa\Models\Alamat;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class EditMahasistaAction
{
    use AsAction;

    public function handle(UserData $userData, MahasiswaData $mahasiswaData): void
    {
        $user = User::with('mahasiswa.alamat')
            ->findOrFail(UserData::fromAuth()->id);

        $user->update(['nama' => $userData->nama]);

        $mahasiswa = $user->mahasiswa;
        $mahasiswa->update([
            'nim' => $mahasiswaData->nim,
            'tanggal_lahir' => $mahasiswaData->tanggal_lahir,
            'no_telepon' => $mahasiswaData->no_telepon,
            'foto_profile' => $mahasiswaData->foto_profile,
            'list_kesukaan' => $mahasiswaData->list_kesukaan,
        ]);

        $mahasiswa->alamat->update([
            'alamat' => $mahasiswaData->alamat,
            'latitude' => $mahasiswaData->latitude,
            'longitude' => $mahasiswaData->longitude,
        ]);
    }

    public function asController(UserData $userData, MahasiswaData $mahasiswaData): JsonResponse
    {
        $this->handle($userData, $mahasiswaData);

        return response()->json([
            'success' => [
                'message' => 'Data berhasil diubah!'
            ]
        ])->setStatusCode(200);
    }
}
