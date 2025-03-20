<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book_club_members extends Model
{
    use HasFactory, HasUuids;

    // Specify the table
    protected $table = 'book_club_members';

    // Primary key
    protected $primaryKey = 'membership_id';

    // Allow mass assignment
    protected $fillable = ['club_id', 'user_id', 'join_date'];

    // Cast attributes
    protected $casts = [
        'join_date' => 'datetime',
    ];

    // Relationships

    public function club()
    {
        return $this->belongsTo(BookClub::class, 'club_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
}
