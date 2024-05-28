<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteMahasiswaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $headers = [
            'Authorization' => 'Bearer ' . $this->getAuthToken(),
            'Accept' => 'application/json',
        ];

        $response = $this->deleteJson('/api/mahasiswa', [
            'id' => '12',
        ], $headers);

        dump($response->json());

        $response->assertStatus(200);
    }
    public function getAuthToken(): string
    {
        $response = $this->postJson('/api/admin/login', [
            'email' => 'oskhar@gmail.com',
            'password' => '12345678'
        ]);

        dump($response->json());

        $response->assertStatus(200);

        $data = $response->json();

        return $data['success']['token'];
    }
}
