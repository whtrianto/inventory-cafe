// ============================================================
// Inventory Page - Manajemen stok bahan baku cafe
// Menggunakan Redux Toolkit untuk state management stok
// CRUD operations: tambah, edit, hapus, dan restok
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/Toast';
import Modal from '@/components/Modal';
import {
  fetchInventory,
  selectFilteredInventory,
  setSearchTerm
} from '@/store/inventorySlice';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiAlertTriangle, FiRefreshCw, FiPackage } from 'react-icons/fi';

export default function InventoryPage() {
  const dispatch = useDispatch();
  const { token, isAdmin } = useAuth();
  const { addToast } = useToast();

  // Redux state
  const filteredItems = useSelector(selectFilteredInventory);
  const { loading, lowStockItems, searchTerm, error } = useSelector(state => state.inventory);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '', quantity: '', unit: 'pcs', minStock: 10, costPerUnit: '', supplier: ''
  });

  // Format Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // Fetch inventory data menggunakan Redux Thunk
  useEffect(() => {
    if (token) {
      dispatch(fetchInventory(token));
    }
  }, [token, dispatch]);

  // Open add modal
  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ itemName: '', quantity: '', unit: 'pcs', minStock: 10, costPerUnit: '', supplier: '' });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      itemName: item.itemName,
      quantity: item.quantity,
      unit: item.unit,
      minStock: item.minStock,
      costPerUnit: item.costPerUnit || '',
      supplier: item.supplier || ''
    });
    setShowModal(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.itemName || formData.quantity === '' || !formData.unit) {
      addToast('Nama, jumlah, dan satuan wajib diisi', 'warning');
      return;
    }

    try {
      const url = editingItem ? `/api/inventory/${editingItem.id}` : '/api/inventory';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseFloat(formData.quantity),
          minStock: parseFloat(formData.minStock),
          costPerUnit: formData.costPerUnit ? parseFloat(formData.costPerUnit) : 0
        })
      });

      const data = await res.json();

      if (res.ok) {
        addToast(editingItem ? 'Item berhasil diupdate!' : 'Item berhasil ditambahkan!', 'success');
        setShowModal(false);
        dispatch(fetchInventory(token));
      } else {
        addToast(data.message || 'Gagal menyimpan', 'error');
      }
    } catch (error) {
      addToast('Gagal terhubung ke server', 'error');
    }
  };

  // Delete item
  const deleteItem = async (item) => {
    if (!confirm(`Yakin ingin menghapus "${item.itemName}"?`)) return;

    try {
      const res = await fetch(`/api/inventory/${item.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        addToast(`"${item.itemName}" berhasil dihapus`, 'success');
        dispatch(fetchInventory(token));
      }
    } catch (error) {
      addToast('Gagal menghapus item', 'error');
    }
  };

  // Hitung persentase stok
  const getStockPercentage = (quantity, minStock) => {
    const q = parseFloat(quantity);
    const m = parseFloat(minStock);
    if (m === 0) return 100;
    return Math.min((q / m) * 100, 100);
  };

  // Status stok
  const getStockStatus = (quantity, minStock) => {
    const q = parseFloat(quantity);
    const m = parseFloat(minStock);
    if (q <= m * 0.3) return 'danger';
    if (q <= m) return 'warning';
    return 'good';
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Inventori Stok</h1>
          <p>
            Kelola stok bahan baku cafe
            {lowStockItems.length > 0 && (
              <span style={{ color: 'var(--error)', fontWeight: 600, marginLeft: 8 }}>
                <FiAlertTriangle style={{ verticalAlign: 'middle' }} /> {lowStockItems.length} item stok rendah
              </span>
            )}
          </p>
        </div>
        <div className="page-header-right">
          <button className="btn btn-secondary btn-sm" onClick={() => dispatch(fetchInventory(token))}>
            <FiRefreshCw /> Refresh
          </button>
          {isAdmin && (
            <button className="btn btn-primary" onClick={openAddModal} id="add-inventory-btn">
              <FiPlus /> Tambah Item
            </button>
          )}
        </div>
      </div>

      <div className="page-body">
        {/* Search */}
        <div className="filter-bar mb-24">
          <div className="search-bar" style={{ flex: 1, maxWidth: 400 }}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Cari bahan baku atau supplier..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
          <span className="text-sm text-muted">
            <FiPackage style={{ verticalAlign: 'middle' }} /> {filteredItems.length} item
          </span>
        </div>

        {/* Inventory Table */}
        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : (
          <div className="card">
            <div className="card-body-flush">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nama Bahan</th>
                      <th>Stok</th>
                      <th>Min</th>
                      <th>Level</th>
                      <th>Status</th>
                      <th>Harga/Unit</th>
                      <th>Supplier</th>
                      <th>Terakhir Restock</th>
                      {isAdmin && <th>Aksi</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => {
                        const percentage = getStockPercentage(item.quantity, item.minStock);
                        const status = getStockStatus(item.quantity, item.minStock);

                        return (
                          <tr key={item.id}>
                            <td>
                              <span style={{ fontWeight: 600 }}>{item.itemName}</span>
                            </td>
                            <td>
                              <span style={{ fontWeight: 700, color: status === 'danger' ? 'var(--error)' : status === 'warning' ? 'var(--warning)' : 'var(--neutral-800)' }}>
                                {parseFloat(item.quantity)}
                              </span>
                              {' '}
                              <span className="text-muted text-xs">{item.unit}</span>
                            </td>
                            <td className="text-muted">{parseFloat(item.minStock)} {item.unit}</td>
                            <td>
                              <div className="stock-bar">
                                <div
                                  className={`stock-bar-fill ${status}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </td>
                            <td>
                              <span className={`badge badge-${status === 'danger' ? 'low-stock' : status === 'warning' ? 'pending' : 'ok'}`}>
                                {status === 'danger' ? '⚠️ Kritis' : status === 'warning' ? '⬇️ Rendah' : '✅ Aman'}
                              </span>
                            </td>
                            <td className="text-muted">
                              {item.costPerUnit ? formatRupiah(item.costPerUnit) : '-'}
                            </td>
                            <td className="text-muted text-sm">{item.supplier || '-'}</td>
                            <td className="text-muted text-xs">
                              {item.lastRestocked ? new Date(item.lastRestocked).toLocaleDateString('id-ID') : '-'}
                            </td>
                            {isAdmin && (
                              <td>
                                <div style={{ display: 'flex', gap: 4 }}>
                                  <button className="btn btn-ghost btn-icon" onClick={() => openEditModal(item)} title="Edit">
                                    <FiEdit2 size={15} />
                                  </button>
                                  <button className="btn btn-ghost btn-icon" onClick={() => deleteItem(item)} title="Hapus" style={{ color: 'var(--error)' }}>
                                    <FiTrash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={isAdmin ? 9 : 8} className="text-center text-muted" style={{ padding: 60 }}>
                          {searchTerm ? 'Tidak ada item yang cocok' : 'Belum ada data inventory'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== Modal Tambah/Edit Inventory ========== */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? 'Edit Item Inventory' : 'Tambah Item Baru'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editingItem ? 'Simpan Perubahan' : 'Tambah Item'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Nama Bahan *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Biji Kopi Arabica"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Jumlah *</label>
              <input
                type="number"
                className="form-input"
                placeholder="100"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Satuan *</label>
              <select
                className="form-select"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="pcs">pcs</option>
                <option value="gram">gram</option>
                <option value="kg">kg</option>
                <option value="liter">liter</option>
                <option value="ml">ml</option>
                <option value="botol">botol</option>
                <option value="kaleng">kaleng</option>
                <option value="pack">pack</option>
                <option value="butir">butir</option>
                <option value="lembar">lembar</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Stok Minimum</label>
              <input
                type="number"
                className="form-input"
                placeholder="10"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Harga per Unit (Rp)</label>
              <input
                type="number"
                className="form-input"
                placeholder="15000"
                value={formData.costPerUnit}
                onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Supplier</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nama supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
