<?php

namespace Domain\Mahasiswa\Policies;

use Domain\Shared\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class MahasiswaPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __invoke()
    {
        Gate::define('add-mahasiswa', function () {
            if (Auth::user()->role === 'Admin')
                return 'Admin';
        });
        Gate::define('delete-mahasiswa', function () {
            if (Auth::user()->role === 'Admin')
                return 'Admin';
        });
        Gate::define('get-mahasiswa-history', function () {
            if (Auth::user()->role === 'Admin')
                return 'Admin';
        });
    }
}
