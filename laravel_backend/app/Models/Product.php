<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    /**
     * Atribut yang boleh diisi secara massal.
     */
    protected $fillable = [
        'product_code',
        'product_name',
        'stock',
        'price',
    ];

    /**
     * Casting tipe data untuk atribut.
     */
    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    /**
     * Relasi: Satu Produk bisa ada di banyak Penjualan (Sales).
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }
}