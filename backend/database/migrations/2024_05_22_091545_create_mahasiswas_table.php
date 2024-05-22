<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Domain\Mahasiswa\Models\Alamat;
use Domain\Shared\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mahasiswas', function (Blueprint $table) {
            $table->id();
            $table->string('foto_profile')->nullable();
            $table->string('nim');
            $table->timestamp('tanggal_lahir')->nullable();
            $table->string('no_telepon')->nullable();
            $table->json('list_kesukaan')->nullable();
            $table->foreignIdFor(Alamat::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswas');
    }
};
