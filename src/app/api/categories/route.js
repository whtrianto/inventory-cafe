// ============================================================
// API Route: /api/categories
// GET  - Mengambil daftar semua kategori
// POST - Menambahkan kategori baru (admin only)
// ============================================================

import { NextResponse } from 'next/server';
import { Category, MenuItem, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    await syncDatabase();

    const categories = await Category.findAll({
      include: [{
        model: MenuItem,
        as: 'menuItems',
        attributes: ['id']
      }],
      order: [['name', 'ASC']]
    });

    // Tambahkan count menu items ke setiap kategori
    const result = categories.map(cat => ({
      ...cat.toJSON(),
      menuCount: cat.menuItems ? cat.menuItems.length : 0
    }));

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data kategori' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa menambahkan kategori' },
        { status: 403 }
      );
    }

    const { name, description, icon } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'Nama kategori harus diisi' }, { status: 400 });
    }

    const category = await Category.create({ name, description, icon });
    return NextResponse.json({ message: 'Kategori berhasil ditambahkan', data: category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menambahkan kategori' }, { status: 500 });
  }
}
