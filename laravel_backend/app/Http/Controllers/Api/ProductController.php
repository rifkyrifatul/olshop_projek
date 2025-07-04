<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Menampilkan daftar semua produk.
     */
    public function index()
    {
        // Ambil semua data produk dari database
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'message' => 'Daftar produk berhasil diambil.',
            'data' => $products
        ], 200);
    }

    /**
     * Menyimpan produk baru.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'product_code' => 'required|string|unique:products,product_code',
            'product_name' => 'required|string|max:255',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Buat produk baru
        $product = Product::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Produk baru berhasil ditambahkan.',
            'data' => $product
        ], 201);
    }

    /**
     * Menampilkan satu produk spesifik.
     */
    public function show(Product $product)
    {
        // Berkat Route-Model Binding, Laravel otomatis mencari produk berdasarkan {id} di URL
        return response()->json([
            'success' => true,
            'message' => 'Detail produk berhasil diambil.',
            'data' => $product
        ], 200);
    }

    /**
     * Memperbarui produk yang ada.
     */
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'product_code' => 'required|string|unique:products,product_code,' . $product->id,
            'product_name' => 'required|string|max:255',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Perbarui data produk
        $product->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diperbarui.',
            'data' => $product
        ], 200);
    }

    /**
     * Menghapus produk.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus.',
        ], 200);
    }
}