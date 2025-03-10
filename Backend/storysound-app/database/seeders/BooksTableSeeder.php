<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Str;
use Carbon\Carbon;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('books')->insert([
            [
                'book_id' => Str::uuid(),
                'title' => 'Dune',
                'isbn' => '9780441013593',
                'author' => 'Frank Herbert',
                'type' => 'Paperback',
                'picture' => 'https://via.placeholder.com/150?text=No+Image',
                'genre_id' => DB::table('genres')->where('name', 'Science Fiction')->value('genre_id'),
                'price' => 19.99,
                'short_description' => 'A science fiction masterpiece.',
                'owner_id' => 1,
                'condition' => 'New',
                'quantity' => 5,
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'book_id' => Str::uuid(),
                'title' => '1984',
                'isbn' => '9780451524935',
                'author' => 'George Orwell',
                'type' => 'Hardcover',
                'picture' => 'https://via.placeholder.com/150?text=No+Image',
                'genre_id' => DB::table('genres')->where('name', 'Fantasy')->value('genre_id'),
                'price' => 14.99,
                'short_description' => 'A dystopian novel about a totalitarian regime.',
                'owner_id' =>1,
                'condition' => 'Used - Good',
                'quantity' => 3,
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'book_id' => Str::uuid(),
                'title' => 'To Kill a Mockingbird',
                'isbn' => '9780061120084',
                'author' => 'Harper Lee',
                'type' => 'Paperback',
                'picture' => 'https://via.placeholder.com/150?text=No+Image',
                'genre_id' => DB::table('genres')->where('name', 'Fantasy')->value('genre_id'),
                'price' => 12.99,
                'short_description' => 'A novel of racial injustice and moral growth.',
                'owner_id' => 2,
                'condition' => 'Like New',
                'quantity' => 4,
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'book_id' => Str::uuid(),
                'title' => 'The Hobbit',
                'isbn' => '9780345339683',
                'author' => 'J.R.R. Tolkien',
                'type' => 'Hardcover',
                'picture' => 'https://via.placeholder.com/150?text=No+Image',
                'genre_id' => DB::table('genres')->where('name', 'Fantasy')->value('genre_id'),
                'price' => 18.50,
                'short_description' => 'The adventure of Bilbo Baggins.',
                'owner_id' =>1,
                'condition' => 'New',
                'quantity' => 6,
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'book_id' => Str::uuid(),
                'title' => 'The Catcher in the Rye',
                'isbn' => '9780316769488',
                'author' => 'J.D. Salinger',
                'type' => 'Paperback',
                'picture' => 'https://via.placeholder.com/150?text=No+Image',
                'genre_id' => DB::table('genres')->where('name', 'Romance')->value('genre_id'),
                'price' => 10.99,
                'short_description' => 'A classic novel of teenage angst.',
                'owner_id' =>1,
                'condition' => 'Used - Acceptable',
                'quantity' => 2,
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
