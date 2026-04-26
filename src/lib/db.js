// ============================================================
// Konfigurasi Database - Sequelize ORM dengan MySQL
// File ini menginisialisasi koneksi ke database MySQL
// menggunakan Sequelize ORM dan mensinkronkan semua model.
// ============================================================

import { Sequelize } from 'sequelize';

// Membuat instance Sequelize untuk koneksi ke database MySQL
// Default menggunakan XAMPP MySQL (localhost:3306)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'cafe_nusantara',    // Nama database
  process.env.DB_USER || 'root',               // Username MySQL
  process.env.DB_PASSWORD || '',               // Password MySQL (kosong untuk XAMPP default)
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',                           // Menggunakan MySQL sebagai database
    logging: false,                             // Matikan log query SQL di console
    pool: {
      max: 5,                                   // Maksimal 5 koneksi bersamaan
      min: 0,
      acquire: 30000,                           // Timeout untuk mendapatkan koneksi (30 detik)
      idle: 10000                               // Waktu idle sebelum koneksi dilepas (10 detik)
    }
  }
);

export default sequelize;
