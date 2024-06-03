<?php

use Domain\Admin\Actions\ReadAdminAction;
use Domain\History\Actions\ReadMahasiswaHistoryAction;
use Domain\Mahasiswa\Actions\ResgisterMahasiswaAction;
use Illuminate\Support\Facades\Route;
use Domain\Admin\Actions\AdminAutheticationAction;
use Domain\Mahasiswa\Actions\AddMahasiswaAction;
use Domain\Mahasiswa\Actions\DeleteMahasiswaAction;
use Domain\Shared\Actions\DeleteTokenAction;
use Domain\Mahasiswa\Actions\MahasiswaAuthenticationAction;
use Domain\Mahasiswa\Actions\ReadAllMahasiswaAction;
use Domain\Mahasiswa\Actions\ReadMahasiswaAction;
use Domain\Mahasiswa\Actions\UpdateMahasistaAction;
use Domain\Mahasiswa\Actions\ChangePasswordMahasiswaAction;
use Domain\Mahasiswa\Actions\AddFotoProfileMahasiswaAction;

Route::group(['middleware' => 'auth:sanctum'], function ($router) {
    Route::post('logout', DeleteTokenAction::class);

    Route::get('admin', ReadAdminAction::class);

    Route::get('mahasiswa', ReadAllMahasiswaAction::class);
    Route::post('mahasiswa', AddMahasiswaAction::class);
    Route::put('mahasiswa', UpdateMahasistaAction::class);
    Route::delete('mahasiswa', DeleteMahasiswaAction::class);
    Route::get('mahasiswa/{id}', ReadMahasiswaAction::class);
    Route::put('mahasiswa/password', ChangePasswordMahasiswaAction::class);
    Route::post('mahasiswa/foto-profile', AddFotoProfileMahasiswaAction::class);
    Route::put('mahasiswa/{id}', UpdateMahasistaAction::class);
    Route::get('mahasiswa/{id}/history', ReadMahasiswaHistoryAction::class);
});

Route::post('mahasiswa/login', MahasiswaAuthenticationAction::class);
Route::post('admin/login', AdminAutheticationAction::class);

Route::post('mahasiswa/register', ResgisterMahasiswaAction::class);
