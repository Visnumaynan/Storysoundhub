<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
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
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function bookClubMember()
    {
        return $this->belongsTo(BookClubMember::class, 'membership_id');
    }
}
