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
        Schema::create('books', function (Blueprint $table) {
            $table->uuid('book_id')-> primary();
            $table->string('title');
            $table->string('author');
            $table->string('genre');
            $table->enum('format', ['physical', 'eBook', 'audiobook']);
            $table->foreignuuid('owner_id')->constrained('users', 'id');
            $table->enum('availability_status', ['available', 'borrowed', 'swapped']);
            $table->timestamp('upload_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
