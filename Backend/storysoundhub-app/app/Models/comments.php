<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comments extends Model
{
    use HasFactory;

    // Specify the table
    protected $table = 'comments';

    // Primary key
    protected $primaryKey = 'comment_id';

    // Allow mass assignment
    protected $fillable = ['post_id', 'membership_id', 'content'];

    // Relationships

    public function post()
    {
        return $this->belongsTo(posts::class, 'post_id');
    }

    public function bookClubMember()
    {
        return $this->belongsTo(book_club_members::class, 'membership_id');
    }
}
