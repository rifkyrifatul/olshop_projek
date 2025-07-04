<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            // Kunci untuk mencari data yang sudah ada
            ['email' => 'admin@azatech.id'],
            // Data yang akan di-update jika ditemukan, atau dibuat jika tidak ditemukan
            [
                'name' => 'Admin AZA Tech',
                'password' => Hash::make('password'),
            ]
        );
    }
}