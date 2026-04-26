// ============================================================
// Model Order - Pesanan pelanggan
// Menyimpan data transaksi/pesanan
// ============================================================

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: 'Walk-in Customer'
  },
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  totalAmount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('pending', 'preparing', 'ready', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'debit', 'qris', 'transfer'),
    defaultValue: 'cash'
  },
  paymentStatus: {
    type: DataTypes.ENUM('unpaid', 'paid'),
    defaultValue: 'unpaid'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'orders',
  timestamps: true
});

export default Order;
