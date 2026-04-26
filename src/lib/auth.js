// ============================================================
// Middleware Auth - Verifikasi JWT Token
// Digunakan untuk melindungi API route yang membutuhkan autentikasi
// ============================================================

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'cafe-nusantara-secret-key-2024';

// Fungsi untuk memverifikasi token dari header Authorization
export function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Token tidak ditemukan', status: 401 };
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    return { user: decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token telah kadaluarsa', status: 401 };
    }
    return { error: 'Token tidak valid', status: 403 };
  }
}

// Fungsi untuk membuat token baru
export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export { JWT_SECRET };
