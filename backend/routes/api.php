<?php

use Domain\Costumer\Actions\AddCostumerAction;
use Domain\Costumer\Actions\UpdateCostumerAction;
use Domain\Shared\Actions\DeleteTokenAction;
use Domain\Mahasiswa\Actions\MahasiswaAuthenticationAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function ($router) {
    Route::post('logout', DeleteTokenAction::class);
    Route::put('costumer', UpdateCostumerAction::class);
});

Route::post('costumer', AddCostumerAction::class);
Route::post('mahasiswa/login', MahasiswaAuthenticationAction::class);
