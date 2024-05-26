<?php

namespace Domain\Admin\Actions;

use Domain\Admin\Models\Admin;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Lorisleiva\Actions\Concerns\AsAction;

class AdminAutheticationAction
{
    use AsAction;

    public function handle(Request $request): User
    {
        $admin = Admin::where('email', $request->email)->first();

        if (!$admin)
            throw BadRequestException::because('Email atau Password tidak sesuai!');

        $user = User::find($admin->user_id);

        if (!$user || !Hash::check($request->password, $user->password))
            throw BadRequestException::because('Email atau Password tidak sesuai!');

        return $user;
    }

    public function asController(Request $request): JsonResponse
    {
        $user = $this->handle($request);

        return response()->json([
            'success' => [
                'message' => 'Berhasil login!',
                'token' => $user->createToken(
                    'personal_access_tokens',
                    [],
                    null
                )->plainTextToken,
                'expires_at' => null
            ]
        ])->setStatusCode(200);
    }
}
