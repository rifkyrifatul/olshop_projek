<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    /**
 * Run the migrations.
 */
public function up(): void
{
    Schema::create('sales', function (Blueprint $table) {
        $table->id();

        // INI BAGIAN PENTINGNYA
        // Pastikan menggunakan foreignUuid untuk merujuk ke primary key UUID di tabel customers
        $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade');

        // Gunakan foreignId biasa untuk merujuk ke primary key integer di tabel products
        $table->foreignId('product_id')->constrained('products')->onDelete('cascade');

        $table->timestamp('order_date')->useCurrent();
        $table->integer('quantity');
        $table->decimal('total_price', 10, 2);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};