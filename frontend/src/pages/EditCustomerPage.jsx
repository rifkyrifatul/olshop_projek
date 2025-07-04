import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import apiClient from '../api';

/**
 * Halaman untuk mengedit data pelanggan dengan desain yang lebih modern.
 */
function EditCustomerPage() {
    const { id } = useParams(); // Mengambil ID dari parameter URL
    const navigate = useNavigate();

    // Menggunakan satu state object untuk mengelola semua data form
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_address: '',
        gender: 'Pria',
        birthday_date: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // Mengambil data pelanggan yang akan diedit saat halaman dimuat
    useEffect(() => {
        const fetchCustomer = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const response = await apiClient.get(`/customers/${id}`);
                if (response.data && response.data.data) {
                    const customerData = response.data.data;
                    // Format tanggal agar sesuai dengan input type="date" (YYYY-MM-DD)
                    if (customerData.birthday_date) {
                        customerData.birthday_date = customerData.birthday_date.split('T')[0];
                    }
                    setFormData(customerData);
                } else {
                    throw new Error("Format respons dari server tidak valid.");
                }
            } catch (error) {
                console.error("Gagal mengambil data pelanggan:", error);
                setFetchError("Gagal memuat data pelanggan. Pastikan data ada dan server berjalan normal.");
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    // Fungsi tunggal untuk menangani perubahan pada semua input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await apiClient.put(`/customers/${id}`, formData);
            navigate('/customers');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || error.response.data);
            } else {
                console.error("Gagal memperbarui pelanggan:", error);
                alert('Terjadi kesalahan saat memperbarui.');
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
    
    // Tampilkan pesan loading saat data sedang diambil
    if (loading) {
        return <div style={{...styles.container, textAlign: 'center'}}>Memuat data pelanggan...</div>;
    }

    // Tampilkan pesan error jika gagal mengambil data
    if (fetchError) {
        return (
            <div style={{...styles.container, textAlign: 'center', color: 'red'}}>
                <p>{fetchError}</p>
                <Link to="/customers">Kembali ke Daftar Pelanggan</Link>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Edit Pelanggan</h1>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nama Pelanggan</label>
                    <input 
                        type="text" 
                        name="customer_name"
                        value={formData.customer_name} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.customer_name && <p style={styles.errorText}>{errors.customer_name[0]}</p>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Alamat</label>
                    <textarea 
                        name="customer_address"
                        value={formData.customer_address} 
                        onChange={handleChange} 
                        style={{...styles.input, minHeight: '100px'}} 
                    />
                    {errors.customer_address && <p style={styles.errorText}>{errors.customer_address[0]}</p>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Jenis Kelamin</label>
                    <select 
                        name="gender"
                        value={formData.gender} 
                        onChange={handleChange} 
                        style={styles.input}
                    >
                        <option value="Pria">Laki-laki</option>
                        <option value="Wanita">Perempuan</option>
                    </select>
                    {errors.gender && <p style={styles.errorText}>{errors.gender[0]}</p>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Tanggal Lahir</label>
                    <input 
                        type="date" 
                        name="birthday_date"
                        value={formData.birthday_date} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.birthday_date && <p style={styles.errorText}>{errors.birthday_date[0]}</p>}
                </div>

                <div style={styles.buttonContainer}>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        style={{...styles.button, backgroundColor: '#007bff', color: 'white'}}
                    >
                        {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
                    </button>
                    <Link to="/customers">
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

export default EditCustomerPage;
