// ============================================================
// Dashboard Layout - Layout untuk halaman yang membutuhkan autentikasi
// Menyediakan Sidebar dan area konten utama
// Melakukan pengecekan autentikasi sebelum render
// ============================================================

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect ke login jika belum autentikasi
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Tampilkan loading saat mengecek autentikasi
  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  // Tidak render jika belum autentikasi
  if (!isAuthenticated) return null;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
