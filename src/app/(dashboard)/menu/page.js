// ============================================================
// Menu Management Page - Kelola daftar menu cafe
// CRUD operations: tambah, edit, hapus, toggle ketersediaan
// Hanya bisa diakses oleh admin
// ============================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/Toast';
import Modal from '@/components/Modal';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye, FiEyeOff } from 'react-icons/fi';

export default function MenuPage() {
  const { token, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', categoryId: '', isAvailable: true
  });

  // Format Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // Fetch menu items
  const fetchMenu = useCallback(async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/categories')
      ]);
      const menuData = await menuRes.json();
      const catData = await catRes.json();
      setMenuItems(menuData.data || []);
      setCategories(catData.data || []);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // Filter menu
  const filteredMenu = menuItems.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.categoryId === parseInt(selectedCategory);
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Buka modal tambah
  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', price: '', categoryId: categories[0]?.id || '', isAvailable: true });
    setShowModal(true);
  };

  // Buka modal edit
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price,
      categoryId: item.categoryId,
      isAvailable: item.isAvailable
    });
    setShowModal(true);
  };

  // Submit form (tambah/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.categoryId) {
      addToast('Nama, harga, dan kategori wajib diisi', 'warning');
      return;
    }

    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      const data = await res.json();

      if (res.ok) {
        addToast(editingItem ? 'Menu berhasil diupdate!' : 'Menu baru berhasil ditambahkan!', 'success');
        setShowModal(false);
        fetchMenu();
      } else {
        addToast(data.message || 'Gagal menyimpan menu', 'error');
      }
    } catch (error) {
      addToast('Gagal terhubung ke server', 'error');
    }
  };

  // Toggle ketersediaan menu
  const toggleAvailability = async (item) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isAvailable: !item.isAvailable })
      });

      if (res.ok) {
        addToast(`${item.name} ${!item.isAvailable ? 'tersedia' : 'tidak tersedia'}`, 'success');
        fetchMenu();
      }
    } catch (error) {
      addToast('Gagal mengubah ketersediaan', 'error');
    }
  };

  // Hapus menu
  const deleteItem = async (item) => {
    if (!confirm(`Yakin ingin menghapus "${item.name}"?`)) return;

    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        addToast(`"${item.name}" berhasil dihapus`, 'success');
        fetchMenu();
      }
    } catch (error) {
      addToast('Gagal menghapus menu', 'error');
    }
  };

  // Mendapatkan emoji kategori
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || '☕';
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Kelola Menu</h1>
          <p>{menuItems.length} item menu tersedia</p>
        </div>
        <div className="page-header-right">
          {isAdmin && (
            <button className="btn btn-primary" onClick={openAddModal} id="add-menu-btn">
              <FiPlus /> Tambah Menu
            </button>
          )}
        </div>
      </div>

      <div className="page-body">
        {/* Filter Bar */}
        <div className="filter-bar mb-24">
          <div className="search-bar" style={{ flex: 1, maxWidth: 300 }}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Cari menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name} ({cat.menuCount})
              </option>
            ))}
          </select>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : (
          <div className="menu-manage-grid">
            {filteredMenu.map(item => (
              <div key={item.id} className="menu-manage-card">
                <div className="menu-manage-image">
                  <span>{getCategoryIcon(item.categoryId)}</span>
                  <div className="menu-manage-badge">
                    <span className={`badge ${item.isAvailable ? 'badge-ok' : 'badge-cancelled'}`}>
                      {item.isAvailable ? 'Tersedia' : 'Habis'}
                    </span>
                  </div>
                </div>
                <div className="menu-manage-body">
                  <div className="menu-manage-name">{item.name}</div>
                  <div className="menu-manage-desc">{item.description}</div>
                  <div className="menu-manage-footer">
                    <span className="menu-manage-price">{formatRupiah(item.price)}</span>
                    {isAdmin && (
                      <div className="menu-manage-actions">
                        <button className="btn btn-ghost btn-icon" onClick={() => toggleAvailability(item)} title={item.isAvailable ? 'Set Habis' : 'Set Tersedia'}>
                          {item.isAvailable ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                        <button className="btn btn-ghost btn-icon" onClick={() => openEditModal(item)} title="Edit">
                          <FiEdit2 size={16} />
                        </button>
                        <button className="btn btn-ghost btn-icon" onClick={() => deleteItem(item)} title="Hapus" style={{ color: 'var(--error)' }}>
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== Modal Tambah/Edit Menu ========== */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Nama Menu *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Cappuccino"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi</label>
            <textarea
              className="form-textarea"
              placeholder="Deskripsi singkat menu"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Harga (Rp) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="28000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kategori *</label>
              <select
                className="form-select"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: 'var(--primary-600)' }}
              />
              <span className="form-label" style={{ marginBottom: 0 }}>Menu tersedia untuk dijual</span>
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
}
