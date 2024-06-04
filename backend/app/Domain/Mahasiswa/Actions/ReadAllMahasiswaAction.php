<?php

namespace Domain\Mahasiswa\Actions;

use Domain\History\Actions\AddMahasiswaHistoryAction;
use Domain\Mahasiswa\Data\MahasiswaPreviewData;
use Domain\Shared\Actions\DateTimeFormating;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\SortingTypes;
use Domain\Shared\Enums\UserRoleses;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class ReadAllMahasiswaAction
{
    use AsAction;

    public function handle(Request $request): array
    {
        $result = User::select(
            'users.id',
            'users.nama',
            'mahasiswas.nim',
            'mahasiswas.foto_profile',
            'users.created_at',
            'users.updated_at'
            )->join('mahasiswas', 'mahasiswas.user_id', '=', 'users.id');

        if ($request->has('search')) {
            $searchTerm = '%' . strtolower($request->search) . '%';
            $result->whereRaw('LOWER(nama) LIKE ?', [$searchTerm])
                ->orWhereRaw('LOWER(nim) LIKE ?', [$searchTerm]);
        }

        if (SortingTypes::validatedValue($request->sort)) {
            $sortType = SortingTypes::from($request->sort);
            $result->orderBy($sortType->column(), $sortType->direction());
        }

        if (!$request->has('page') || !$request->has('length'))
            throw BadRequestException::because("Request harus menyertakan page dan length");

        $dataCount = $result->count();
        $pageCount = ceil($dataCount / $request->length);

        $result->offset(($request->page - 1) * $request->length)
            ->limit($request->length);

        return [
            'jumlah' => $dataCount,
            'next_page' => $pageCount == 0 ? 0 : ($request->page < $pageCount ? $request->page + 1 : $pageCount),
            'last_page' => $pageCount,
            'data' => $request->page > $pageCount || $request->page < 1 ? [] : $result->get()->map(function ($item) {
                $result = MahasiswaPreviewData::from($item)->toArray();
                $result['created_at'] = DateTimeFormating::handle($result['created_at']);
                $result['updated_at'] = DateTimeFormating::handle($result['updated_at']);
                return $result;
            }),
        ];
    }
    public function asController(Request $request): JsonResponse
    {
        if (isset(Auth::user()->id))
            if (UserData::fromAuth()->role->canAddHistory())
                AddMahasiswaHistoryAction::handle("Melihat seluruh data mahasiswa yang tersedia", UserData::fromAuth()->id);

        return response()->json([
            'success' => $this->handle($request)
        ])->setStatusCode(200);
    }
}
