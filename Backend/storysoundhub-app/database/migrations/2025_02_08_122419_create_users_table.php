<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id')->primary();  // Auto-incrementing primary key
            $table->string('name'); // User's name
            $table->string('email')->unique(); // Unique email field
            $table->timestamp('email_verified_at')->nullable(); // Email verification
            $table->string('password'); // Hashed password
            $table->rememberToken(); // Token for "Remember Me" feature
            $table->timestamps(); // Created_at and updated_at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
