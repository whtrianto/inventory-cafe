// ============================================================
// AuthContext - Context API untuk State Management Autentikasi
// Mengelola state user, login, logout, dan proteksi halaman
// ============================================================

'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Membuat context untuk autentikasi
const AuthContext = createContext(null);

// Provider component yang membungkus seluruh aplikasi
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);          // Data user yang sedang login
  const [token, setToken] = useState(null);         // JWT token
  const [loading, setLoading] = useState(true);     // Loading state saat cek auth
  const router = useRouter();

  // Cek token di localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const savedToken = localStorage.getItem('cafe_token');
    const savedUser = localStorage.getItem('cafe_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fungsi Login - mengirim kredensial ke API dan menyimpan token
  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message };
      }

      // Simpan token dan data user di state dan localStorage
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('cafe_token', data.token);
      localStorage.setItem('cafe_user', JSON.stringify(data.user));

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Gagal terhubung ke server' };
    }
  }, []);

  // Fungsi Logout - hapus token dan redirect ke login
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('cafe_token');
    localStorage.removeItem('cafe_user');
    router.push('/login');
  }, [router]);

  // Fungsi Register - mendaftarkan user baru
  const register = useCallback(async (name, email, password, role) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: 'Gagal terhubung ke server' };
    }
  }, [token]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook untuk mengakses AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}

export default AuthContext;
