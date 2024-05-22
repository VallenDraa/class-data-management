<?php

namespace Domain\Mahasiswa\Models;

use Domain\Shared\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mahasiswa extends BaseModel
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'foto_profile',
        'nim',
        'tanggal_lahir',
        'no_telepon',
        'list_kesukaan',
        'alamat_id',
        'users_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'tanggal_lahir' => 'timestamp',
        'list_kesukaan' => 'array',
        'alamat_id' => 'integer',
        'users_id' => 'integer',
    ];

    public function alamat(): BelongsTo
    {
        return $this->belongsTo(Alamat::class);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(Users::class);
    }
}
