// ============================================================
// Model Inventory - Stok bahan baku cafe
// Mengelola persediaan bahan dengan alert stok minimum
// ============================================================

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nama bahan tidak boleh kosong' }
    }
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pcs',
    validate: {
      notEmpty: { msg: 'Satuan tidak boleh kosong' }
    }
  },
  minStock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 10
  },
  costPerUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  supplier: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  lastRestocked: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'inventory',
  timestamps: true
});

export default Inventory;
