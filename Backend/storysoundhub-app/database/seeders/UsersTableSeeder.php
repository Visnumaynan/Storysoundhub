<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeding Users Table
        DB::table('users')->insert([
            [
                'id' => Str::uuid(),
                'username' => 'john_doe',
                'email' => 'john@example.com',
                'password_hash' => bcrypt('password123'),
                'profile_picture' => null,
                'phone' => +1234567890,
                'location' => 'New York',
                'date_joined' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
