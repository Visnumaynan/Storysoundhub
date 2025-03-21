<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Specify the table
    protected $table = 'posts';

    // Primary key
    protected $primaryKey = 'post_id';

    // Allow mass assignment
    protected $fillable = ['membership_id', 'club_id', 'content', 'media'];

    // Relationships

    public function bookClubMember()
    {
        return $this->belongsTo(BookClubMember::class, 'membership_id');
    }

    public function club()
    {
        return $this->belongsTo(BookClub::class, 'club_id');
    }
}
