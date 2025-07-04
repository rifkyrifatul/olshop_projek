import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Komponen ini bertindak sebagai "gerbang" untuk semua halaman
 * yang memerlukan login.
 * Ia memeriksa token sebelum me-render halaman anak.
 */
function DashboardLayout() {
    // Ambil token dari penyimpanan lokal browser
    const token = localStorage.getItem('authToken');

    // Jika tidak ada token, jangan tampilkan halaman apa pun.
    // Langsung arahkan (redirect) pengguna ke halaman login.
    // `replace` digunakan agar pengguna tidak bisa kembali ke halaman sebelumnya dengan tombol back.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika token ADA, tampilkan halaman yang diminta.
    // <Outlet /> adalah placeholder dari react-router-dom yang akan
    // diisi dengan komponen halaman anak (misal: DashboardPage, ProductListPage, dll).
    return <Outlet />;
}

export default DashboardLayout;
