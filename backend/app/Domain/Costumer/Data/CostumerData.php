<?php

namespace Domain\Costumer\Data;

use Spatie\LaravelData\Data;

class CostumerData extends Data
{
    public function __construct(
        public readonly string $address,
        public readonly string $phone_number
    ) {
    }
}
