// ============================================================
// API Route: POST /api/auth/login
// Endpoint untuk autentikasi user (login)
// Menerima email & password, mengembalikan JWT token
// ============================================================

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User, syncDatabase } from '@/models';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    // Sinkronisasi database
    await syncDatabase();

    const { email, password } = await request.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Cek apakah user aktif
    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Akun Anda telah dinonaktifkan' },
        { status: 403 }
      );
    }

    // Verifikasi password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    return NextResponse.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
