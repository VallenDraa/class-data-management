<?php

namespace Domain\Mahasiswa\Actions;

use Domain\Mahasiswa\Data\MahasiswaData;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\UserRoleses;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class ReadMahasiswaAction
{
    use AsAction;

    public function handle($id = null)
    {
        $currentUserId = $id == "self" ? UserData::fromAuth()->id : $id;

        return MahasiswaData::from(
            User::join('mahasiswas', 'mahasiswas.user_id', '=', 'users.id')
                ->join('alamats', 'alamats.id', '=', 'mahasiswas.alamat_id')
                ->find($currentUserId)
        );
    }
    public function asController($id = null): JsonResponse
    {
        if ($id == "self" && UserData::fromAuth()->role == UserRoleses::Admin)
            throw BadRequestException::because("Kamu adalah seorang Admin!! tidak terdapat id mahasiswa di request");

        return response()->json(
            $this->handle($id)
        )->setStatusCode(200);
    }
}
