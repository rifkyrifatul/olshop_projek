# 🚀 Panduan Setup Proyek Online Shop

Dokumentasi ini berisi panduan untuk melakukan instalasi dan menjalankan proyek dari awal hingga aplikasi dapat diakses.

## 📋 Prasyarat (Hal yang Wajib Disiapkan)
Pastikan perangkat Anda telah memenuhi semua spesifikasi berikut:

1.  **PHP**: Versi 8.3 atau lebih baru.
2.  **Laravel**: Versi 11 atau lebih baru.
3.  **Database**: MySQL
4.  **IDE**: Visual Studio Code
5.  **Node.js**: Versi 22.17.0
6.  **Composer**: Versi 2.7.6
7.  **GitHub**: Akun dan Git Bash (atau terminal lain dengan Git).

---

## ⚙️ Langkah-langkah Instalasi

Ikuti langkah-langkah berikut secara berurutan.

### **Langkah 1: Clone Repository**

Buka Git Bash atau terminal Anda untuk mengunduh proyek.

1.  Clone repository dari GitHub:
    ```bash
    git clone [URL_REPOSITORY]
    ```

2.  Masuk ke direktori proyek:
    ```bash
    cd [NAMA_REPOSITORY]
    ```

### **Langkah 2: Setup Backend (Layanan Laravel)**

Buka terminal baru di Visual Studio Code (`Terminal` > `New Terminal`) untuk menjalankan layanan backend.

1.  Masuk ke direktori `backend`:
    ```bash
    cd backend
    ```

2.  Instal dependensi PHP dengan Composer:
    ```bash
    composer install
    ```

3.  Buat file environment `.env`:
    ```bash
    cp .env.example .env
    ```

4.  Generate kunci aplikasi Laravel:
    ```bash
    php artisan key:generate
    ```

5.  **Penting**: Buka file `.env` dan atur koneksi database Anda (MySQL) dengan benar. Pastikan Anda sudah membuat database `db_olshop2` di MySQL Anda.
    ```ini
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=db_olshop2
    DB_USERNAME=root
    DB_PASSWORD=
    ```

6.  Jalankan migrasi (untuk membuat tabel) dan seeder (untuk mengisi data awal):
    ```bash
    php artisan migrate --seed
    ```

7.  Jalankan server backend:
    ```bash
    php artisan serve
    ```
    > API Anda sekarang aktif dan dapat diakses di `http://127.0.0.1:8000`. Biarkan terminal ini tetap berjalan.

### **Langkah 3: Setup Frontend (Layanan React/Vue)**

Buka **terminal baru** di VS Code untuk menjalankan layanan frontend. Jangan tutup terminal backend.

1.  Pindah direktori ke folder `frontend`:
    ```bash
    cd ../frontend
    ```

2.  Instal dependensi JavaScript dengan NPM:
    ```bash
    npm install
    ```

3.  Jalankan server pengembangan frontend:
    ```bash
    npm run dev
    ```

---

## ✅ Mengakses Aplikasi

Setelah semua langkah di atas selesai, aplikasi Anda dapat diakses melalui URL berikut:

-   **Frontend (UI)**: [http://127.0.0.1:5173](http://127.0.0.1:5173)
-   **Backend (API)**: [http://127.0.0.1:8000](http://127.0.0.1:8000)