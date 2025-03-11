<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Genres;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            ['genre_id' => Str::uuid(), 'name' => 'Fiction'],
            ['genre_id' => Str::uuid(), 'name' => 'Dystopian'],
            ['genre_id' => Str::uuid(), 'name' => 'Classic'],
            ['genre_id' => Str::uuid(), 'name' => 'Romance'],
            ['genre_id' => Str::uuid(), 'name' => 'Science Fiction'],
        ];

        foreach ($genres as $genre) {
            Genres::create($genre);
        }
    }
}
