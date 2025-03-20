<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book_whishlist extends Model
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
        return $this->belongsTo(user::class, 'user_id');
    }

    public function book()
    {
        return $this->belongsTo(book::class, 'book_id');
    }
}
