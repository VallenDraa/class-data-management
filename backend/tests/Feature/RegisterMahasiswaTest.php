<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory as Faker;

class RegisterMahasiswaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $faker = Faker::create();

        $headers = [
            'Accept' => 'application/json',
        ];

        $response = $this->postJson('/api/mahasiswa/register', [
            'nim' => $faker->numerify("######"),
            'nama' => $faker->name(),
            'tanggal_lahir' => $faker->date(),
            'alamat' => $faker->address(),
        ], $headers);

        dump($response->json());

        $response->assertStatus(201);
    }
}
