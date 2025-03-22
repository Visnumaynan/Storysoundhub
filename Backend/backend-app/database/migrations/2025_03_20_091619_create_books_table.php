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
            $table->string('isbn')->nullable();
            $table->string('author');
            $table->string('type');
            $table->string('picture');
            $table->foreignuuid('genre_id')->constrained('genres', 'genre_id');
            $table->decimal('price', 8, 2);
            $table->text('short_description')->nullable();
            $table->string('clerk_id');
            $table->string('condition');
            $table->integer('quantity');
            $table->timestamp('upload_date')->useCurrent();
            $table->softDeletes();
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
