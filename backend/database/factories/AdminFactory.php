<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Alamat;
use App\Models\Users;
use App\Models\admin;

class AdminFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Admin::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'email' => $this->faker->safeEmail(),
            'jabatan' => $this->faker->word(),
            'alamat_id' => Alamat::factory(),
            'users_id' => Users::factory(),
        ];
    }
}
