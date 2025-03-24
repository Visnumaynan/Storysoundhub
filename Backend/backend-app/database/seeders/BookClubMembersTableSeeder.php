<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Str;
use Carbon\Carbon;

class BookClubMembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('book_club_members')->insert([
            [
                'membership_id' => 1,
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'join_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => 2,
                'club_id' => DB::table('book_clubs')->where('club_name', 'Fantasy Readers')->value('club_id'),
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'join_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => 3,
                'club_id' => DB::table('book_clubs')->where('club_name', 'Classic Literature Lovers')->value('club_id'),
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'join_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => 4,
                'club_id' => DB::table('book_clubs')->where('club_name', 'Mystery Solvers')->value('club_id'),
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'join_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => 5,
                'club_id' => DB::table('book_clubs')->where('club_name', 'Philosophy & Thought')->value('club_id'),
                'clerk_id' => 'user_2uL5pjtDzptiqhdz2ZxZNEA1SDH',
                'join_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
