// ============================================================
// API Route: /api/dashboard
// GET - Mengambil data statistik untuk dashboard
// Termasuk: total penjualan, pesanan hari ini, menu populer, dll.
// ============================================================

import { NextResponse } from 'next/server';
import { Order, OrderItem, MenuItem, Category, Inventory, User, syncDatabase } from '@/models';
import { verifyToken } from '@/lib/auth';
import { Op, fn, col, literal } from 'sequelize';

export async function GET(request) {
  try {
    await syncDatabase();

    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    // Tanggal hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1. Total pesanan hari ini
    const todayOrders = await Order.count({
      where: {
        createdAt: { [Op.between]: [today, tomorrow] }
      }
    });

    // 2. Total pendapatan hari ini
    const todayRevenue = await Order.sum('totalAmount', {
      where: {
        createdAt: { [Op.between]: [today, tomorrow] },
        paymentStatus: 'paid'
      }
    }) || 0;

    // 3. Total pendapatan bulan ini
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthRevenue = await Order.sum('totalAmount', {
      where: {
        createdAt: { [Op.gte]: monthStart },
        paymentStatus: 'paid'
      }
    }) || 0;

    // 4. Pesanan yang sedang berlangsung (pending/preparing)
    const activeOrders = await Order.count({
      where: {
        status: { [Op.in]: ['pending', 'preparing'] }
      }
    });

    // 5. Menu items count
    const totalMenu = await MenuItem.count();

    // 6. Item dengan stok rendah
    const lowStockItems = await Inventory.findAll({
      where: literal('`quantity` <= `minStock`'),
      order: [['quantity', 'ASC']],
      limit: 5
    });

    // 7. Pesanan terbaru
    const recentOrders = await Order.findAll({
      include: [
        { model: User, as: 'cashier', attributes: ['name'] },
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: MenuItem, as: 'menuItem', attributes: ['name'] }]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // 8. Total staff
    const totalStaff = await User.count({ where: { isActive: true } });

    return NextResponse.json({
      data: {
        todayOrders,
        todayRevenue,
        monthRevenue,
        activeOrders,
        totalMenu,
        totalStaff,
        lowStockItems,
        recentOrders
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data dashboard' },
      { status: 500 }
    );
  }
}
