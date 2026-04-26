// ============================================================
// Toast Component - Notifikasi popup
// Menampilkan pesan sukses, error, atau warning
// ============================================================

'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';

// Context untuk toast notification
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Menambahkan toast baru
  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-remove setelah durasi tertentu
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  // Menghapus toast tertentu
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Container toast di pojok kanan atas */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>
              {toast.type === 'success' && '✅'}
              {toast.type === 'error' && '❌'}
              {toast.type === 'warning' && '⚠️'}
            </span>
            <p>{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#666', marginLeft: 'auto' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook untuk menggunakan toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast harus digunakan di dalam ToastProvider');
  }
  return context;
}
