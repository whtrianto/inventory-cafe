// ============================================================
// Redux Store - Konfigurasi store Redux Toolkit
// Mengelola state global untuk order cart dan inventory
// ============================================================

import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import inventoryReducer from './inventorySlice';

// Membuat Redux store dengan 2 slice:
// 1. order: mengelola keranjang pesanan dan riwayat order
// 2. inventory: mengelola data stok bahan baku
const store = configureStore({
  reducer: {
    order: orderReducer,
    inventory: inventoryReducer,
  },
});

export default store;
