// ============================================================
// API Route: /api/menu
// GET  - Mengambil daftar semua menu (dengan filter kategori)
// POST - Menambahkan menu baru (admin only)
// ============================================================

import { NextResponse } from 'next/server';
import { MenuItem, Category, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

// GET /api/menu - Ambil semua menu
export async function GET(request) {
  try {
    await syncDatabase();

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const available = searchParams.get('available');

    // Filter berdasarkan parameter
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (available !== null && available !== undefined) where.isAvailable = available === 'true';

    const menuItems = await MenuItem.findAll({
      where,
      include: [{ model: Category, as: 'category' }],
      order: [['categoryId', 'ASC'], ['name', 'ASC']]
    });

    return NextResponse.json({ data: menuItems });
  } catch (error) {
    console.error('Get menu error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data menu' },
      { status: 500 }
    );
  }
}

// POST /api/menu - Tambah menu baru
export async function POST(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa menambahkan menu' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, price, image, categoryId, isAvailable } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { message: 'Nama, harga, dan kategori harus diisi' },
        { status: 400 }
      );
    }

    const newItem = await MenuItem.create({
      name,
      description,
      price,
      image: image || '/images/default-menu.jpg',
      categoryId,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    const itemWithCategory = await MenuItem.findByPk(newItem.id, {
      include: [{ model: Category, as: 'category' }]
    });

    return NextResponse.json({
      message: 'Menu berhasil ditambahkan',
      data: itemWithCategory
    }, { status: 201 });

  } catch (error) {
    console.error('Create menu error:', error);
    return NextResponse.json(
      { message: 'Gagal menambahkan menu' },
      { status: 500 }
    );
  }
}
