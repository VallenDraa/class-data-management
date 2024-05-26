<?php

namespace Domain\Shared\Actions;

use Domain\History\Actions\AddMahasiswaHistoryAction;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\UserRoleses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteTokenAction
{
    use AsAction;

    public function handle()
    {
        Auth::user()->tokens()->delete();
    }

    public function asController(): JsonResponse
    {
        $this->handle();

        if (UserData::fromAuth()->role->canAddHistory())
            AddMahasiswaHistoryAction::handle("Melakukan logout", UserData::fromAuth()->id);

        return response()->json([
            'success' => [
                'message' => 'Berhasil melakukan logout'
            ]
        ])->setStatusCode(200);
    }
}
