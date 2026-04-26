// ============================================================
// API Route: /api/menu/[id]
// GET    - Mengambil detail menu berdasarkan ID
// PUT    - Mengupdate menu (admin only)
// DELETE - Menghapus menu (admin only)
// ============================================================

import { NextResponse } from 'next/server';
import { MenuItem, Category, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

// GET /api/menu/[id]
export async function GET(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const menuItem = await MenuItem.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });

    if (!menuItem) {
      return NextResponse.json({ message: 'Menu tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ data: menuItem });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data menu' }, { status: 500 });
  }
}

// PUT /api/menu/[id]
export async function PUT(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json({ message: 'Hanya admin yang bisa mengupdate menu' }, { status: 403 });
    }

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return NextResponse.json({ message: 'Menu tidak ditemukan' }, { status: 404 });
    }

    const body = await request.json();
    await menuItem.update(body);

    const updated = await MenuItem.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });

    return NextResponse.json({ message: 'Menu berhasil diupdate', data: updated });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengupdate menu' }, { status: 500 });
  }
}

// DELETE /api/menu/[id]
export async function DELETE(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json({ message: 'Hanya admin yang bisa menghapus menu' }, { status: 403 });
    }

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return NextResponse.json({ message: 'Menu tidak ditemukan' }, { status: 404 });
    }

    await menuItem.destroy();
    return NextResponse.json({ message: 'Menu berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus menu' }, { status: 500 });
  }
}
