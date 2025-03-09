<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

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
                'creator_user_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'description' => 'A club for sci-fi book lovers.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
