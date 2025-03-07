<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeding Genres Table
        DB::table('genres')->insert([
            ['genre_id' => Str::uuid(), 'name' => 'Science Fiction', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['genre_id' => Str::uuid(), 'name' => 'Fantasy', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
