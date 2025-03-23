<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genres extends Model
{
    use HasFactory, HasUuids;

    // Specify the table
    protected $table = 'genres';

    // Primary key
    protected $primaryKey = 'genre_id';

    // UUID for primary key
    protected $keyType = 'string';
    public $incrementing = false;

    // Allow mass assignment
    protected $fillable = ['genre_id', 'name'];

    // Relationships
    public function books()
    {
        return $this->hasMany(book::class, 'genre_id');
    }
}
