<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert([
            [
                'comment_id' => 1,
                'post_id' => DB::table('posts')->value('post_id'), // Get any post ID
                'membership_id' => DB::table('book_club_members')->value('membership_id'), // Get any membership ID
                'content' => 'Looking forward to it!',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'comment_id' => 2,
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'content' => 'Great discussion topic!',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'comment_id' => 3,
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'content' => 'I totally agree with this!',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'comment_id' => 4,
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'content' => 'Has anyone read the latest book in this series?',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'comment_id' => 5,
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'content' => 'I learned a lot from this post!',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
