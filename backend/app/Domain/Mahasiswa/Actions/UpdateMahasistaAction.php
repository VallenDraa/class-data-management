<?php

namespace Domain\Mahasiswa\Actions;

use Domain\History\Actions\AddMahasiswaHistoryAction;
use Domain\Mahasiswa\Data\MahasiswaData;
use Domain\Mahasiswa\Models\Alamat;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateMahasistaAction
{
    use AsAction;

    public function handle(UserData $userData, MahasiswaData $mahasiswaData, int $id = null): void
    {
        $currentUserId = $id ?? UserData::fromAuth()->id;

        $user = User::with('mahasiswa.alamat')
            ->findOrFail($currentUserId);

        $user->update(['nama' => $userData->nama]);

        if(!is_array($mahasiswaData->list_kesukaan))
            // throw BadRequestException::because(implode(', ', $mahasiswaData->list_kesukaan));
            throw BadRequestException::because('Data list_kesukaan harus array');
        $mahasiswa = $user->mahasiswa;
        $mahasiswa->update([
            'nim' => $mahasiswaData->nim,
            'tanggal_lahir' => $mahasiswaData->tanggal_lahir,
            'no_telepon' => $mahasiswaData->no_telepon,
            'list_kesukaan' => $mahasiswaData->list_kesukaan,
        ]);

        $mahasiswa->alamat->update([
            'alamat' => $mahasiswaData->alamat,
            'latitude' => $mahasiswaData->latitude,
            'longitude' => $mahasiswaData->longitude,
        ]);
    }

    public function asController(UserData $userData, MahasiswaData $mahasiswaData, int $id = null): JsonResponse
    {
        if ($id)
            if (!UserData::fromAuth()->role->canUpdateOtherMahasiswa())
                throw new RoleForbiddenException(
                    UserData::fromAuth()->role->getRequiredRole("canUpdateOtherMahasiswa")
                );

        if (UserData::fromAuth()->role->canAddHistory())
            AddMahasiswaHistoryAction::handle("Mengubah data pribadi", UserData::fromAuth()->id);

        $this->handle($userData, $mahasiswaData, $id);

        return response()->json([
            'success' => [
                'message' => 'Data berhasil diubah!'
            ]
        ])->setStatusCode(200);
    }
}
