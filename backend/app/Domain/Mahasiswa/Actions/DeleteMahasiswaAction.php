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
        $currentUserRole = UserData::fromAuth()->role;

        if (!$currentUserRole->canAddMahasiswa())
            throw new RoleForbiddenException(
                $currentUserRole->getRequiredRole("canAddMahasiswa")
            );

        $this->handle($id);

        return response()->json([
            'success' => [
                'message' => 'Data mahasiswa berhasil dihapus!'
            ]
        ]);
    }
}
