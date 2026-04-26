// ============================================================
// API Route: /api/inventory
// GET  - Mengambil daftar inventory/stok bahan
// POST - Menambahkan item inventory baru (admin only)
// ============================================================

import { NextResponse } from 'next/server';
import { Inventory, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

// GET /api/inventory
export async function GET(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const items = await Inventory.findAll({
      order: [['itemName', 'ASC']]
    });

    return NextResponse.json({ data: items });
  } catch (error) {
    console.error('Get inventory error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data inventory' },
      { status: 500 }
    );
  }
}

// POST /api/inventory
export async function POST(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa menambahkan inventory' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { itemName, quantity, unit, minStock, costPerUnit, supplier } = body;

    if (!itemName || quantity === undefined || !unit) {
      return NextResponse.json(
        { message: 'Nama, jumlah, dan satuan harus diisi' },
        { status: 400 }
      );
    }

    const item = await Inventory.create({
      itemName,
      quantity,
      unit,
      minStock: minStock || 10,
      costPerUnit: costPerUnit || 0,
      supplier: supplier || null,
      lastRestocked: new Date()
    });

    return NextResponse.json({
      message: 'Item inventory berhasil ditambahkan',
      data: item
    }, { status: 201 });

  } catch (error) {
    console.error('Create inventory error:', error);
    return NextResponse.json(
      { message: 'Gagal menambahkan inventory' },
      { status: 500 }
    );
  }
}
