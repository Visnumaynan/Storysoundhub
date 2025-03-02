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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')-> primary();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('password_hash');
            $table->string('profile_picture')->nullable();
            $table->string('phone');
            $table->string('location')->nullable();
            $table->timestamp('date_joined')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
