// ============================================================
// API Route: /api/seed
// Endpoint untuk menjalankan seeder database (GET)
// Hanya digunakan untuk setup awal
// ============================================================

import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    const result = await seedDatabase();
    
    if (result) {
      return NextResponse.json({
        message: 'Database berhasil di-seed! Gunakan akun berikut untuk login:',
        accounts: [
          { email: 'admin@cafenusantara.com', password: 'admin123', role: 'admin' },
          { email: 'budi@cafenusantara.com', password: 'kasir123', role: 'kasir' },
          { email: 'sari@cafenusantara.com', password: 'kasir123', role: 'kasir' }
        ]
      });
    } else {
      return NextResponse.json(
        { message: 'Database sudah memiliki data atau terjadi kesalahan' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { message: 'Gagal seed database: ' + error.message },
      { status: 500 }
    );
  }
}
