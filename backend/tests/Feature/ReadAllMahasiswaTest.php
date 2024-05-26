<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory as Faker;

class ReadAllMahasiswaTest extends TestCase
{
    public function test_mahasiswa_all_data(): void
    {
        $faker = Faker::create();

        $headers = [
            'Authorization' => 'Bearer ' . $this->getAuthToken(),
            'Accept' => 'application/json',
        ];

        /**
         * Parameter yang bisa digunakan
         *
         * page=1&length=2
         * page=1&length=3&sort=terbaru
         * page=1&length=3&sort=terbaru&search=Cortney
         * page=1&length=2&search=a
         * page=1&length=2&search=a&sort=az
         */
        $response = $this->get('/api/mahasiswa?page=1&length=3&sort=az', $headers);

        dump($response->json());

        $response->assertStatus(200);
    }

    public function getAuthToken(): string
    {
        // $response = $this->postJson('/api/admin/login', [
        //     'email' => 'oskhar@gmail.com',
        //     'password' => '123456'
        // ]);

        $response = $this->postJson('/api/mahasiswa/login', [
            'nim' => '248294',
            'password' => '248294'
        ]);

        dump($response->json());

        $response->assertStatus(200);

        $data = $response->json();

        return $data['success']['token'];
    }
}
