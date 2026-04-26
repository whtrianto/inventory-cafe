// ============================================================
// API Route: /api/orders/[id]
// GET - Mengambil detail pesanan
// PUT - Mengupdate status pesanan
// ============================================================

import { NextResponse } from 'next/server';
import { Order, OrderItem, MenuItem, User, Category, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';

// GET /api/orders/[id]
export async function GET(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{
            model: MenuItem,
            as: 'menuItem',
            include: [{ model: Category, as: 'category' }]
          }]
        },
        { model: User, as: 'cashier', attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!order) {
      return NextResponse.json({ message: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ data: order });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data pesanan' }, { status: 500 });
  }
}

// PUT /api/orders/[id]
export async function PUT(request, { params }) {
  try {
    await syncDatabase();
    const { id } = await params;

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return NextResponse.json({ message: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    const body = await request.json();
    const { status, paymentStatus, paymentMethod } = body;

    // Update field yang diberikan
    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (paymentMethod) order.paymentMethod = paymentMethod;

    await order.save();

    const updated = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: MenuItem, as: 'menuItem' }]
        },
        { model: User, as: 'cashier', attributes: ['id', 'name'] }
      ]
    });

    return NextResponse.json({ message: 'Pesanan berhasil diupdate', data: updated });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengupdate pesanan' }, { status: 500 });
  }
}
