<?php

namespace Domain\Mahasiswa\Actions;

use Domain\History\Actions\AddMahasiswaHistoryAction;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;
use Domain\Mahasiswa\Data\MahasiswaData;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\UserRoleses;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;

class ReadMahasiswaAction
{
    use AsAction;
    public function handle($id = "self"): Array
    {
        $result = MahasiswaData::from(
            User::join('mahasiswas', 'mahasiswas.user_id', '=', 'users.id')
                ->join('alamats', 'alamats.id', '=', 'mahasiswas.alamat_id')
                ->where(
                    'users.id',
                    $id == "self" ? UserData::fromAuth()->id : $id
                )->firstOrFail()
                )->toArray();
        $result['id'] = UserData::fromAuth()->id;
        return $result;
    }
    public function asController($id = "self"): JsonResponse
    {
        if ($id == "self" && UserData::fromAuth()->role == UserRoleses::Admin)
            throw BadRequestException::because("Kamu adalah seorang Admin!! admin harus memberikan spesifik id mahasiswa");

        if (UserData::fromAuth()->role->canAddHistory())
            AddMahasiswaHistoryAction::handle("Melihat data pribadi", UserData::fromAuth()->id);

        return response()->json(
            $this->handle($id)
        )->setStatusCode(200);
    }
}
