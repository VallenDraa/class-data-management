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
            'Authorization' => 'Bearer 4|3LRk6HtqYp6cSgsp24RwSkIc7QaPKqyCz1ctUzoZf59b1829',
            'Accept' => 'application/json',
        ];

        $response = $this->postJson('/api/logout', [], $headers);

        dump($response->json());

        $response->assertStatus(200);
    }
}
