<?php

namespace Domain\History\Actions;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Domain\History\Data\HistoryData;
use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Domain\Shared\Exceptions\BadRequestException;

class ReadMahasiswaHistoryAction
{
    use AsAction;

    public function handle(Request $request, int $userId)
    {
        $result = Mahasiswa::join('users', 'users.id', 'mahasiswas.user_id')
        ->join('history_mahasiswas', 'history_mahasiswas.mahasiswa_id', 'mahasiswas.id')
        ->where(
            'mahasiswas.id',
            Mahasiswa::where('user_id', $userId)->firstOrFail()->id
        );

        if (!$request->has('page') || !$request->has('length'))
            throw BadRequestException::because("Request harus menyertakan page dan length");

        $dataCount = $result->count();
        $pageCount = ceil($dataCount / $request->length);

        if ($request->page > $pageCount || $request->page < 1)
            throw BadRequestException::because("Request page melebihi batas (harus diantara 1 sampai $pageCount)");

        $result->offset(($request->page - 1) * $request->length)
            ->limit($request->length);

        return [
            'jumlah' => $dataCount,
            'next_page' => $request->page == $pageCount ? $pageCount : $request->page + 1,
            'last_page' => $request->page == 1 ? 1 : $request->page - 1,
            'data' => $result->get()
                ->map(fn ($item) => HistoryData::from($item))
        ];
    }

    public function asController(Request $request, int $id): JsonResponse
    {
        if (!UserData::fromAuth()->role->canReadHistory())
            throw new RoleForbiddenException(
                UserData::fromAuth()->role->getRequiredRole("canReadHistory")
            );

        return response()->json([
            'success' => $this->handle($request, $id)
        ])->setStatusCode(200);
    }
}
