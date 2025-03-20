<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->foreignUuid('book_id')->constrained('books', 'book_id')->onDelete('cascade');
            $table->foreignID('buyer_id')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignID('seller_id')->constrained('users', 'id')->onDelete('cascade');
            $table->decimal('price', 8, 2);
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamp('transaction_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_transactions');
    }
};
