// ============================================================
// Index Model - Menginisialisasi semua model dan relasi antar tabel
// File ini menjadi entry point untuk semua operasi database
// ============================================================

import sequelize from '@/lib/db';
import User from './User';
import Category from './Category';
import MenuItem from './MenuItem';
import Order from './Order';
import OrderItem from './OrderItem';
import Inventory from './Inventory';

// ============================================================
// Definisi Relasi (Association) antar Model
// ============================================================

// Relasi Category <-> MenuItem (One-to-Many)
// Satu kategori memiliki banyak menu item
Category.hasMany(MenuItem, { foreignKey: 'categoryId', as: 'menuItems' });
MenuItem.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Relasi User <-> Order (One-to-Many)
// Satu kasir bisa membuat banyak pesanan
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'cashier' });

// Relasi Order <-> OrderItem (One-to-Many)
// Satu pesanan memiliki banyak item
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Relasi MenuItem <-> OrderItem (One-to-Many)
// Satu menu item bisa ada di banyak order item
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId', as: 'orderItems' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });

// ============================================================
// Fungsi untuk sinkronisasi database
// Membuat tabel jika belum ada
// ============================================================
export async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil!');
    
    // alter: true akan menyesuaikan tabel dengan model tanpa menghapus data
    await sequelize.sync({ alter: true });
    console.log('✅ Semua tabel berhasil disinkronkan!');
    
    return true;
  } catch (error) {
    console.error('❌ Gagal koneksi ke database:', error.message);
    return false;
  }
}

export { sequelize, User, Category, MenuItem, Order, OrderItem, Inventory };
