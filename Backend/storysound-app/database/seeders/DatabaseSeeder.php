<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            BooksTableSeeder::class,  // First, seed the genres table
            BookClubsTableSeeder::class,   // Then, seed the books table
            BookClubMembersTableSeeder::class,
            BookTransactionsTableSeeder::class,
            BookWishlistTableSeeder::class,
            CommentsTableSeeder::class,
            GenresTableSeeder::class,
            PostsTableSeeder::class,
            ReactionsTableSeeder::class
        ]);

    }
}
