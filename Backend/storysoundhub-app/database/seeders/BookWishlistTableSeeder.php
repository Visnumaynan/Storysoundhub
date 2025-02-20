<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookWishlistTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('book_wishlist')->insert([
            [
                'wishlist_id' => 1,
                'user_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'book_id' => DB::table('books')->where('title', 'Dune')->value('book_id'),
                'picture' => 'dune.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
