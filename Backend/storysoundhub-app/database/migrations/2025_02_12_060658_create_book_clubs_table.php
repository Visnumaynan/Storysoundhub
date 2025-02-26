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
        Schema::create('book_clubs', function (Blueprint $table) {
            $table->uuid('club_id')-> primary();
            $table->string('club_name');
            $table->foreignuuid('creator_user_id')->constrained('users', 'id');
            $table->text('description');
            $table->timestamp('created_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_clubs');
    }
};
