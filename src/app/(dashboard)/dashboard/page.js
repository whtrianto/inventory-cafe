// ============================================================
// Dashboard Page - Halaman utama setelah login
// Menampilkan ringkasan statistik, pesanan terbaru, dan alert stok
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiTrendingUp, FiShoppingBag, FiClock, FiCoffee, FiAlertTriangle, FiUsers } from 'react-icons/fi';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mengambil data dashboard dari API
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch('/api/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (token) fetchDashboard();
  }, [token]);

  // Format angka ke format Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  // Format tanggal ke format Indonesia
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <div className="page-header">
          <div className="page-header-left">
            <h1>Dashboard</h1>
            <p>Memuat data...</p>
          </div>
        </div>
        <div className="page-body">
          <div className="loading-spinner"><div className="spinner" /></div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header Halaman */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Dashboard</h1>
          <p>Selamat datang kembali, {user?.name}! 👋</p>
        </div>
        <div className="page-header-right">
          <span className="text-sm text-muted">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="page-body">
        {/* ========== Statistik Kartu ========== */}
        <div className="stats-grid">
          <div className="stat-card revenue">
            <div className="stat-card-top">
              <span className="stat-card-label">Pendapatan Hari Ini</span>
              <div className="stat-card-icon"><FiTrendingUp /></div>
            </div>
            <div className="stat-card-value">{formatRupiah(stats?.todayRevenue || 0)}</div>
            <div className="stat-card-sub">Bulan ini: {formatRupiah(stats?.monthRevenue || 0)}</div>
          </div>

          <div className="stat-card orders">
            <div className="stat-card-top">
              <span className="stat-card-label">Pesanan Hari Ini</span>
              <div className="stat-card-icon"><FiShoppingBag /></div>
            </div>
            <div className="stat-card-value">{stats?.todayOrders || 0}</div>
            <div className="stat-card-sub">Total transaksi hari ini</div>
          </div>

          <div className="stat-card active">
            <div className="stat-card-top">
              <span className="stat-card-label">Pesanan Aktif</span>
              <div className="stat-card-icon"><FiClock /></div>
            </div>
            <div className="stat-card-value">{stats?.activeOrders || 0}</div>
            <div className="stat-card-sub">Sedang diproses</div>
          </div>

          <div className="stat-card menu">
            <div className="stat-card-top">
              <span className="stat-card-label">Total Menu</span>
              <div className="stat-card-icon"><FiCoffee /></div>
            </div>
            <div className="stat-card-value">{stats?.totalMenu || 0}</div>
            <div className="stat-card-sub">{stats?.totalStaff || 0} staff aktif</div>
          </div>
        </div>

        {/* ========== Grid Bawah: Recent Orders & Low Stock ========== */}
        <div className="dashboard-grid">
          {/* Pesanan Terbaru */}
          <div className="card">
            <div className="card-header">
              <h2>📋 Pesanan Terbaru</h2>
            </div>
            <div className="card-body-flush">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>No. Order</th>
                      <th>Pelanggan</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recentOrders?.length > 0 ? (
                      stats.recentOrders.slice(0, 8).map((order) => (
                        <tr key={order.id}>
                          <td>
                            <span style={{ fontWeight: 600, color: 'var(--primary-800)', fontSize: '0.8125rem' }}>
                              {order.orderNumber}
                            </span>
                          </td>
                          <td>{order.customerName}</td>
                          <td style={{ fontWeight: 600 }}>{formatRupiah(order.totalAmount)}</td>
                          <td>
                            <span className={`badge badge-${order.status}`}>
                              {order.status === 'pending' && '⏳ Menunggu'}
                              {order.status === 'preparing' && '🔥 Diproses'}
                              {order.status === 'ready' && '✅ Siap'}
                              {order.status === 'completed' && '✔️ Selesai'}
                              {order.status === 'cancelled' && '❌ Batal'}
                            </span>
                          </td>
                          <td className="text-sm text-muted">{formatDate(order.createdAt)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted" style={{ padding: 40 }}>
                          Belum ada pesanan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Alert Stok Rendah */}
          <div className="card">
            <div className="card-header">
              <h2>⚠️ Stok Rendah</h2>
              <span className="badge badge-low-stock">
                {stats?.lowStockItems?.length || 0} item
              </span>
            </div>
            <div className="card-body">
              {stats?.lowStockItems?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {stats.lowStockItems.map((item) => {
                    const percentage = Math.min((parseFloat(item.quantity) / parseFloat(item.minStock)) * 100, 100);
                    return (
                      <div key={item.id} style={{ 
                        padding: '14px 16px', 
                        background: percentage <= 50 ? 'var(--error-light)' : 'var(--warning-light)', 
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${percentage <= 50 ? '#fecaca' : '#fed7aa'}`
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            <FiAlertTriangle style={{ marginRight: 6, verticalAlign: 'middle' }} />
                            {item.itemName}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                            {parseFloat(item.quantity)} / {parseFloat(item.minStock)} {item.unit}
                          </span>
                        </div>
                        <div className="stock-bar" style={{ width: '100%' }}>
                          <div 
                            className={`stock-bar-fill ${percentage <= 30 ? 'danger' : percentage <= 70 ? 'warning' : 'good'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: 40 }}>
                  <p>✅ Semua stok aman!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
