<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory as Faker;

class ReadMahasiswaTest extends TestCase
{
    public function test_mahasiswa_add_data(): void
    {
        $faker = Faker::create();

        $headers = [
            'Authorization' => 'Bearer ' . $this->getAuthToken(),
            'Accept' => 'application/json',
        ];

        $response = $this->get('/api/mahasiswa', $headers);

        dump($response->json());

        $response->assertStatus(200);
    }

    public function getAuthToken(): string
    {
        $response = $this->postJson('/api/admin/login', [
            'email' => 'oskhar@gmail.com',
            'password' => '123456'
        ]);

        // $response = $this->postJson('/api/mahasiswa/login', [
        //     'nim' => '1234567',
        //     'password' => '1234567'
        // ]);

        dump($response->json());

        $response->assertStatus(200);

        $data = $response->json();

        return $data['success']['token'];
    }
}
