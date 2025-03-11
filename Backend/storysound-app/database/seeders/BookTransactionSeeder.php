<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookTransactionSeeder extends Seeder
{
    public function run()
    {
        DB::table('book_transactions')->insert([
            [
                'book_id' => 'uuid-1', // Replace with actual UUID
                'buyer_id' => 1, // Replace with actual user ID
                'seller_id' => 2, // Replace with actual user ID
                'price' => 19.99,
                'status' => 'pending',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'book_id' => 'uuid-2',
                'buyer_id' => 2,
                'seller_id' => 3,
                'price' => 25.50,
                'status' => 'completed',
                'transaction_date' => now()->subDays(2),
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(1),
            ],
            [
                'book_id' => 'uuid-3',
                'buyer_id' => 3,
                'seller_id' => 4,
                'price' => 10.75,
                'status' => 'cancelled',
                'transaction_date' => now()->subDays(5),
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(4),
            ],
            [
                'book_id' => 'uuid-4',
                'buyer_id' => 4,
                'seller_id' => 1,
                'price' => 30.00,
                'status' => 'pending',
                'transaction_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'book_id' => 'uuid-5',
                'buyer_id' => 5,
                'seller_id' => 2,
                'price' => 12.99,
                'status' => 'completed',
                'transaction_date' => now()->subDays(3),
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(2),
            ],
        ]);
    }
}
