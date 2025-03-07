<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
                'picture' => 'dune.jpg',
                'genre_id' => DB::table('genres')->where('name', 'Science Fiction')->value('genre_id'),
                'price' => 19.99,
                'short_description' => 'A science fiction masterpiece.',
                'owner_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'condition' => 'New',
                'quantity' => 5,
                'upload_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
