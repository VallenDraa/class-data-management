<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MahasiswaAuthenticationTest extends TestCase
{
    /**
     * Test creating a user.
     *
     * @return void
     */
    public function test_mahasiswa_authentication()
    {
        $response = $this->postJson('/api/mahasiswa/login', [
            'nim' => '248294',
            'password' => '12345678'
        ]);

        dump($response->json());

        $response->assertStatus(200);
    }
}
