<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::create([
            'customer_name' => 'Budi Santoso',
            'customer_address' => 'Jakarta',
            'gender' => 'Pria',
            'birthday_date' => '1995-02-10'
        ]);

        Customer::create([
            'customer_name' => 'Siti Aminah',
            'customer_address' => 'Surabaya',
            'gender' => 'Wanita',
            'birthday_date' => '1998-05-20'
        ]);
    }
}