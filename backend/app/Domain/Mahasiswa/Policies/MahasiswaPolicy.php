<?php

namespace Domain\Mahasiswa\Policies;

use Domain\Shared\Models\User;
use Illuminate\Support\Facades\Gate;

class MahasiswaPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __invoke()
    {
        Gate::define('add-mahasiswa', fn(User $user) => $user->role == 'Admin');
        Gate::define('delete-mahasiswa', fn(User $user) => $user->role == 'Admin');
        Gate::define('get-mahasiswa-history', fn(User $user) => $user->role == 'Admin');
    }
}
