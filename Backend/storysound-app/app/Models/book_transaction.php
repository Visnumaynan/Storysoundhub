<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class book_transaction extends Model
{
    use HasFactory;

    protected $table = 'book_transactions';

    protected $primaryKey = 'transaction_id';

    protected $fillable = ['book_id', 'buyer_id', 'seller_id', 'price', 'status', 'transaction_date'];

    protected $casts = [
        'transaction_date' => 'datetime',
        'price' => 'decimal:2',
    ];

    public function book()
    {
        return $this->belongsTo(book::class, 'book_id');
    }

    public function buyer()
    {
        return $this->belongsTo(user::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(user::class, 'seller_id');
    }
}
