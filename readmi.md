PANDUAN SETUP PROYEK

Prasyarat (Hal yang Wajib Disiapkan)
    1. PHP: Versi 8.3 atau lebih baru.
    2. Laravel: Versi 11 atau lebih baru.
    3. Database: MySQL
    4. IDE: Visual Studio Code
    5. Node.Js: Versi 22.17.0
    6. Composer: Versi 2.7.6
    7. Github 

Langkah-langkah Instalasi
Langkah 1: Clone Repository di gitbash
    - git clone [URL_REPOSITORY_ANDA]
    - cd [NAMA_REPOSITORY]

Langkah 2: Setup Backend (Layanan Laravel)
Buka terminal di vscode untuk menjalankan layanan backend
    - cd backend
    - composer install
    - cp .env.example .env
    - php artisan key:generate
Penting: Buka file .env dan atur koneksi database Anda (MySQL) dengan benar.
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=db_olshop2
    DB_USERNAME=root
    DB_PASSWORD=
    php artisan migrate --seed

Jalankan server backend
- php artisan serve
Penjelasan: Perintah ini akan menjalankan server pengembangan Laravel. API Anda sekarang aktif dan dapat diakses di http://127.0.0.1:8000. Biarkan terminal ini tetap berjalan.

Langkah 3: Setup Frontend (Layanan React/Vue)
Buka terminal baru untuk menjalankan layanan frontend. Jangan tutup terminal backend.
    - cd ../frontend
    - npm install
    - npm run dev

4. Mengakses Aplikasi
Setelah semua langkah selesai, aplikasi Anda dapat diakses melalui:
Frontend (UI): http://127.0.0.1:5173 
Backend (API): http://127.0.0.1:8000.