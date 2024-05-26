<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ChangePasswordMahasiswaTest extends TestCase
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

        $response = $this->putJson('/api/mahasiswa/password', [
            'recent_password' => '12345678',
            'new_password' => '12345678',
            'confirm_password' => '12345678'
        ], $headers);

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
            'password' => '12345678'
        ]);

        dump($response->json());

        $response->assertStatus(200);

        $data = $response->json();

        return $data['success']['token'];
    }
}
