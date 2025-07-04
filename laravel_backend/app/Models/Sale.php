<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{
    use HasFactory;

    /**
     * Atribut yang boleh diisi secara massal.
     */
    protected $fillable = [
        'customer_id',
        'product_id',
        'order_date',
        'quantity',
        'total_price',
    ];

    /**
     * Casting tipe data untuk atribut.
     */
    protected $casts = [
        'order_date' => 'datetime',
        'total_price' => 'decimal:2',
        'quantity' => 'integer',
    ];

    /**
     * Relasi: Setiap Penjualan (Sale) dimiliki oleh satu Customer.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Relasi: Setiap Penjualan (Sale) terkait dengan satu Product.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}