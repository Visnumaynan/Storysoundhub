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
                'picture' => 'placeholder.jpg', // Placeholder image
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 2,
                'user_id' => DB::table('users')->where('username', 'jane_doe')->value('id'),
                'book_id' => DB::table('books')->where('title', '1984')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 3,
                'user_id' => DB::table('users')->where('username', 'alice_smith')->value('id'),
                'book_id' => DB::table('books')->where('title', 'To Kill a Mockingbird')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 4,
                'user_id' => DB::table('users')->where('username', 'bob_jones')->value('id'),
                'book_id' => DB::table('books')->where('title', 'The Hobbit')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 5,
                'user_id' => DB::table('users')->where('username', 'charlie_brown')->value('id'),
                'book_id' => DB::table('books')->where('title', 'Brave New World')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
