<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SaleController extends Controller
{
    /**
     * Membuat transaksi penjualan baru.
     * Endpoint: POST /api/orders
     *
     * Method ini akan menangani semua logika inti dari proses penjualan.
     */
    public function store(Request $request)
    {
        // 1. Validasi data yang dikirim dari frontend (React)
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required|uuid|exists:customers,id',
            'cart'        => 'required|array|min:1',
            'cart.*.product_id' => 'required|integer|exists:products,id',
            'cart.*.quantity'   => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();
        $cartItems = $validatedData['cart'];

        try {
            // 2. Memulai Database Transaction
            // Ini sangat penting untuk menjaga konsistensi data. Jika ada satu langkah
            // yang gagal, semua perubahan akan dibatalkan (rollback).
            $result = DB::transaction(function () use ($validatedData, $cartItems) {

                foreach ($cartItems as $item) {
                    // Ambil data produk dari database dan kunci barisnya (lockForUpdate).
                    // Ini mencegah race condition, yaitu situasi di mana dua pelanggan
                    // membeli barang terakhir pada waktu yang hampir bersamaan.
                    $product = Product::lockForUpdate()->findOrFail($item['product_id']);

                    // REQUIREMENT 1: Validasi stok sebelum transaksi.
                    if ($product->stock < $item['quantity']) {
                        // Jika stok tidak mencukupi, lemparkan Exception.
                        // Ini akan otomatis menghentikan proses dan membatalkan transaksi.
                        throw new \Exception('Stok untuk produk "' . $product->product_name . '" tidak mencukupi.');
                    }

                    // REQUIREMENT 2: Hitung total harga (quantity * price).
                    // Ini adalah total harga untuk baris item ini (line total).
                    $lineTotal = $product->price * $item['quantity'];

                    // Membuat record penjualan baru sesuai dengan model Sale Anda.
                    Sale::create([
                        'customer_id'    => $validatedData['customer_id'],
                        'product_id'     => $item['product_id'],
                        'quantity'       => $item['quantity'],
                        'total_price'    => $lineTotal,
                        'order_date'     => now(), // Menggunakan order_date sesuai model
                    ]);

                    // REQUIREMENT 3: Kurangi stok setelah transaksi sukses.
                    // Pengurangan ini baru akan disimpan permanen ke database jika
                    // seluruh transaksi berhasil (di-commit).
                    $product->decrement('stock', $item['quantity']);
                }

                // Jika semua langkah berhasil, kembalikan pesan sukses.
                return [
                    'message' => 'Transaksi berhasil dibuat.'
                ];
            });

            // Jika transaksi berhasil, kirim response 201 (Created).
            return response()->json($result, 201);

        } catch (\Exception $e) {
            // Jika ada Exception yang terjadi (misal: stok habis), tangkap di sini.
            // Kirim response error ke frontend agar pengguna tahu apa yang terjadi.
            return response()->json([
                'message' => 'Transaksi Gagal', 
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Menampilkan riwayat transaksi.
     * Endpoint: GET /api/orders
     */
    public function index()
    {
        // Mengambil semua data penjualan dan relasinya dengan produk dan pelanggan.
        // Diurutkan berdasarkan tanggal order terbaru.
        $sales = Sale::with(['product:id,product_name', 'customer:id,customer_name'])
            ->orderBy('order_date', 'desc')
            ->get();

        return response()->json($sales);
    }
}
