<?php

namespace Domain\Mahasiswa\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class EditMahasistaAction
{
    use AsAction;

    public function handle(MahasiswaData $data)
    {
        Mahasiswa::find(Auth::user()->id)
            ->update([
                'address' => $data->address,
                'phone_number' => $data->phone_number
            ]);
    }

    public function asController(MahasiswaData $data): JsonResponse
    {
        $this->handle($data);

        return response()->json([
            'success' => [
                'message' => 'data berhasil diubah'
            ]
        ])->setStatusCode(200);
    }
}
