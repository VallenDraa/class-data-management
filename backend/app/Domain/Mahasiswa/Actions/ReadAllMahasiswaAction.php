<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class ReadAllMahasiswaAction
{
    use AsAction;

    public function handle(Request $request)
    {
        return User::select(
            'users.id',
            'users.nama',
            'mahasiswas.nim',
            'mahasiswas.foto_profile',
            'mahasiswas.tanggal_lahir',
            'mahasiswas.no_telepon',
            'mahasiswas.list_kesukaan',
            'alamats.alamat',
            'alamats.latitude',
            'alamats.longitude',
        )->join('mahasiswas', 'mahasiswas.user_id', 'users.id')
            ->join('alamats', 'alamats.id', 'mahasiswas.alamat_id')
            ->paginate(1);
    }
    public function asController(Request $request): JsonResponse
    {
        return response()->json([
            'success' => [
                'data' => $this->handle($request)
            ]
        ])->setStatusCode(200);
    }
}
