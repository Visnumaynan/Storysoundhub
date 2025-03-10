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
        Schema::create('posts', function (Blueprint $table) {
            $table->id('post_id')-> primary();
            $table->foreignid('membership_id')->constrained('book_club_members', 'membership_id')->onDelete('cascade');
            $table->foreignuuid('club_id')->nullable()->constrained('book_clubs', 'club_id')->onDelete('cascade');
            $table->text('content');
            $table->string('media')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
