<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // Pastikan ini adalah alamat frontend React Anda

    'allowed_origins_patterns' => [],

    // ==================================================================
    // !!! INI ADALAH BAGIAN PALING PENTING UNTUK DIPERBAIKI !!!
    // Pastikan nilainya adalah ['*'] untuk mengizinkan semua header,
    // termasuk header 'Authorization' yang membawa token.
    // ==================================================================
    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // ==================================================================
    // Pastikan 'supports_credentials' diatur ke true.
    // Ini penting untuk otentikasi berbasis cookie/sesi (seperti Sanctum).
    // ==================================================================
    'supports_credentials' => true,

];
