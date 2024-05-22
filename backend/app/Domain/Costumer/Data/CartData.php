<?php

namespace Domain\Costumer\Data;

use Spatie\LaravelData\Data;

class CartData extends Data
{
    public function __construct(
        public readonly int $productId,
        public readonly int $quantity
    ) {
    }
}
