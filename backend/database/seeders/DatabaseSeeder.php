<?php

namespace Database\Seeders;

use Domain\Product\Models\Products;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Products::factory(10)->create();
    }
}
