<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Mahasiswa;
use App\Models\history_mahasiswa;

class HistoryMahasiswaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = HistoryMahasiswa::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'aksi' => $this->faker->word(),
            'mahasiswa_id' => Mahasiswa::factory(),
        ];
    }
}
