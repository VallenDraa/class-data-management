<?php

namespace Domain\Admin\Actions;

use Domain\Admin\Data\AdminData;
use Domain\Admin\Models\Admin;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Lorisleiva\Actions\Concerns\AsAction;

class AdminAutheticationAction
{
    use AsAction;

    public function handle(UserData $userData, AdminData $adminData): User
    {
        $admin = Admin::where('email', $adminData->email)->first();

        if (!$admin)
            throw BadRequestException::because('Email atau Password tidak sesuai!');

        $user = User::find($admin->user_id);

        if (!$user || !Hash::check($userData->password, $user->password))
            throw BadRequestException::because('Email atau Password tidak sesuai!');

        return $user;
    }

    public function asController(UserData $userData, AdminData $adminData): JsonResponse
    {
        $user = $this->handle($userData, $adminData);

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
        ])->setStatusCode(201);
    }
}
