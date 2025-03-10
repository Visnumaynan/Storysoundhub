<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reactions extends Model
{
    use HasFactory;

    // Specify the table
    protected $table = 'reactions';

    // Primary key
    protected $primaryKey = 'reaction_id';

    // Allow mass assignment
    protected $fillable = ['post_id', 'comment_id', 'membership_id', 'type'];

    // Relationships

    public function post()
    {
        return $this->belongsTo(Posts::class, 'post_id');
    }

    public function comment()
    {
        return $this->belongsTo(Comments::class, 'comment_id');
    }

    public function bookClubMember()
    {
        return $this->belongsTo(Book_club_members::class,  'membership_id');
    }
}
