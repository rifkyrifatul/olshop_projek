<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
// use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rute Publik (tidak perlu login/token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute Terlindungi (wajib menggunakan token dari Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    
    // Rute untuk otentikasi & data user
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rute untuk ringkasan Dashboard
    // Route::get('/dashboard/summary', [DashboardController::class, 'summary']);

    // Rute untuk Produk, Pelanggan, dan Penjualan
    // Menggunakan apiResource lebih ringkas untuk membuat endpoint CRUD standar
    Route::apiResource('products', ProductController::class);
    Route::apiResource('customers', CustomerController::class);
    
    // Jika nama endpoint berbeda (misal: 'sales' bukan 'orders') sesuaikan di frontend
    Route::get('/orders', [SaleController::class, 'index']);
    Route::post('/orders', [SaleController::class, 'store']);
    
});
