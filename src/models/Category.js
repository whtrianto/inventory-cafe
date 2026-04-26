// ============================================================
// Model Category - Kategori menu cafe
// Contoh: Kopi, Teh, Makanan, Snack, dll.
// ============================================================

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Nama kategori tidak boleh kosong' }
    }
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '☕'
  }
}, {
  tableName: 'categories',
  timestamps: true
});

export default Category;
