// ============================================================
// Model MenuItem - Item menu cafe
// Menyimpan data produk/menu yang dijual
// ============================================================

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nama menu tidak boleh kosong' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'Harga tidak boleh negatif' }
    }
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: '/images/default-menu.jpg'
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'menu_items',
  timestamps: true
});

export default MenuItem;
