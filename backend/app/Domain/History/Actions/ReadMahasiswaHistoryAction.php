<?php

namespace Domain\History\Actions;

use Domain\Shared\Actions\DateTimeFormating;
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
        )->orderBy('users.created_at', 'desc');

        if (!$request->has('page') || !$request->has('length'))
            throw BadRequestException::because("Request harus menyertakan page dan length");

        $dataCount = $result->count();
        $pageCount = ceil($dataCount / $request->length);

        $result->offset(($request->page - 1) * $request->length)
            ->limit($request->length);

        return [
            'jumlah' => $dataCount,
            'next_page' => $request->page == $pageCount ? $pageCount : $request->page + 1,
            'last_page' => $pageCount,
            'data' => $request->page > $pageCount || $request->page < 1 ? [] : $result->get()
                ->map(function ($item) {
                    $result = HistoryData::from($item)->toArray();
                    $result['created_at'] = DateTimeFormating::handle($result['created_at']);
                    return $result;
                })
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
