import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    // State untuk menyimpan daftar pengguna
    const [users, setUsers] = useState([]);
    // State untuk status loading
    const [loading, setLoading] = useState(true);
    // State untuk error
    const [error, setError] = useState(null);

    // useEffect akan berjalan setelah komponen di-render
    useEffect(() => {
        // Fungsi untuk mengambil data dari API
        const fetchUsers = async () => {
            try {
                // Panggil API Laravel menggunakan Axios
                // Pastikan URL-nya benar sesuai dengan server Laravel Anda
                const response = await axios.get('http://127.0.0.1:8000/api/users');

                // Set data pengguna ke state
                setUsers(response.data.data); // Akses properti 'data' dari respons JSON Anda
            } catch (err) {
                // Set pesan error jika terjadi masalah
                setError(err.message);
            } finally {
                // Hentikan status loading
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Array kosong memastikan useEffect hanya berjalan sekali

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Daftar Pengguna</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>
                            {user.name} ({user.email})
                        </li>
                    ))
                ) : (
                    <p>Tidak ada data pengguna.</p>
                )}
            </ul>
        </div>
    );
}

export default UserList;