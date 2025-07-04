import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api';

// Komponen Ikon SVG untuk digunakan di dalam kartu ringkasan
const CardIcon = ({ children }) => (
    <div style={{
        position: 'absolute',
        top: '-20px',
        left: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        {children}
    </div>
);

/**
 * Halaman Dashboard Utama dengan desain yang lebih modern dan menarik.
 */
function DashboardPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [summary, setSummary] = useState(null);
    // <-- TAMBAHKAN: State baru untuk menyimpan total kuantitas item terjual
    const [totalQuantitySold, setTotalQuantitySold] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // <-- UBAH: Tambahkan apiClient.get('/orders') untuk mengambil data transaksi
                const [userRes, summaryRes, salesRes] = await Promise.all([
                    apiClient.get('/user'),
                    apiClient.get('/dashboard/summary'),
                    apiClient.get('/orders') // Mengambil semua data penjualan
                ]);

                setUser(userRes.data);
                setSummary(summaryRes.data.data);

                // <-- TAMBAHKAN: Logika untuk menjumlahkan semua quantity
                const allSales = salesRes.data;
                const totalQuantity = allSales.reduce((sum, sale) => sum + sale.quantity, 0);
                setTotalQuantitySold(totalQuantity);

            } catch (error) {
                console.error("Gagal mengambil data awal dashboard:", error);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const formatRupiah = (number) => {
        if (number === null || number === undefined) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    if (isLoading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Memuat data dashboard...</div>;
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', padding: '20px' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ margin: 0, color: '#333' }}>Dashboard</h1>
                    <p style={{ margin: '5px 0 0', color: '#555' }}>
                        Selamat Datang kembali, <strong>{user ? user.name : 'Pengguna'}</strong>!
                    </p>
                </div>
                <button onClick={handleLogout} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                    Logout
                </button>
            </header>

            {/* Navigasi Utama */}
            <nav style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <Link to="/sales/create" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '12px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Input Penjualan</button>
                </Link>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '12px 20px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white' }}>Manajemen Produk</button>
                </Link>
                <Link to="/customers" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '12px 20px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white' }}>Manajemen Pelanggan</button>
                </Link>
                <Link to="/sales" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '12px 20px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white' }}>Riwayat Transaksi</button>
                </Link>
            </nav>

            {/* Bagian Ringkasan Bisnis */}
            <h2>Ringkasan Bisnis</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {/* Kartu Total Penjualan */}
                <div style={{ position: 'relative', background: 'linear-gradient(45deg, #28a745, #218838)', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    <CardIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </CardIcon>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontWeight: 'normal' }}>Total Penjualan</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                            {summary ? formatRupiah(summary.total_revenue) : 'Rp 0'}
                        </p>
                    </div>
                </div>

                {/* <-- UBAH KARTU INI --> */}
                <div style={{ position: 'relative', background: 'linear-gradient(45deg, #17a2b8, #138496)', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    <CardIcon>
                        {/* Ikon bisa diganti jika mau, misal ikon shopping-cart */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </CardIcon>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontWeight: 'normal' }}>Total Item Terjual</h3>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                            {totalQuantitySold} 
                        </p>
                    </div>
                </div>

                {/* Sisa kartu lainnya... */}
            </div>
        </div>
    );
}

export default DashboardPage;