<?php

namespace Database\Factories;

use Domain\Costumer\Models\Carts;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Carts::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'quantity' => $this->faker->numberBetween(-10000, 10000),
        ];
    }
}
