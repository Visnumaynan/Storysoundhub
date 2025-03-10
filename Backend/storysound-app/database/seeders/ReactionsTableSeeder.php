<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reactions')->insert([
            [
                'post_id' => DB::table('posts')->value('post_id'), // Fetch post_id dynamically
                'membership_id' => DB::table('book_club_members')->value('membership_id'), // Fetch membership_id dynamically
                'type' => 'like', // Example reaction type
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'type' => 'like', // Another reaction type example
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'type' => 'like', // Another reaction type example
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'type' => 'like',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'post_id' => DB::table('posts')->value('post_id'),
                'membership_id' => DB::table('book_club_members')->value('membership_id'),
                'type' => 'like',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
