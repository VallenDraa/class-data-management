<?php

namespace Database\Seeders;

use Domain\Admin\Models\Admin;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Domain\Shared\Models\User;
use Domain\Mahasiswa\Models\Alamat;
use Domain\Mahasiswa\Models\Mahasiswa;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /**
         * Inisiasi faker
         */
        $faker = Faker::create();

        // $user = User::create([
        //     'nama' => $faker->name,
        //     'password' => Hash::make('123456'),
        //     'role' => 'Mahasiswa'
        // ]);

        // $alamat = Alamat::create([
        //     'alamat' => $faker->address,
        // ]);

        // Mahasiswa::create([
        //     'nim' => $faker->numerify('19241010####'),
        //     'user_id' => $user->id,
        //     'alamat_id' => $alamat->id
        // ]);

        $user = User::create([
            'nama' => $faker->name,
            'password' => Hash::make('123456'),
            'role' => 'Mahasiswa'
        ]);

        Admin::create([
            'email' => 'oskhar@gmail.com',
            'user_id' => $user->id
        ]);
    }
}
