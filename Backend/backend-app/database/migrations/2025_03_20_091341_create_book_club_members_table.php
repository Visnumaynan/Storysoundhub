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
        Schema::create('book_club_members', function (Blueprint $table) {
            $table->id('membership_id');
            $table->foreignuuid('club_id')->constrained('book_clubs', 'club_id');
            $table->string('clerk_id');
            $table->timestamp('join_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_club_members_');
    }
};
