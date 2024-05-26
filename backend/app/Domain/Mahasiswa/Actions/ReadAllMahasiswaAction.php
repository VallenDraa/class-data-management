<?php

namespace Domain\Mahasiswa\Actions;

use Domain\History\Actions\AddMahasiswaHistoryAction;
use Domain\Mahasiswa\Data\MahasiswaPreviewData;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\SortingTypes;
use Domain\Shared\Enums\UserRoleses;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class ReadAllMahasiswaAction
{
    use AsAction;

    public function handle(Request $request): array
    {
        $result = User::join('mahasiswas', 'mahasiswas.user_id', '=', 'users.id');

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

        if ($request->page > $pageCount || $request->page < 1)
            throw BadRequestException::because("Request page melebihi batas (harus diantara 1 sampai $pageCount)");

        $result->offset(($request->page - 1) * $request->length)
            ->limit($request->length);

        return [
            'jumlah' => $dataCount,
            'next_page' => $request->page == $pageCount ? $pageCount : $request->page + 1,
            'last_page' => $request->page == 1 ? 1 : $request->page - 1,
            'data' => $result->get()->map(fn ($item) => MahasiswaPreviewData::from($item)),
        ];
    }
    public function asController(Request $request): JsonResponse
    {
        if (UserData::fromAuth()->role == UserRoleses::Mahasiswa)
            AddMahasiswaHistoryAction::handle("Melihat seluruh data mahasiswa yang tersedia", UserData::fromAuth()->id);

        return response()->json([
            'success' => $this->handle($request)
        ])->setStatusCode(200);
    }
}
