<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    use HasFactory,HasUuids;
    // Specify the table name (optional if it matches the model name)
    protected $table = 'users';

    // Primary key type is UUID
    protected $keyType = 'string';

    // Disable auto-incrementing because we're using UUID
    public $incrementing = false;

    // Allow mass assignment for these attributes
    protected $fillable = [
        'id', 'username', 'email', 'password_hash', 'profile_picture', 'phone', 'location', 'date_joined'
    ];

    // Automatically cast attributes to specified types
    protected $casts = [
        'date_joined' => 'datetime',
    ];

    // Hide sensitive attributes when serializing the model
    protected $hidden = [
        'password_hash'
    ];

    // Custom accessor for profile picture (e.g., full URL)
    public function getProfilePictureUrlAttribute()
    {
        return $this->profile_picture ? asset('storage/' . $this->profile_picture) : null;
    }

    // Example method: Get formatted phone number
    public function getFormattedPhoneAttribute()
    {
        return "+" . substr($this->phone, 0, 3) . "-" . substr($this->phone, 3);
    }
}
