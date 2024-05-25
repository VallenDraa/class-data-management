<?php

namespace Domain\Shared\Models;

use Domain\Mahasiswa\Models\Mahasiswa;
use Domain\Shared\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends BaseModel
{
    use SoftDeletes, HasApiTokens, Notifiable;

    protected $casts = [];

    public function mahasiswa(): HasOne
    {
        return $this->hasOne(Mahasiswa::class);
    }
}
