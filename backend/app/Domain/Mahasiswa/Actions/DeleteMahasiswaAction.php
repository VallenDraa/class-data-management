<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Mahasiswa\Models\Alamat;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteMahasiswaAction
{
    use AsAction;

    public function handle(Request $request): void
    {
        $mahasiswa = Mahasiswa::where('user_id', $request->id)->firstOrFail();
        $mahasiswa->alamat()->delete();
        $mahasiswa->delete();
        User::findOrFail($request->id)->delete();
    }
    public function asController(Request $request): JsonResponse
    {
        if (!UserData::fromAuth()->role->canDeleteMahasiswa())
            throw new RoleForbiddenException(
                UserData::fromAuth()->role->getRequiredRole("canDeleteMahasiswa")
            );

        $this->handle($request);

        return response()->json([
            'success' => [
                'message' => 'Data mahasiswa berhasil dihapus!'
            ]
        ]);
    }
}
