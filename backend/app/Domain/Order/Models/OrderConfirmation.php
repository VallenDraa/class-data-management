<?php

namespace Domain\Order\Models;

use Domain\Cashier\Models\Cashiers;
use Domain\Shared\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderConfirmation extends BaseModel
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'confirmation_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'confirmation_at' => 'timestamp',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Orders::class);
    }

    public function cashiers(): HasMany
    {
        return $this->hasMany(Cashiers::class);
    }
}
