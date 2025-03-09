<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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
                'user_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'join_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
