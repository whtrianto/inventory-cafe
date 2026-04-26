// ============================================================
// Order History Page - Riwayat dan manajemen pesanan
// Menampilkan daftar pesanan dengan filter status
// Memungkinkan update status pesanan
// ============================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/Toast';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

export default function OrderHistoryPage() {
  const { token } = useAuth();
  const { addToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Format Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // Format tanggal
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Fetch orders dari API
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/api/orders?limit=100';
      if (statusFilter) url += `&status=${statusFilter}`;
      if (dateFilter) url += `&date=${dateFilter}`;

      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, dateFilter]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, fetchOrders]);

  // Update status pesanan
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        addToast(`Status pesanan berhasil diubah ke ${newStatus}`, 'success');
        fetchOrders();
      } else {
        addToast('Gagal mengubah status pesanan', 'error');
      }
    } catch (error) {
      addToast('Gagal terhubung ke server', 'error');
    }
  };

  // Update status pembayaran
  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus })
      });

      if (res.ok) {
        addToast('Status pembayaran berhasil diubah', 'success');
        fetchOrders();
      }
    } catch (error) {
      addToast('Gagal mengubah status pembayaran', 'error');
    }
  };

  // Mapping status ke label & warna
  const statusConfig = {
    pending: { label: '⏳ Menunggu', next: 'preparing' },
    preparing: { label: '🔥 Diproses', next: 'ready' },
    ready: { label: '✅ Siap', next: 'completed' },
    completed: { label: '✔️ Selesai', next: null },
    cancelled: { label: '❌ Batal', next: null }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Riwayat Pesanan</h1>
          <p>Kelola dan pantau semua pesanan</p>
        </div>
        <div className="page-header-right">
          <button className="btn btn-secondary btn-sm" onClick={fetchOrders}>
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      <div className="page-body">
        {/* Filter Bar */}
        <div className="filter-bar mb-24">
          <FiFilter />
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="pending">⏳ Menunggu</option>
            <option value="preparing">🔥 Diproses</option>
            <option value="ready">✅ Siap</option>
            <option value="completed">✔️ Selesai</option>
            <option value="cancelled">❌ Batal</option>
          </select>

          <input
            type="date"
            className="form-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ maxWidth: 180, padding: '10px 14px', fontSize: '0.8125rem' }}
          />

          {(statusFilter || dateFilter) && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => { setStatusFilter(''); setDateFilter(''); }}
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>Belum ada pesanan</h3>
            <p>Pesanan akan muncul di sini setelah dibuat</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <span className="order-number">{order.orderNumber}</span>
                  <span className={`badge badge-${order.status}`}>
                    {statusConfig[order.status]?.label || order.status}
                  </span>
                </div>

                <div className="order-card-customer">
                  👤 {order.customerName}
                  {order.tableNumber && <span>| 🪑 Meja {order.tableNumber}</span>}
                  {order.cashier && <span>| 💁 {order.cashier.name}</span>}
                </div>

                <ul className="order-card-items">
                  {order.items?.map(item => (
                    <li key={item.id}>
                      <span>{item.menuItem?.name || 'Item'} × {item.quantity}</span>
                      <span>{formatRupiah(item.subtotal)}</span>
                    </li>
                  ))}
                </ul>

                <div className="order-card-footer">
                  <div>
                    <div className="order-total">{formatRupiah(order.totalAmount)}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span className={`badge badge-${order.paymentStatus}`}>
                        {order.paymentStatus === 'paid' ? '💰 Lunas' : '💸 Belum Bayar'}
                      </span>
                      <span className="badge" style={{ background: '#f5f5f4' }}>
                        {order.paymentMethod === 'cash' && '💵'}
                        {order.paymentMethod === 'debit' && '💳'}
                        {order.paymentMethod === 'qris' && '📱'}
                        {order.paymentMethod === 'transfer' && '🏦'}
                        {' '}{order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="order-actions">
                    {/* Tombol update status berikutnya */}
                    {statusConfig[order.status]?.next && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateOrderStatus(order.id, statusConfig[order.status].next)}
                      >
                        {statusConfig[order.status].next === 'preparing' && '🔥 Proses'}
                        {statusConfig[order.status].next === 'ready' && '✅ Siap'}
                        {statusConfig[order.status].next === 'completed' && '✔️ Selesai'}
                      </button>
                    )}

                    {/* Tombol bayar */}
                    {order.paymentStatus === 'unpaid' && order.status !== 'cancelled' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updatePaymentStatus(order.id, 'paid')}
                      >
                        💰 Bayar
                      </button>
                    )}

                    {/* Tombol batal */}
                    {order.status === 'pending' && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-muted" style={{ marginTop: 8 }}>
                  {formatDate(order.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
