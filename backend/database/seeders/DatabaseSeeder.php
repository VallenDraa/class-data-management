<?php

namespace Database\Seeders;

use Domain\Admin\Models\Admin;
use Domain\Mahasiswa\Models\Alamat;
use Domain\Mahasiswa\Models\Mahasiswa;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Domain\Shared\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->createAdmin();
        $this->createMahasiswa('12345678');
        for( $i = 0; $i < 20; $i++ ) {
            $this->createMahasiswa();
        }

    }
    public function createMahasiswa(string $nim = null): void
    {
        $faker = Faker::create();

        $user = User::create([
            'nama' => $faker->name,
            'password' => Hash::make($nim ?? $faker->name),
            'role' => 'Mahasiswa'
        ]);

        $alamat = Alamat::create([
            'alamat' => $faker->address,
        ]);

        Mahasiswa::create([
            'nim' => $nim ?? $faker->numerify('19241010####'),
            'user_id' => $user->id,
            'alamat_id' => $alamat->id
        ]);
    }
    public function createAdmin(): void
    {
        $faker = Faker::create();

        $user = User::create([
            'nama' => $faker->name,
            'password' => Hash::make('12345678'),
            'role' => 'Admin'
        ]);

        Admin::create([
            'email' => 'oskhar@gmail.com',
            'user_id' => $user->id
        ]);

        $faker = Faker::create();

        $user = User::create([
            'nama' => $faker->name,
            'password' => Hash::make('12345678'),
            'role' => 'Admin'
        ]);

        Admin::create([
            'email' => 'vallen@gmail.com',
            'user_id' => $user->id
        ]);
    }
}
