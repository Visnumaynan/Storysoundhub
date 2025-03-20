<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            [
                'post_id' => 1,
                'membership_id' => 1,
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'content' => 'Excited for our next book discussion!',
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'membership_id' => DB::table('book_club_members')->value('membership_id'), // Fetch membership_id dynamically
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'content' => 'Excited for our next book discussion!',
                'media' => null, // Placeholder for media if needed
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => DB::table('book_club_members')->value('membership_id'), // Fetch another membership_id dynamically
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'content' => 'What are your thoughts on the last chapter?',
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'content' => 'I love the themes explored in this book!',
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'content' => 'Has anyone read the author’s previous work?',
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'club_id' => DB::table('book_clubs')->where('club_name', 'Sci-Fi Enthusiasts')->value('club_id'),
                'content' => 'Looking forward to next week’s meeting!',
                'media' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
