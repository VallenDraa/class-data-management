<?php

namespace Domain\Shared\Actions;

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

        return response()->json([
            'success' => [
                'message' => 'Berhasil melakukan logout'
            ]
        ])->setStatusCode(200);
    }
}
