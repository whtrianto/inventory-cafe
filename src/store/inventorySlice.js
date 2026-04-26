// ============================================================
// Inventory Slice - Redux Toolkit slice untuk manajemen stok
// Mengelola data persediaan bahan baku cafe
// ============================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk untuk mengambil data inventory dari API
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/inventory', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Gagal mengambil data inventory');
      const data = await res.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk untuk update stok inventory
export const updateInventoryItem = createAsyncThunk(
  'inventory/updateItem',
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Gagal update inventory');
      const result = await res.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],                    // Daftar semua item inventory
  lowStockItems: [],           // Item dengan stok di bawah minimum
  loading: false,
  error: null,
  searchTerm: '',              // Filter pencarian
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Set filter pencarian
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    // Hitung item dengan stok rendah
    calculateLowStock: (state) => {
      state.lowStockItems = state.items.filter(
        item => parseFloat(item.quantity) <= parseFloat(item.minStock)
      );
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch inventory
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lowStockItems = action.payload.filter(
          item => parseFloat(item.quantity) <= parseFloat(item.minStock)
        );
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update inventory item
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
        state.lowStockItems = state.items.filter(
          item => parseFloat(item.quantity) <= parseFloat(item.minStock)
        );
      });
  }
});

// Selector untuk mendapatkan item yang sudah difilter
export const selectFilteredInventory = (state) => {
  const { items, searchTerm } = state.inventory;
  if (!searchTerm) return items;
  return items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

export const { setSearchTerm, calculateLowStock, clearError } = inventorySlice.actions;
export default inventorySlice.reducer;
