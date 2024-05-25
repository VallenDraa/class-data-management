<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory as Faker;

class AddMahasiswaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_mahasiswa_add_data(): void
    {
        $faker = Faker::create();

        $headers = [
            'Authorization' => 'Bearer ' . $this->getAuthToken(),
            'Accept' => 'application/json',
        ];

        $response = $this->postJson('/api/mahasiswa', [
            'nim' => '1234567',
            'nama' => $faker->name(),
            'tanggal_lahir' => $faker->date(),
            'alamat' => $faker->address(),
        ], $headers);

        dump($response->json());

        $response->assertStatus(201);
    }

    public function getAuthToken(): string
    {
        $response = $this->postJson('/api/admin/login', [
            'email' => 'oskhar@gmail.com',
            'password' => '123456'
        ]);

        dump($response->json());

        $response->assertStatus(200);

        $data = $response->json();

        return $data['success']['token'];
    }
}
