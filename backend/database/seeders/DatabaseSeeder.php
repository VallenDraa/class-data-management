<?php

namespace Database\Seeders;

use Domain\Admin\Models\Admin;
use Domain\Mahasiswa\Models\Alamat;
use Domain\Mahasiswa\Models\Mahasiswa;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Domain\Shared\Models\User;
use Illuminate\Support\Facades\DB;
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
        for( $i = 0; $i < 100; $i++ ) {
            $this->createMahasiswa();
        }
        $this->createHistory();

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
            'nim' => $nim ?? $faker->numerify('#######'),
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
    public function createHistory(): void
    {
        $faker = Faker::create();
        $actions = [
            'Mengubah foto profile',
            'Mengubah password',
            'Login ke aplikasi',
            'Melihat seluruh data mahasiswa yang tersedia',
            'Melihat data pribadi',
            'Mengubah data pribadi',
            'Logout dari aplikasi'
        ];

        $records = [];
        for ($i = 1; $i <= 100; $i++) {
            $numberOfActivities = $faker->numberBetween(1, 20); // Jumlah kegiatan untuk setiap mahasiswa

            for ($j = 0; $j < $numberOfActivities; $j++) {
                $randomDate = $faker->dateTimeBetween('-1 year', 'now'); // Tanggal acak dalam rentang 1 tahun terakhir

                $records[] = [
                    'aksi' => $faker->randomElement($actions),
                    'mahasiswa_id' => $i,
                    'created_at' => $randomDate,
                    'updated_at' => $randomDate,
                ];
            }
        }

        // Insert data in batches
        $chunkedRecords = array_chunk($records, 500); // Menghindari masalah memori dengan membagi data menjadi bagian-bagian
        foreach ($chunkedRecords as $chunk) {
            DB::table('history_mahasiswas')->insert($chunk);
        }
    }
}
