<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookTransactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('book_transactions')->insert([
            [
                'transaction_id' => 1,
                'book_id' => DB::table('books')->where('title', 'Dune')->value('book_id'),
                'buyer_id' => DB::table('users')->where('username', 'jane_doe')->value('id'), // Buyer is different
                'seller_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'price' => 19.99,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 2,
                'book_id' => DB::table('books')->where('title', '1984')->value('book_id'),
                'buyer_id' => DB::table('users')->where('username', 'alice_smith')->value('id'),
                'seller_id' => DB::table('users')->where('username', 'jane_doe')->value('id'),
                'price' => 15.50,
                'status' => 'pending',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 3,
                'book_id' => DB::table('books')->where('title', 'To Kill a Mockingbird')->value('book_id'),
                'buyer_id' => DB::table('users')->where('username', 'bob_jones')->value('id'),
                'seller_id' => DB::table('users')->where('username', 'alice_smith')->value('id'),
                'price' => 12.75,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 4,
                'book_id' => DB::table('books')->where('title', 'The Hobbit')->value('book_id'),
                'buyer_id' => DB::table('users')->where('username', 'charlie_brown')->value('id'),
                'seller_id' => DB::table('users')->where('username', 'bob_jones')->value('id'),
                'price' => 22.00,
                'status' => 'shipped',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 5,
                'book_id' => DB::table('books')->where('title', 'Brave New World')->value('book_id'),
                'buyer_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'seller_id' => DB::table('users')->where('username', 'charlie_brown')->value('id'),
                'price' => 18.90,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
