// ============================================================
// Orders Page (POS) - Point of Sale untuk membuat pesanan baru
// Menampilkan menu dengan grid dan keranjang belanja
// Menggunakan Redux Toolkit untuk state management keranjang
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/Toast';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCustomerInfo,
  clearCart,
  setSubmitting,
  selectCartTotal,
  selectCartCount
} from '@/store/orderSlice';
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiSearch } from 'react-icons/fi';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { addToast } = useToast();

  // Redux state
  const cartItems = useSelector(state => state.order.cartItems);
  const customerName = useSelector(state => state.order.customerName);
  const tableNumber = useSelector(state => state.order.tableNumber);
  const paymentMethod = useSelector(state => state.order.paymentMethod);
  const isSubmitting = useSelector(state => state.order.isSubmitting);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);

  // Local state
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Ambil data menu dan kategori
  useEffect(() => {
    async function fetchData() {
      try {
        const [menuRes, catRes] = await Promise.all([
          fetch('/api/menu?available=true'),
          fetch('/api/categories')
        ]);
        const menuData = await menuRes.json();
        const catData = await catRes.json();
        
        setMenuItems(menuData.data || []);
        setCategories(catData.data || []);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter menu berdasarkan kategori dan pencarian
  const filteredMenu = menuItems.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.categoryId === parseInt(selectedCategory);
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Format rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // Mendapatkan emoji kategori
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || '☕';
  };

  // Submit pesanan
  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      addToast('Keranjang kosong! Tambahkan item terlebih dahulu.', 'warning');
      return;
    }

    dispatch(setSubmitting(true));

    try {
      const orderData = {
        customerName: customerName || 'Walk-in Customer',
        tableNumber: tableNumber ? parseInt(tableNumber) : null,
        paymentMethod,
        items: cartItems.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          notes: item.notes || null
        }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        addToast(`Pesanan ${data.data.orderNumber} berhasil dibuat!`, 'success');
        dispatch(clearCart());
      } else {
        addToast(data.message || 'Gagal membuat pesanan', 'error');
      }
    } catch (error) {
      addToast('Gagal terhubung ke server', 'error');
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Pesanan Baru</h1>
          <p>Buat pesanan untuk pelanggan</p>
        </div>
      </div>

      <div className="page-body">
        <div className="pos-layout">
          {/* ========== Panel Menu ========== */}
          <div className="pos-menu-panel">
            {/* Search Bar */}
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="form-input"
                placeholder="Cari menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search-menu"
              />
            </div>

            {/* Category Tabs */}
            <div className="category-tabs">
              <button
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                🍽️ Semua
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab ${selectedCategory === String(cat.id) ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(String(cat.id))}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            {loading ? (
              <div className="loading-spinner"><div className="spinner" /></div>
            ) : (
              <div className="menu-grid">
                {filteredMenu.map(item => (
                  <div
                    key={item.id}
                    className={`menu-card ${!item.isAvailable ? 'unavailable' : ''}`}
                    onClick={() => item.isAvailable && dispatch(addToCart({ menuItem: item }))}
                  >
                    <div className="menu-card-image">
                      {getCategoryIcon(item.categoryId)}
                    </div>
                    <div className="menu-card-body">
                      <div className="menu-card-name">{item.name}</div>
                      <div className="menu-card-price">{formatRupiah(item.price)}</div>
                      <div className="menu-card-category">
                        {item.category?.name || 'Umum'}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredMenu.length === 0 && (
                  <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                    <div className="empty-state-icon">🔍</div>
                    <h3>Menu tidak ditemukan</h3>
                    <p>Coba kata kunci atau kategori lain</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ========== Panel Keranjang (Cart) ========== */}
          <div className="pos-cart-panel card">
            <div className="cart-header">
              <h3>
                <FiShoppingCart /> Keranjang
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </h3>
              {cartItems.length > 0 && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => dispatch(clearCart())}
                  style={{ color: 'var(--error)', fontSize: '0.8125rem' }}
                >
                  Kosongkan
                </button>
              )}
            </div>

            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <p>Keranjang kosong</p>
                  <p className="text-xs text-muted">Klik menu untuk menambahkan</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.menuItem.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.menuItem.name}</div>
                      <div className="cart-item-price">{formatRupiah(item.menuItem.price)}</div>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        className="qty-btn"
                        onClick={() => dispatch(updateQuantity({ menuItemId: item.menuItem.id, quantity: item.quantity - 1 }))}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => dispatch(updateQuantity({ menuItemId: item.menuItem.id, quantity: item.quantity + 1 }))}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                    <div className="cart-item-subtotal">
                      {formatRupiah(parseFloat(item.menuItem.price) * item.quantity)}
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => dispatch(removeFromCart({ menuItemId: item.menuItem.id }))}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-value">{formatRupiah(cartTotal)}</span>
                </div>

                {/* Customer Info Form */}
                <div className="cart-customer-form">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nama pelanggan (opsional)"
                    value={customerName}
                    onChange={(e) => dispatch(setCustomerInfo({ customerName: e.target.value }))}
                  />
                  <div className="cart-customer-row">
                    <input
                      type="number"
                      className="form-input"
                      placeholder="No. Meja"
                      value={tableNumber}
                      onChange={(e) => dispatch(setCustomerInfo({ tableNumber: e.target.value }))}
                    />
                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => dispatch(setCustomerInfo({ paymentMethod: e.target.value }))}
                    >
                      <option value="cash">💵 Cash</option>
                      <option value="debit">💳 Debit</option>
                      <option value="qris">📱 QRIS</option>
                      <option value="transfer">🏦 Transfer</option>
                    </select>
                  </div>
                </div>

                <button
                  className="btn btn-success btn-full btn-lg"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  id="submit-order"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2, borderTopColor: 'white' }} />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart />
                      Buat Pesanan — {formatRupiah(cartTotal)}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
