<?php

namespace Domain\Costumer\Models;

use Domain\Shared\Models\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Costumer extends BaseModel
{
    use SoftDeletes;

    protected $casts = [];

    public function belongsTo($related, $foreignKey = null, $ownerKey = null, $relation = null)
    {

    }
}
