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
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_id' => 2, // Buyer is different
                'seller_id' =>1,
                'price' => 19.99,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 2,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_id' => 2,
                'seller_id' => 1,
                'price' => 15.50,
                'status' => 'pending',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 3,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_id' => 2,
                'seller_id' => 1,
                'price' => 12.75,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 4,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_id' =>2,
                'seller_id' => 1,
                'price' => 22.00,
                'status' => 'shipped',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 5,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_id' => 2,
                'seller_id' =>1,
                'price' => 18.90,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
