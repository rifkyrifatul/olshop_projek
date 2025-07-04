import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api';

/**
 * Halaman untuk menambah produk baru dengan desain yang lebih modern.
 */
function CreateProductPage() {
    const navigate = useNavigate();

    // Menggunakan satu state object untuk mengelola semua data form
    const [formData, setFormData] = useState({
        product_code: '',
        product_name: '',
        price: '',
        stock: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Fungsi tunggal untuk menangani perubahan pada semua input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await apiClient.post('/products', formData);
            navigate('/products');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || error.response.data);
            } else {
                console.error("Terjadi kesalahan saat membuat produk:", error);
                alert('Terjadi kesalahan yang tidak terduga.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    // Style object untuk desain yang rapi
    const styles = {
        container: { 
            maxWidth: '600px', 
            margin: '40px auto', 
            padding: '30px', 
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0', 
            borderRadius: '12px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            fontFamily: 'Arial, sans-serif'
        },
        header: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px'
        },
        formGroup: {
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
            fontSize: '16px'
        },
        errorText: {
            color: 'red',
            fontSize: '14px',
            marginTop: '5px'
        },
        buttonContainer: {
            marginTop: '30px',
            display: 'flex',
            gap: '10px'
        },
        button: {
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Kode Produk</label>
                    <input 
                        type="text" 
                        name="product_code"
                        value={formData.product_code} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.product_code && <p style={styles.errorText}>{errors.product_code[0]}</p>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Nama Produk</label>
                    <input 
                        type="text" 
                        name="product_name"
                        value={formData.product_name} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.product_name && <p style={styles.errorText}>{errors.product_name[0]}</p>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Harga</label>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.price && <p style={styles.errorText}>{errors.price[0]}</p>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Stok</label>
                    <input 
                        type="number" 
                        name="stock"
                        value={formData.stock} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.stock && <p style={styles.errorText}>{errors.stock[0]}</p>}
                </div>

                <div style={styles.buttonContainer}>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        style={{...styles.button, backgroundColor: '#28a745', color: 'white'}}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Produk'}
                    </button>
                    <Link to="/products">
                        <button 
                            type="button" 
                            style={{...styles.button, backgroundColor: '#6c757d', color: 'white'}}
                        >
                            Batal
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CreateProductPage;
