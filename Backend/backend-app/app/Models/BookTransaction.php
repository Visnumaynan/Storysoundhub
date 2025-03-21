<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookTransaction extends Model
{
    use HasFactory;

    protected $table = 'book_transactions';

    protected $primaryKey = 'transaction_id';

    protected $fillable = [ 'buyer_id', 'seller_id', 'price', 'status', 'transaction_date'];

    protected $casts = [
        'transaction_date' => 'datetime',
        'price' => 'decimal:2',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
}
