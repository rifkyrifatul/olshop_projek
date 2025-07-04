import React, { useState } from 'react';
// Link diimpor dari react-router-dom untuk navigasi
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api'; // Pastikan path ini benar

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiClient.post('/login', {
                email: email,
                password: password,
            });

            console.log('Respons dari server:', response.data);
            
            const token = response.data.token || response.data.access_token;

            if (token) {
                localStorage.setItem('authToken', token);
                console.log('Token berhasil disimpan ke localStorage.');
                navigate('/dashboard');
            } else {
                setError('Login berhasil, tetapi tidak menerima token otentikasi dari server.');
                console.error('Struktur respons tidak mengandung "token" atau "access_token":', response.data);
            }

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Email atau password salah.');
            } else {
                setError('Terjadi kesalahan. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

                <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
            
            {/* PENAMBAHAN: Link untuk ke halaman registrasi */}
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
                Belum punya akun?{' '}
                <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;