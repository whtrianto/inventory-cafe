// ============================================================
// Root Layout - Layout utama aplikasi Next.js
// Membungkus seluruh halaman dengan Provider yang dibutuhkan:
// - AuthProvider (Context API untuk autentikasi)
// - ReduxProvider (Redux Toolkit untuk state management)
// - ToastProvider (Notifikasi global)
// ============================================================

import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import ReduxProvider from '@/store/ReduxProvider';
import { ToastProvider } from '@/components/Toast';

// Metadata SEO untuk aplikasi
export const metadata = {
  title: 'Cafe Nusantara - Management System',
  description: 'Sistem manajemen cafe modern untuk mengelola pesanan, menu, dan inventori dengan efisien.',
  keywords: 'cafe, management, pos, order, inventory, coffee shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* AuthProvider: Context API untuk state autentikasi */}
        <AuthProvider>
          {/* ReduxProvider: Redux Toolkit untuk state global (order & inventory) */}
          <ReduxProvider>
            {/* ToastProvider: Sistem notifikasi popup */}
            <ToastProvider>
              {children}
            </ToastProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
