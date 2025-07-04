<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Menampilkan daftar semua pelanggan.
     */
    public function index()
    {
        $customers = Customer::orderBy('customer_name', 'asc')->get();
        return response()->json([
            'success' => true,
            'message' => 'Daftar pelanggan berhasil diambil.',
            'data' => $customers
        ], 200);
    }

    /**
     * Menyimpan pelanggan baru.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_address' => 'required|string',
            'gender' => 'required|in:Pria,Wanita', 
            'birthday_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $customer = Customer::create($validator->validated());

        return response()->json([
            'data' => $customer, 
            'message' => 'Pelanggan berhasil dibuat'
        ], 201);
    }

    /**
     * Menampilkan satu pelanggan spesifik.
     * Ini adalah metode yang hilang dan diperlukan untuk halaman edit.
     */
    public function show(Customer $customer)
    {
        return response()->json([
            'success' => true,
            'data' => $customer
        ], 200);
    }

    /**
     * Memperbarui pelanggan yang ada.
     */
    public function update(Request $request, Customer $customer)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_address' => 'nullable|string',
            'gender' => 'required|in:Pria,Wanita',
            'birthday_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $customer->update($validator->validated());

        return response()->json([
            'data' => $customer, 
            'message' => 'Pelanggan berhasil diperbarui'
        ], 200);
    }

    /**
     * Menghapus pelanggan.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pelanggan berhasil dihapus.'
        ], 200);
    }
}
