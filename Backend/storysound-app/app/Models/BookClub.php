<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookClub extends Model
{
    use HasFactory,HasUuids;
    // Specify the table
    protected $table = 'book_clubs';

    // Primary key
    protected $primaryKey = 'club_id';

    // UUID for primary key
    protected $keyType = 'string';
    public $incrementing = false;

    // Allow mass assignment
    protected $fillable = ['club_id', 'club_name', 'creator_user_id', 'description', 'created_date'];

    // Cast attributes
    protected $casts = [
        'created_date' => 'datetime',
    ];

    // Relationships

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_user_id');
    }

    public function members()
    {
        return $this->hasMany(Book_club_members::class, 'club_id');
    }
}
