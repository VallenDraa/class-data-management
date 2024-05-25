<?php

use Domain\Admin\Actions\AdminAutheticationAction;
use Domain\Costumer\Actions\AddCostumerAction;
use Domain\Mahasiswa\Actions\AddMahasiswaAction;
use Domain\Shared\Actions\DeleteTokenAction;
use Domain\Mahasiswa\Actions\MahasiswaAuthenticationAction;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function ($router) {
    Route::post('logout', DeleteTokenAction::class);
    Route::post('mahasiswa', AddMahasiswaAction::class);
});

Route::post('costumer', AddCostumerAction::class);
Route::post('mahasiswa/login', MahasiswaAuthenticationAction::class);
Route::post('admin/login', AdminAutheticationAction::class);
