// src/api.js

import axios from 'axios';

// Buat instance Axios baru
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL dasar API Anda
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Gunakan interceptor untuk menyisipkan token secara otomatis
apiClient.interceptors.request.use(
    (config) => {
        // Ambil token dari localStorage
        const token = localStorage.getItem('authToken');

        // Jika token ada, tambahkan ke header Authorization
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Lakukan sesuatu jika ada error pada request
        return Promise.reject(error);
    }
);

export default apiClient;