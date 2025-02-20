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
                'buyer_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'seller_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'price' => 19.99,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
