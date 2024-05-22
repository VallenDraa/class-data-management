<?php

use Domain\Cashier\Models\Cashiers;
use Domain\Order\Models\Orders;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_confirmations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Cashiers::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Orders::class)->constrained()->cascadeOnDelete();
            $table->timestamp('confirmation_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_confirmations');
    }
};
