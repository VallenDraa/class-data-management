<?php

namespace Domain\Costumer\Models;

use Domain\Product\Models\Products;
use Domain\Shared\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carts extends BaseModel
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quantity',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];

    public function costumers(): HasMany
    {
        return $this->hasMany(Costumer::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Products::class);
    }
}
