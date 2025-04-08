<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Str;
use Carbon\Carbon;

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
                'buyer_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH', // Buyer is different
                'seller_clerk_id' =>'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'price' => 19.99,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 2,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'seller_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'price' => 15.50,
                'status' => 'pending',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 3,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'seller_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'price' => 12.75,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 4,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_clerk_id' =>'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'seller_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'price' => 22.00,
                'status' => 'pending',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'transaction_id' => 5,
                'book_id' => DB::table('books')->value('book_id'),
                'buyer_clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'seller_clerk_id' =>'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'price' => 18.90,
                'status' => 'completed',
                'transaction_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
