<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Str;
use Carbon\Carbon;

class BookClubsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('book_clubs')->insert([
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Sci-Fi Enthusiasts',
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'description' => 'A club for sci-fi book lovers.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'club_id' => Str::uuid(),
                'club_name' => 'Sci-Fi Enthusiasts',
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'description' => 'A club for sci-fi book lovers.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Fantasy Readers',
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'description' => 'A club for fans of fantasy literature.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Classic Literature Lovers',
                'clerk_id' =>'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'description' => 'A club dedicated to classic books.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Mystery Solvers',
                'clerk_id' =>'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'description' => 'For those who love thrilling mystery novels.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Philosophy & Thought',
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'description' => 'A place for discussing philosophical books.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

        ]);
    }
}
