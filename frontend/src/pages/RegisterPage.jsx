import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api';

function RegisterPage() {
    const navigate = useNavigate();

    // State untuk setiap field input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // State untuk menampung error validasi dari Laravel
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrors({}); // Kosongkan error setiap kali submit

        try {
            const payload = {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation, // Kirim konfirmasi password
            };

            await apiClient.post('/register', payload);

            // Jika berhasil, beri notifikasi dan arahkan ke halaman login
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');

        } catch (err) {
            if (err.response && err.response.status === 422) {
                // Jika terjadi error validasi (422), simpan pesan errornya ke state
                setErrors(err.response.data.errors);
            } else {
                // Untuk error lainnya
                alert('Terjadi kesalahan. Silakan coba lagi.');
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name" type="text" value={name}
                        onChange={(e) => setName(e.target.value)} required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {/* Tampilkan error validasi untuk 'name' */}
                    {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name[0]}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email[0]}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password[0]}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <input
                        id="password_confirmation" type="password" value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)} required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {loading ? 'Processing...' : 'Register'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Sudah punya akun? <Link to="/login">Login di sini</Link>
            </p>
        </div>
    );
}

export default RegisterPage;