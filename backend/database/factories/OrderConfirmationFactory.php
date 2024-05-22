<?php

namespace Database\Factories;

use Domain\Order\Models\OrderConfirmation;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderConfirmationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OrderConfirmation::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'confirmation_at' => $this->faker->dateTime(),
        ];
    }
}
