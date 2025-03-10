<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            ],[
                'club_id' => Str::uuid(),
                'club_name' => 'Sci-Fi Enthusiasts',
                'creator_user_id' => DB::table('users')->where('username', 'john_doe')->value('id'),
                'description' => 'A club for sci-fi book lovers.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Fantasy Readers',
                'creator_user_id' => DB::table('users')->where('username', 'jane_doe')->value('id'),
                'description' => 'A club for fans of fantasy literature.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Classic Literature Lovers',
                'creator_user_id' => DB::table('users')->where('username', 'alice_smith')->value('id'),
                'description' => 'A club dedicated to classic books.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Mystery Solvers',
                'creator_user_id' => DB::table('users')->where('username', 'bob_jones')->value('id'),
                'description' => 'For those who love thrilling mystery novels.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'club_id' => Str::uuid(),
                'club_name' => 'Philosophy & Thought',
                'creator_user_id' => DB::table('users')->where('username', 'charlie_brown')->value('id'),
                'description' => 'A place for discussing philosophical books.',
                'created_date' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

        ]);
    }
}
