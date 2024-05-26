<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteMahasiswaAction
{
    use AsAction;

    public function handle($id): void
    {
        Mahasiswa::findOrFail($id)->delete();
    }
    public function asController($id): JsonResponse
    {
        if (!UserData::fromAuth()->role->canDeleteMahasiswa())
            throw new RoleForbiddenException(
                UserData::fromAuth()->role->getRequiredRole("canDeleteMahasiswa")
            );

        $this->handle($id);

        return response()->json([
            'success' => [
                'message' => 'Data mahasiswa berhasil dihapus!'
            ]
        ]);
    }
}
