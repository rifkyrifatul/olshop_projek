<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'customer_name',
        'customer_address',
        'gender',
        'birthday_date',
    ];

    protected $casts = [
        'birthday_date' => 'date',
    ];

    /**
     * Get the route key for the model.
     * * @return string
     */
    public function getRouteKeyName()
    {
        return 'id'; // Memberitahu Laravel untuk menggunakan kolom 'id' untuk Route-Model Binding
    }

    // ... relasi sales Anda
}