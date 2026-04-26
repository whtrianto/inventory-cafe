// ============================================================
// API Route: /api/inventory/[id]
// PUT    - Mengupdate item inventory
// DELETE - Menghapus item inventory (admin only)
// ============================================================

import { NextResponse } from 'next/server';
import { Inventory, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

// PUT /api/inventory/[id]
export async function PUT(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const item = await Inventory.findByPk(id);
    if (!item) {
      return NextResponse.json({ message: 'Item tidak ditemukan' }, { status: 404 });
    }

    const body = await request.json();
    
    // Jika quantity berubah, update lastRestocked
    if (body.quantity !== undefined && parseFloat(body.quantity) > parseFloat(item.quantity)) {
      body.lastRestocked = new Date();
    }

    await item.update(body);
    return NextResponse.json({ message: 'Item berhasil diupdate', data: item });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengupdate item' }, { status: 500 });
  }
}

// DELETE /api/inventory/[id]
export async function DELETE(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa menghapus item' },
        { status: 403 }
      );
    }

    const item = await Inventory.findByPk(id);
    if (!item) {
      return NextResponse.json({ message: 'Item tidak ditemukan' }, { status: 404 });
    }

    await item.destroy();
    return NextResponse.json({ message: 'Item berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus item' }, { status: 500 });
  }
}
