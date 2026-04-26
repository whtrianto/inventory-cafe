// ============================================================
// Order Slice - Redux Toolkit slice untuk manajemen pesanan
// Mengelola keranjang pesanan (cart) secara real-time
// ============================================================

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Cart items: array of { menuItem, quantity, notes }
  cartItems: [],
  // Info pelanggan untuk pesanan aktif
  customerName: '',
  tableNumber: '',
  paymentMethod: 'cash',
  notes: '',
  // Riwayat pesanan hari ini
  todayOrders: [],
  // Loading states
  isSubmitting: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Menambahkan item ke keranjang
    addToCart: (state, action) => {
      const { menuItem } = action.payload;
      const existingIndex = state.cartItems.findIndex(
        item => item.menuItem.id === menuItem.id
      );

      if (existingIndex >= 0) {
        // Jika item sudah ada, tambah quantity
        state.cartItems[existingIndex].quantity += 1;
      } else {
        // Jika item belum ada, tambahkan baru
        state.cartItems.push({
          menuItem,
          quantity: 1,
          notes: ''
        });
      }
    },

    // Menghapus item dari keranjang
    removeFromCart: (state, action) => {
      const { menuItemId } = action.payload;
      state.cartItems = state.cartItems.filter(
        item => item.menuItem.id !== menuItemId
      );
    },

    // Mengubah quantity item di keranjang
    updateQuantity: (state, action) => {
      const { menuItemId, quantity } = action.payload;
      const item = state.cartItems.find(
        item => item.menuItem.id === menuItemId
      );
      if (item) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            i => i.menuItem.id !== menuItemId
          );
        } else {
          item.quantity = quantity;
        }
      }
    },

    // Mengubah catatan pada item
    updateItemNotes: (state, action) => {
      const { menuItemId, notes } = action.payload;
      const item = state.cartItems.find(
        item => item.menuItem.id === menuItemId
      );
      if (item) {
        item.notes = notes;
      }
    },

    // Set info pelanggan
    setCustomerInfo: (state, action) => {
      const { customerName, tableNumber, paymentMethod, notes } = action.payload;
      if (customerName !== undefined) state.customerName = customerName;
      if (tableNumber !== undefined) state.tableNumber = tableNumber;
      if (paymentMethod !== undefined) state.paymentMethod = paymentMethod;
      if (notes !== undefined) state.notes = notes;
    },

    // Reset keranjang setelah order berhasil
    clearCart: (state) => {
      state.cartItems = [];
      state.customerName = '';
      state.tableNumber = '';
      state.paymentMethod = 'cash';
      state.notes = '';
      state.isSubmitting = false;
    },

    // Set loading state
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },

    // Set riwayat pesanan hari ini
    setTodayOrders: (state, action) => {
      state.todayOrders = action.payload;
    },

    // Tambah order ke riwayat hari ini
    addTodayOrder: (state, action) => {
      state.todayOrders.unshift(action.payload);
    }
  }
});

// Selector untuk menghitung total harga keranjang
export const selectCartTotal = (state) => {
  return state.order.cartItems.reduce((total, item) => {
    return total + (parseFloat(item.menuItem.price) * item.quantity);
  }, 0);
};

// Selector untuk menghitung total item di keranjang
export const selectCartCount = (state) => {
  return state.order.cartItems.reduce((count, item) => count + item.quantity, 0);
};

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateItemNotes,
  setCustomerInfo,
  clearCart,
  setSubmitting,
  setTodayOrders,
  addTodayOrder
} = orderSlice.actions;

export default orderSlice.reducer;
