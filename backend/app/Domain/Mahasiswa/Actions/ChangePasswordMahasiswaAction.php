<?php

namespace Domain\Mahasiswa\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Domain\Shared\Data\UserData;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Domain\Shared\Models\User;
use Domain\Shared\Exceptions\BadRequestException;
use Domain\History\Actions\AddMahasiswaHistoryAction;

class ChangePasswordMahasiswaAction
{
    use AsAction;

    public function handle(Request $request): void
    {
        if (
            !$request->has('recent_password') ||
            !$request->has('new_password') ||
            !$request->has('confirm_password')
        ) throw BadRequestException::because('Lengkapi data dengan benar!');

        if (!Hash::check($request->recent_password, UserData::fromAuth()->password))
            throw BadRequestException::because('Recent password salah!');

        if ($request->new_password != $request->confirm_password)
            throw BadRequestException::because('New password dan confirm password harus sama!');

        if (strlen($request->new_password) < 8)
            throw BadRequestException::because('Password minimal 8 karakter!');

        User::findOrFail(UserData::fromAuth()->id)
            ->update([
                'password' => Hash::make($request->new_password)
            ]);
    }
    public function asController(Request $request): JsonResponse
    {
        if (!UserData::fromAuth()->role->canChangePasswordMahasiswa())
            throw new RoleForbiddenException(
                UserData::fromAuth()->role->getRequiredRole("canChangePasswordMahasiswa")
            );

        if (UserData::fromAuth()->role->canAddHistory())
            AddMahasiswaHistoryAction::handle("Mengubah password", UserData::fromAuth()->id);

        $this->handle($request);

        return response()->json([
            'success' => [
                'message' => 'Password berhasil diubah!'
            ]
        ])->setStatusCode(200);
    }
}
