import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api';

/**
 * Halaman untuk menampilkan daftar pelanggan dengan desain yang lebih modern.
 */
function CustomerListPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data pelanggan dari API
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/customers');
            setCustomers(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data pelanggan:", error);
            alert('Gagal mengambil data pelanggan.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Fungsi untuk menghapus pelanggan
    const handleDelete = async (customerId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) {
            try {
                await apiClient.delete(`/customers/${customerId}`);
                setCustomers(customers.filter(customer => customer.id !== customerId));
                alert('Pelanggan berhasil dihapus.');
            } catch (error) {
                console.error("Gagal menghapus pelanggan:", error);
                alert('Gagal menghapus pelanggan.');
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
        return <div style={styles.container}>Memuat data pelanggan...</div>;
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Manajemen Pelanggan</h1>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <button style={{...styles.button, backgroundColor: '#6c757d', color: 'white'}}>
                        Kembali ke Dashboard
                    </button>
                </Link>
            </header>

            <div style={styles.tableContainer}>
                <Link to="/customers/create" style={{ textDecoration: 'none' }}>
                    <button style={{...styles.button, backgroundColor: '#007bff', color: 'white', marginBottom: '20px'}}>
                        + Tambah Pelanggan Baru
                    </button>
                </Link>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nama Pelanggan</th>
                            <th style={styles.th}>Alamat</th>
                            <th style={styles.th}>Jenis Kelamin</th>
                            <th style={styles.th}>Tanggal Lahir</th>
                            <th style={styles.th}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? customers.map(customer => (
                            <tr key={customer.id}>
                                <td style={styles.td}>{customer.customer_name}</td>
                                <td style={styles.td}>{customer.customer_address}</td>
                                <td style={styles.td}>{customer.gender === 'Pria' ? 'Laki-laki' : 'Perempuan'}</td>
                                <td style={styles.td}>{customer.birthday_date ? new Date(customer.birthday_date).toLocaleDateString('id-ID') : '-'}</td>
                                <td style={styles.td}>
                                    <div style={styles.actionCell}>
                                        <Link to={`/customers/edit/${customer.id}`}>
                                            <button style={{...styles.button, backgroundColor: '#ffc107', color: '#212529'}}>Edit</button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(customer.id)} 
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
                                    Belum ada data pelanggan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerListPage;
