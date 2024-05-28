<?php

namespace Tests\Feature;

use Tests\TestCase;

class ReadMahasiswaTest extends TestCase
{
    public function test_mahasiswa_self_data(): void
    {

        $headers = [
            'Authorization' => 'Bearer ' . $this->getAuthToken(),
            'Accept' => 'application/json',
        ];

        $response = $this->get('/api/mahasiswa/self', $headers);

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
            'nim' => '12345678',
            'password' => '12345678'
        ]);

        dump($response->json());

        $response->assertStatus(200);

        $data = $response->json();

        return $data['success']['token'];
    }
}
