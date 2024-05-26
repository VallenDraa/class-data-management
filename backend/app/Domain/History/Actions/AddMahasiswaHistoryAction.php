<?php

namespace Domain\History\Actions;

use App\Exceptions\BadRequestException;
use Domain\History\Data\HistoryData;
use Domain\Mahasiswa\Models\HistoryMahasiswa;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class AddMahasiswaHistoryAction
{
    use AsAction;

    public static function handle(string $aksi, int $userId)
    {
        $mahasiswaId = Mahasiswa::where('user_id', $userId)->firstOrFail()->id;

        HistoryMahasiswa::create([
            'aksi' => $aksi,
            'mahasiswa_id' => $mahasiswaId
        ]);
    }
    public function asController(Request $request): JsonResponse
    {
        if (!$request->has('aksi'))
            throw BadRequestException::because("Data aksi tidak boleh kosong");

        $this->handle($request->aksi, UserData::fromAuth()->id);

        return response()->json([
            'success' => [
                'message' => 'Aktifitas berhasil ditambahkan'
            ]
        ])->setStatusCode(201);
    }
}
