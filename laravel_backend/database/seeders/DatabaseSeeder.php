<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil seeder yang sudah kita buat
        $this->call([
            ProductSeeder::class,
            CustomerSeeder::class,
            UserSeeder::class,
        ]);
    }
}