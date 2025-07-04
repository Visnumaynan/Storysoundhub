<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Book extends Model
{
    use HasFactory, HasUuids,SoftDeletes;

    // Specify the table
    protected $table = 'books';

    // Primary key
    protected $primaryKey = 'book_id';

    // UUID for primary key
    protected $keyType = 'string';
    public $incrementing = false;

    // Allow mass assignment
    protected $fillable = ['title', 'isbn', 'author', 'type', 'picture', 'genre_id', 'price', 'short_description', 'owner_id', 'condition', 'quantity', 'upload_date'];

    // Cast attributes
    protected $casts = [
        'upload_date' => 'datetime',
        'price' => 'decimal:2',
    ];

    // Relationships

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
