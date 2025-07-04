<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; // Pastikan model User sudah ada

class UserController extends Controller
{
    /**
     * Menampilkan daftar semua pengguna.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Ambil semua data pengguna dari database
        $users = User::all();

        // Kembalikan data sebagai respons JSON
        return response()->json([
            'status' => true,
            'message' => 'Data Pengguna Ditemukan',
            'data' => $users
        ], 200); // 200 adalah status code untuk OK
    }
}