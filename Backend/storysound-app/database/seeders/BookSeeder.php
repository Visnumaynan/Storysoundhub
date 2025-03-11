<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run()
    {
        $books = [
            [
                'book_id' => Str::uuid(),
                'title' => 'The Great Gatsby',
                'isbn' => '9780743273565',
                'author' => 'F. Scott Fitzgerald',
                'type' => 'Fiction',
                'picture' => 'https://example.com/gatsby.jpg',
                'genre_id' => DB::table('genres')->value('genre_id'),
                'price' => 10.99,
                'short_description' => 'A novel set in the Roaring Twenties.',
                'owner_id' => 1,
                'condition' => 'New',
                'quantity' => 5,
            ],
            [
                'book_id' => Str::uuid(),
                'title' => '1984',
                'isbn' => '9780451524935',
                'author' => 'George Orwell',
                'type' => 'Dystopian',
                'picture' => 'https://example.com/1984.jpg',
                'genre_id' => DB::table('genres')->value('genre_id'),
                'price' => 8.99,
                'short_description' => 'A dystopian novel about totalitarianism.',
                'owner_id' => 1,
                'condition' => 'Used - Good',
                'quantity' => 3,
            ],
            [
                'book_id' => Str::uuid(),
                'title' => 'To Kill a Mockingbird',
                'isbn' => '9780061120084',
                'author' => 'Harper Lee',
                'type' => 'Classic',
                'picture' => 'https://example.com/mockingbird.jpg',
                'genre_id' => DB::table('genres')->value('genre_id'),
                'price' => 12.50,
                'short_description' => 'A story of racial injustice in the Deep South.',
                'owner_id' => 1,
                'condition' => 'New',
                'quantity' => 10,
            ],
            [
                'book_id' => Str::uuid(),
                'title' => 'The Catcher in the Rye',
                'isbn' => '9780316769488',
                'author' => 'J.D. Salinger',
                'type' => 'Classic',
                'picture' => 'https://example.com/catcher.jpg',
                'genre_id' => DB::table('genres')->value('genre_id'),
                'price' => 9.75,
                'short_description' => 'A coming-of-age novel about teenage rebellion.',
                'owner_id' => 1,
                'condition' => 'Used - Like New',
                'quantity' => 2,
            ],
            [
                'book_id' => Str::uuid(),
                'title' => 'Pride and Prejudice',
                'isbn' => '9780141040349',
                'author' => 'Jane Austen',
                'type' => 'Romance',
                'picture' => 'https://example.com/pride.jpg',
                'genre_id' => DB::table('genres')->value('genre_id'),
                'price' => 7.99,
                'short_description' => 'A classic romantic novel about love and society.',
                'owner_id' => 1,
                'condition' => 'New',
                'quantity' => 6,
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
