<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class book_whishlist extends Model
{
    use HasFactory;

    protected $table = 'book_wishlist';
    protected $primaryKey = 'wishlist_id';
    protected $fillable = ['user_id', 'book_id', 'picture', 'wishlist_date'];

    protected $casts = [
        'wishlist_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
