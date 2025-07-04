import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api';

/**
 * Halaman untuk menampilkan riwayat semua item penjualan dengan desain yang lebih modern.
 */
function TransactionListPage() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mengambil data riwayat penjualan saat halaman dimuat
    useEffect(() => {
        const fetchSales = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/orders');
                setSales(response.data); 
            } catch (error) {
                console.error("Gagal mengambil data transaksi:", error);
                alert('Gagal mengambil data riwayat transaksi.');
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    // Style object untuk desain yang rapi
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        },
        title: {
            color: '#333'
        },
        button: {
            padding: '10px 18px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'inline-block'
        },
        tableContainer: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            textAlign: 'left',
            padding: '12px 15px',
            borderBottom: '2px solid #ddd',
            color: '#555'
        },
        td: {
            textAlign: 'left',
            padding: '12px 15px',
            borderBottom: '1px solid #eee'
        }
    };

    if (loading) {
        return <div style={styles.container}>Memuat riwayat transaksi...</div>;
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Riwayat Transaksi</h1>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <button style={{...styles.button, backgroundColor: '#6c757d', color: 'white'}}>
                        Kembali ke Dashboard
                    </button>
                </Link>
            </header>

            <div style={styles.tableContainer}>
                <Link to="/sales/create" style={{ textDecoration: 'none' }}>
                    <button style={{...styles.button, backgroundColor: '#007bff', color: 'white', marginBottom: '20px'}}>
                        + Buat Transaksi Baru
                    </button>
                </Link>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Tanggal Order</th>
                            <th style={styles.th}>Nama Produk</th>
                            <th style={styles.th}>Nama Pelanggan</th>
                            <th style={styles.th}>Kuantitas</th>
                            <th style={styles.th}>Total Harga</th>
                            {/* <th style={styles.th}>Aksi</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length > 0 ? sales.map(sale => (
                            <tr key={sale.id}>
                                <td style={styles.td}>{new Date(sale.order_date).toLocaleString('id-ID')}</td>
                                <td style={styles.td}>{sale.product ? sale.product.product_name : 'N/A'}</td>
                                <td style={styles.td}>{sale.customer ? sale.customer.customer_name : 'N/A'}</td>
                                <td style={styles.td}>{sale.quantity}</td>
                                <td style={styles.td}>Rp {Number(sale.total_price).toLocaleString('id-ID')}</td>
                                <td style={styles.td}>
                                    {/* <button style={{...styles.button, backgroundColor: '#17a2b8', color: 'white', padding: '8px 12px'}}>
                                        Detail
                                    </button> */}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{...styles.td, textAlign: 'center', padding: '20px'}}>
                                    Belum ada riwayat transaksi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionListPage;
