// ============================================================
// API Route: /api/orders
// GET  - Mengambil daftar pesanan (dengan filter status & tanggal)
// POST - Membuat pesanan baru
// ============================================================

import { NextResponse } from 'next/server';
import { Order, OrderItem, MenuItem, User, Category, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';
import { Op } from 'sequelize';

// GET /api/orders
export async function GET(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const limit = parseInt(searchParams.get('limit')) || 50;

    const where = {};
    if (status) where.status = status;
    
    // Filter berdasarkan tanggal
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt = { [Op.between]: [startDate, endDate] };
    }

    const orders = await Order.findAll({
      where,
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
      ],
      order: [['createdAt', 'DESC']],
      limit
    });

    return NextResponse.json({ data: orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data pesanan' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Buat pesanan baru
export async function POST(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { customerName, tableNumber, items, paymentMethod, notes } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: 'Pesanan harus memiliki setidaknya 1 item' },
        { status: 400 }
      );
    }

    // Generate nomor order: ORD-YYYYMMDD-XXX
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const orderCount = await Order.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(today.setHours(0, 0, 0, 0))
        }
      }
    });
    const orderNumber = `ORD-${dateStr}-${String(orderCount + 1).padStart(3, '0')}`;

    // Hitung total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.menuItemId);
      if (!menuItem) {
        return NextResponse.json(
          { message: `Menu item dengan ID ${item.menuItemId} tidak ditemukan` },
          { status: 404 }
        );
      }

      const subtotal = parseFloat(menuItem.price) * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice: menuItem.price,
        subtotal,
        notes: item.notes || null
      });
    }

    // Buat order
    const order = await Order.create({
      orderNumber,
      customerName: customerName || 'Walk-in Customer',
      tableNumber: tableNumber || null,
      totalAmount,
      status: 'pending',
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: 'unpaid',
      notes: notes || null,
      userId: auth.user.id
    });

    // Buat order items
    for (const item of orderItems) {
      await OrderItem.create({
        ...item,
        orderId: order.id
      });
    }

    // Ambil order lengkap dengan relasi
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: MenuItem, as: 'menuItem' }]
        },
        { model: User, as: 'cashier', attributes: ['id', 'name'] }
      ]
    });

    return NextResponse.json({
      message: 'Pesanan berhasil dibuat',
      data: fullOrder
    }, { status: 201 });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { message: 'Gagal membuat pesanan' },
      { status: 500 }
    );
  }
}
