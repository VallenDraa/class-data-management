<?php

use Domain\Admin\Actions\AdminAutheticationAction;
use Domain\Costumer\Actions\AddCostumerAction;
use Domain\Mahasiswa\Actions\AddMahasiswaAction;
use Domain\Shared\Actions\DeleteTokenAction;
use Domain\Mahasiswa\Actions\MahasiswaAuthenticationAction;
use Domain\Mahasiswa\Actions\ReadAllMahasiswaAction;
use Domain\Mahasiswa\Actions\UpdateMahasistaAction;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function ($router) {
    Route::post('logout', DeleteTokenAction::class);
    Route::get('mahasiswa', ReadAllMahasiswaAction::class);
    Route::post('mahasiswa', AddMahasiswaAction::class);
    Route::put('mahasiswa', UpdateMahasistaAction::class);
    Route::put('mahasiswa/{id}', UpdateMahasistaAction::class);
});

Route::post('costumer', AddCostumerAction::class);
Route::post('mahasiswa/login', MahasiswaAuthenticationAction::class);
Route::post('admin/login', AdminAutheticationAction::class);
