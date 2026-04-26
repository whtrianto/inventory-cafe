// ============================================================
// Sidebar Component - Navigasi utama aplikasi
// Menampilkan logo, menu navigasi, dan info user
// ============================================================

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiHome, FiCoffee, FiShoppingCart, FiPackage, FiBarChart2, FiUsers, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Daftar menu navigasi
  const mainNav = [
    { href: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { href: '/orders', icon: <FiShoppingCart />, label: 'Pesanan Baru' },
    { href: '/order-history', icon: <FiBarChart2 />, label: 'Riwayat Pesanan' },
  ];

  const manageNav = [
    { href: '/menu', icon: <FiCoffee />, label: 'Kelola Menu' },
    { href: '/inventory', icon: <FiPackage />, label: 'Inventori Stok' },
  ];

  // Mendapatkan inisial nama user untuk avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* Tombol toggle untuk mobile */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(true)}
        style={{ position: 'fixed', top: 16, left: 16, zIndex: 98 }}
      >
        <FiMenu />
      </button>

      {/* Overlay hitam saat sidebar terbuka di mobile */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Brand / Logo */}
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">☕</span>
          <div className="sidebar-brand-text">
            <h2>Cafe Nusantara</h2>
            <p>Management System</p>
          </div>
          {/* Tutup sidebar di mobile */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(false)}
            style={{ marginLeft: 'auto', display: mobileOpen ? 'flex' : 'none', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <FiX />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="sidebar-nav">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {getInitials(user?.name)}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{user?.role || 'kasir'}</div>
            </div>
          </div>
          <div className="nav-section-title">Menu Utama</div>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {/* Menu manajemen (hanya untuk admin) */}
          {isAdmin && (
            <>
              <div className="nav-section-title">Manajemen</div>
              {manageNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="nav-link-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Footer: Info User & Logout */}
        <div className="sidebar-footer">

          <button className="nav-link" onClick={logout} style={{ color: '#fca5a5', justifyContent: 'center' }}>
            <span className="nav-link-icon"><FiLogOut /></span>
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
