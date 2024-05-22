<?php

namespace Database\Factories;

use Domain\Owner\Models\Owners;
use Domain\Shared\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OwnersFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Owners::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'visibility_state' => $this->faker->regexify('[A-Za-z0-9]{255}'),
            'social_media' => $this->faker->regexify('[A-Za-z0-9]{255}'),
            'bio' => $this->faker->text(),
            'users_id' => User::factory(),
        ];
    }
}
