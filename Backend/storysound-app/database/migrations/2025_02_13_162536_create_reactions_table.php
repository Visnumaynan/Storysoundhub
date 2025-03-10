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
        Schema::create('reactions', function (Blueprint $table) {
            $table->id('reaction_id');
            $table->foreignId('post_id')->nullable()->constrained('posts', 'post_id')->onDelete('cascade');
            $table->foreignId('comment_id')->nullable()->constrained('comments', 'comment_id')->onDelete('cascade');
            $table->foreignid('membership_id')->constrained('book_club_members', 'membership_id')->onDelete('cascade');
            $table->enum('type', ['like', 'dislike', 'love', 'haha', 'wow', 'sad', 'angry']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
