<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_logout_user(): void
    {

        $headers = [
            'Authorization' => 'Bearer 44|i40L8OmO3SJLhRrifFYVkhCe6Y8aY8dLBJ4oyDsyd12a7bb3',
            'Accept' => 'application/json',
        ];

        $response = $this->postJson('/api/logout', [], $headers);

        dump($response->json());

        $response->assertStatus(200);
    }
}
