<?php

namespace Database\Factories;

use Domain\Cashier\Models\Cashiers;
use Domain\Shared\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CashiersFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Cashiers::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->userName(),
            'visibility_state' => $this->faker->regexify('[A-Za-z0-9]{255}'),
            'social_media' => $this->faker->regexify('[A-Za-z0-9]{255}'),
            'bio' => $this->faker->text(),
            'users_id' => User::factory(),
        ];
    }
}
