<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;  // <-- Add this line
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            // List all your seeders here
            UsersTableSeeder::class,
            GenresTableSeeder::class,
            BooksTableSeeder::class,
            BookClubsTableSeeder::class,
            BookClubMembersTableSeeder::class,
            PostsTableSeeder::class,
            BookTransactionsTableSeeder::class,
            BookWishlistTableSeeder::class,
            CommentsTableSeeder::class,

        ]);
    }
}
