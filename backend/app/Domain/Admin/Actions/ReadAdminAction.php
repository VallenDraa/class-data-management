<?php

namespace Domain\Admin\Actions;

use Domain\Admin\Data\AdminData;
use Domain\Shared\Data\UserData;
use Domain\Shared\Enums\UserRoleses;
use Domain\Shared\Exceptions\RoleForbiddenException;
use Domain\Shared\Models\User;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class ReadAdminAction
{
    use AsAction;

    public function handle(): AdminData
    {
        return AdminData::from(
            User::join('admins', 'admins.user_id', '=', 'users.id')
                ->where(
                    'users.id', UserData::fromAuth()->id
                )->firstOrFail()
        );
    }
    public function asController(): JsonResponse
    {
        if (UserData::fromAuth()->role != UserRoleses::Admin)
            throw new RoleForbiddenException(["Admin"]);

        return response()->json(
            $this->handle()
        )->setStatusCode(200);
    }
}
