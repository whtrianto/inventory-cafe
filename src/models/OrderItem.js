// ============================================================
// Model OrderItem - Detail item dalam pesanan
// Junction table antara Order dan MenuItem
// ============================================================

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'menu_items',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: { args: [1], msg: 'Jumlah minimal 1' }
    }
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  notes: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'order_items',
  timestamps: true
});

export default OrderItem;
