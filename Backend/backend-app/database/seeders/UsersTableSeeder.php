<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        DB::table('users')->insert([
            'id' => 1,
            'name' => 'John Doe',
            'email' => 'john_doe@example.com',
            'email_verified_at' => Carbon::now(),
            'password' => bcrypt('password123'), // Hash the password
            'google_id' => null,
            'profile_photo' => null,
            'current_team_id' => null,
            'profile_photo_path' => null,
            'remember_token' => Str::random(10),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        // Insert second user with id = 2
        DB::table('users')->insert([
            'id' => 2,
            'name' => 'Jane Doe',
            'email' => 'jane_doe@example.com',
            'email_verified_at' => Carbon::now(),
            'password' => bcrypt('password456'), // Hash the password
            'google_id' => null,
            'profile_photo' => null,
            'current_team_id' => null,
            'profile_photo_path' => null,
            'remember_token' => Str::random(10),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}