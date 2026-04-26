// ============================================================
// Login Page - Halaman autentikasi user
// Form login dengan email dan password
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated, loading } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  // Jika sudah login, redirect ke dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  // Handler form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      addToast('Login berhasil! Selamat datang.', 'success');
      router.push('/dashboard');
    } else {
      setError(result.message);
      addToast(result.message, 'error');
    }

    setIsLoading(false);
  };

  // Fungsi untuk mengisi form dengan akun demo
  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo & Branding */}
        <div className="login-logo">
          <span className="login-logo-icon">☕</span>
          <h1>Cafe Nusantara</h1>
          <p>Sistem Manajemen Cafe</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 20 }}>
            <span>❌</span> {error}
          </div>
        )}

        {/* Form Login */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        {/* Info Akun Demo */}
        <div style={{ marginTop: 24, padding: '16px', background: '#fdf8f3', borderRadius: 'var(--radius-md)', border: '1px solid #f2d9b0' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#82440', marginBottom: 8 }}>
            🔑 Akun Demo:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              type="button"
              onClick={() => fillDemo('admin@cafenusantara.com', 'admin123')}
              style={{ 
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                fontSize: '0.75rem', color: '#a0541e', padding: '4px 0',
                textDecoration: 'underline', fontFamily: 'var(--font-sans)'
              }}
            >
              Admin: admin@cafenusantara.com / admin123
            </button>
            <button
              type="button"
              onClick={() => fillDemo('budi@cafenusantara.com', 'kasir123')}
              style={{ 
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                fontSize: '0.75rem', color: '#a0541e', padding: '4px 0',
                textDecoration: 'underline', fontFamily: 'var(--font-sans)'
              }}
            >
              Kasir: budi@cafenusantara.com / kasir123
            </button>
          </div>
        </div>

        {/* Setup Note */}
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <p style={{ fontSize: '0.6875rem', color: '#a8a29e' }}>
            Pertama kali? Kunjungi <a href="/api/seed" target="_blank" style={{ color: '#a0541e' }}>/api/seed</a> untuk setup database.
          </p>
        </div>
      </div>
    </div>
  );
}
