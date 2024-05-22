<?php

namespace Domain\Shared\Actions;

use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\Shared\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class CheckAuthenticationAction
{
    use AsAction;

    public function handle(UserData $data): User
    {
        $user = User::where('email', $data->email)->first();
        if (!$user || !Hash::check($data->password, $user->password)) {
            throw BadRequestException::because('Email atau password tidak sesuai!');
        }

        return $user;
    }

    public function asController(UserData $data)
    {
        $user = $this->handle($data);

        return response()->json([
            'success' => [
                'token' => $user->createToken(
                    'personal_access_tokens',
                    [],
                    null
                )->plainTextToken,
                'expires_at' => null
            ]
        ]);
    }
}
