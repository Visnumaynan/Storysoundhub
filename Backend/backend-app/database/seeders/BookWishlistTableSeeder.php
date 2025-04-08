<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Str;
use Carbon\Carbon;

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
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'book_id' => DB::table('books')->where('title', 'Dune')->value('book_id'),
                'picture' => 'placeholder.jpg', // Placeholder image
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 2,
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'book_id' => DB::table('books')->where('title', '1984')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 3,
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'book_id' => DB::table('books')->where('title', 'To Kill a Mockingbird')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 4,
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'book_id' => DB::table('books')->where('title', 'The Hobbit')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'wishlist_id' => 5,
                'clerk_id' =>'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'book_id' => DB::table('books')->where('title', 'The Catcher in the Rye')->value('book_id'),
                'picture' => 'placeholder.jpg',
                'wishlist_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
