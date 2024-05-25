<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Shared\Enums\SortingTypes;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
            'users.created_at as waktu_dibuat',
            'users.updated_at as waktu_diubah',
        )->join('mahasiswas', 'mahasiswas.user_id', 'users.id');

        if ($request->has('search')) {
            $searchTerm = '%' . strtolower($request->search) . '%';
            $result->whereRaw('LOWER(nama) LIKE ?', [$searchTerm])
                ->orWhereRaw('LOWER(nim) LIKE ?', [$searchTerm]);
        }

        if (SortingTypes::validatedValue($request->sort)) {
            $sortType = SortingTypes::from($request->sort);
            $result->orderBy($sortType->column(), $sortType->direction());
        }

        $totalCount = $result->count();

        if ($request->has('page') && $request->has('length'))
            $result->offset(($request->page - 1) * $request->length)
                ->limit($request->length);

        return [
            'data' => $result->get(),
            'jumlah' => $totalCount
        ];
    }
    public function asController(Request $request): JsonResponse
    {
        return response()->json([
            'success' => [
                'jumlah' => $this->handle($request)['jumlah'],
                'data' => $this->handle($request)['data']
            ]
        ])->setStatusCode(200);
    }
}
