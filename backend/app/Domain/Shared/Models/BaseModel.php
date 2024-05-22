<?php

namespace Domain\Shared\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lunarstorm\LaravelDDD\Factories\DomainFactory;

abstract class BaseModel extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function newFactory()
    {
        return DomainFactory::factoryForModel(get_called_class());
    }
}
