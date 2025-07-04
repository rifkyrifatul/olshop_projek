import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api';

/**
 * Halaman untuk menampilkan daftar produk dengan desain yang lebih modern.
 */
function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data produk dari API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/products');
            setProducts(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data produk:", error);
            alert('Gagal mengambil data produk.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fungsi untuk menghapus produk
    const handleDelete = async (productId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            try {
                await apiClient.delete(`/products/${productId}`);
                setProducts(products.filter(product => product.id !== productId));
                alert('Produk berhasil dihapus.');
            } catch (error) {
                console.error("Gagal menghapus produk:", error);
                alert('Gagal menghapus produk.');
            }
        }
    };
    
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
        },
        actionCell: {
            display: 'flex',
            gap: '10px'
        }
    };

    if (loading) {
        return <div style={styles.container}>Memuat data produk...</div>;
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Manajemen Produk</h1>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <button style={{...styles.button, backgroundColor: '#6c757d', color: 'white'}}>
                        Kembali ke Dashboard
                    </button>
                </Link>
            </header>

            <div style={styles.tableContainer}>
                <Link to="/products/create" style={{ textDecoration: 'none' }}>
                    <button style={{...styles.button, backgroundColor: '#007bff', color: 'white', marginBottom: '20px'}}>
                        + Tambah Produk Baru
                    </button>
                </Link>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Kode Produk</th>
                            <th style={styles.th}>Nama Produk</th>
                            <th style={styles.th}>Harga</th>
                            <th style={styles.th}>Stok</th>
                            <th style={styles.th}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map(product => (
                            <tr key={product.id}>
                                <td style={styles.td}>{product.product_code}</td>
                                <td style={styles.td}>{product.product_name}</td>
                                <td style={styles.td}>Rp {Number(product.price).toLocaleString('id-ID')}</td>
                                <td style={styles.td}>{product.stock}</td>
                                <td style={styles.td}>
                                    <div style={styles.actionCell}>
                                        <Link to={`/products/edit/${product.id}`}>
                                            <button style={{...styles.button, backgroundColor: '#ffc107', color: '#212529'}}>Edit</button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product.id)} 
                                            style={{...styles.button, backgroundColor: '#dc3545', color: 'white'}}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{...styles.td, textAlign: 'center', padding: '20px'}}>
                                    Belum ada data produk.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductListPage;
