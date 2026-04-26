// ============================================================
// API Route: POST /api/auth/register
// Endpoint untuk mendaftarkan user baru (hanya admin)
// ============================================================

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await syncDatabase();

    // Verifikasi token - hanya admin yang bisa register user baru
    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa mendaftarkan user baru' },
        { status: 403 }
      );
    }

    const { name, email, password, role } = await request.json();

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Nama, email, dan password harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'kasir'
    });

    return NextResponse.json({
      message: 'User berhasil didaftarkan',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
