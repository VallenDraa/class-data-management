<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Alamat;
use App\Models\Users;
use App\Models\mahasiswa;

class MahasiswaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Mahasiswa::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'foto_profile' => $this->faker->word(),
            'nim' => $this->faker->word(),
            'tanggal_lahir' => $this->faker->dateTime(),
            'no_telepon' => $this->faker->word(),
            'list_kesukaan' => '{}',
            'alamat_id' => Alamat::factory(),
            'users_id' => Users::factory(),
        ];
    }
}
