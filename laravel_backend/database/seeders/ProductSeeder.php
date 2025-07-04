<?php

namespace Database\Seeders;

use App\Models\Product; // <--- TAMBAHKAN BARIS INI
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'product_code' => 'P0001',
            'product_name' => 'Hydrococo 150ml',
            'stock' => 100,
            'price' => 12000.00
        ]);

        Product::create([
            'product_code' => 'P0002',
            'product_name' => 'Buku Tulis Sinar Dunia',
            'stock' => 50,
            'price' => 5000.00
        ]);

        Product::create([
            'product_code' => 'P0003',
            'product_name' => 'Mouse Logitech M220',
            'stock' => 25,
            'price' => 150000.00
        ]);
    }
}