<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {
        Schema::create('book_wishlist', function (Blueprint $table) {
            $table->id('wishlist_id');
            $table->foreignID('user_id')->constrained('users', 'id');
            $table->foreignuuid('book_id')->constrained('books', 'book_id');
            $table->string('picture');
            $table->timestamp('wishlist_date')->useCurrent();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_wishlist');
    }
};
