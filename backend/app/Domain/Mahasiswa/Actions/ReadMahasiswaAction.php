<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class ReadMahasiswaAction
{
    use AsAction;

    public function handle()
    {
        return User::select(
            "user.id",
            "user.nama",
            "nim",
            "foto_profile",
            "tanggal_lahir",
            "no_telepon",
            "list_kesukaan",
            "alamat",
        )->get();
    }
    public function asController(): JsonResponse
    {
        return response()->json([
            'success' => [
                'data' => $this->handle()
            ]
        ])->setStatusCode(200);
    }
}
