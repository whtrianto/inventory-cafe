// ============================================================
// Seeder Database - Data awal untuk testing
// Membuat data dummy kategori, menu, inventory, dan user admin
// ============================================================

import bcrypt from 'bcryptjs';
import { User, Category, MenuItem, Inventory, syncDatabase } from '@/models';

export async function seedDatabase() {
  try {
    // Sinkronisasi database terlebih dahulu
    const synced = await syncDatabase();
    if (!synced) return false;

    // Cek apakah sudah ada data (hindari duplikasi)
    const userCount = await User.count();
    if (userCount > 0) {
      console.log('ℹ️ Database sudah memiliki data, skip seeding.');
      return true;
    }

    console.log('🌱 Memulai seeding database...');

    // ========== Buat User Admin & Kasir ==========
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const kasirPassword = await bcrypt.hash('kasir123', 10);

    await User.bulkCreate([
      { name: 'Admin Cafe', email: 'admin@cafenusantara.com', password: hashedPassword, role: 'admin' },
      { name: 'Budi Kasir', email: 'budi@cafenusantara.com', password: kasirPassword, role: 'kasir' },
      { name: 'Sari Kasir', email: 'sari@cafenusantara.com', password: kasirPassword, role: 'kasir' }
    ]);

    // ========== Buat Kategori ==========
    const categories = await Category.bulkCreate([
      { name: 'Kopi', description: 'Berbagai jenis kopi pilihan', icon: '☕' },
      { name: 'Non-Kopi', description: 'Minuman non kafein', icon: '🧋' },
      { name: 'Teh', description: 'Teh premium dan herbal', icon: '🍵' },
      { name: 'Makanan', description: 'Makanan berat dan ringan', icon: '🍽️' },
      { name: 'Snack', description: 'Camilan dan dessert', icon: '🍰' },
      { name: 'Minuman Segar', description: 'Jus dan smoothie segar', icon: '🥤' }
    ]);

    // ========== Buat Menu Items ==========
    await MenuItem.bulkCreate([
      // Kopi
      { name: 'Espresso', description: 'Kopi espresso murni yang kaya rasa', price: 18000, categoryId: categories[0].id, image: '/images/menu/espresso.jpg' },
      { name: 'Americano', description: 'Espresso dengan air panas, rasa smooth', price: 22000, categoryId: categories[0].id, image: '/images/menu/americano.jpg' },
      { name: 'Cappuccino', description: 'Espresso, steamed milk, dan foam lembut', price: 28000, categoryId: categories[0].id, image: '/images/menu/cappuccino.jpg' },
      { name: 'Cafe Latte', description: 'Espresso dengan susu steamed yang creamy', price: 28000, categoryId: categories[0].id, image: '/images/menu/latte.jpg' },
      { name: 'Mocha Latte', description: 'Perpaduan espresso, coklat, dan susu', price: 32000, categoryId: categories[0].id, image: '/images/menu/mocha.jpg' },
      { name: 'Kopi Susu Nusantara', description: 'Signature kopi susu gula aren', price: 25000, categoryId: categories[0].id, image: '/images/menu/kopi-susu.jpg' },
      { name: 'Affogato', description: 'Espresso panas dituang ke atas es krim vanilla', price: 35000, categoryId: categories[0].id, image: '/images/menu/affogato.jpg' },
      
      // Non-Kopi
      { name: 'Coklat Panas', description: 'Coklat premium dengan susu hangat', price: 25000, categoryId: categories[1].id, image: '/images/menu/hot-choco.jpg' },
      { name: 'Matcha Latte', description: 'Matcha Jepang premium dengan susu', price: 30000, categoryId: categories[1].id, image: '/images/menu/matcha.jpg' },
      { name: 'Red Velvet Latte', description: 'Minuman red velvet creamy', price: 30000, categoryId: categories[1].id, image: '/images/menu/red-velvet.jpg' },
      { name: 'Taro Latte', description: 'Minuman taro yang manis dan lembut', price: 28000, categoryId: categories[1].id, image: '/images/menu/taro.jpg' },

      // Teh
      { name: 'Earl Grey', description: 'Teh hitam klasik dengan aroma bergamot', price: 20000, categoryId: categories[2].id, image: '/images/menu/earl-grey.jpg' },
      { name: 'Chamomile Tea', description: 'Teh herbal yang menenangkan', price: 22000, categoryId: categories[2].id, image: '/images/menu/chamomile.jpg' },
      { name: 'Lemon Tea', description: 'Teh segar dengan perasan lemon', price: 18000, categoryId: categories[2].id, image: '/images/menu/lemon-tea.jpg' },
      { name: 'Thai Tea', description: 'Teh khas Thailand yang manis', price: 25000, categoryId: categories[2].id, image: '/images/menu/thai-tea.jpg' },

      // Makanan
      { name: 'Nasi Goreng Cafe', description: 'Nasi goreng spesial dengan telur dan ayam', price: 35000, categoryId: categories[3].id, image: '/images/menu/nasi-goreng.jpg' },
      { name: 'Chicken Katsu Curry', description: 'Ayam katsu krispi dengan saus kari Jepang', price: 42000, categoryId: categories[3].id, image: '/images/menu/katsu.jpg' },
      { name: 'Spaghetti Aglio Olio', description: 'Pasta dengan bawang putih dan cabai', price: 38000, categoryId: categories[3].id, image: '/images/menu/pasta.jpg' },
      { name: 'Club Sandwich', description: 'Sandwich 3 lapis dengan ayam dan bacon', price: 35000, categoryId: categories[3].id, image: '/images/menu/sandwich.jpg' },
      { name: 'Rice Bowl Teriyaki', description: 'Nasi dengan ayam teriyaki dan sayuran', price: 38000, categoryId: categories[3].id, image: '/images/menu/ricebowl.jpg' },

      // Snack
      { name: 'French Fries', description: 'Kentang goreng krispi dengan saus', price: 22000, categoryId: categories[4].id, image: '/images/menu/fries.jpg' },
      { name: 'Banana Split', description: 'Pisang dengan es krim dan topping', price: 30000, categoryId: categories[4].id, image: '/images/menu/banana-split.jpg' },
      { name: 'Brownies', description: 'Brownies coklat lembut dan fudgy', price: 25000, categoryId: categories[4].id, image: '/images/menu/brownies.jpg' },
      { name: 'Roti Bakar', description: 'Roti bakar dengan selai dan keju', price: 20000, categoryId: categories[4].id, image: '/images/menu/roti-bakar.jpg' },
      { name: 'Dimsum 4pcs', description: 'Dimsum kukus isi ayam dan udang', price: 28000, categoryId: categories[4].id, image: '/images/menu/dimsum.jpg' },

      // Minuman Segar
      { name: 'Jus Alpukat', description: 'Jus alpukat segar dengan susu', price: 25000, categoryId: categories[5].id, image: '/images/menu/avocado.jpg' },
      { name: 'Mango Smoothie', description: 'Smoothie mangga segar', price: 28000, categoryId: categories[5].id, image: '/images/menu/mango.jpg' },
      { name: 'Lemon Squash', description: 'Minuman lemon segar dengan soda', price: 22000, categoryId: categories[5].id, image: '/images/menu/lemon-squash.jpg' },
    ]);

    // ========== Buat Inventory ==========
    await Inventory.bulkCreate([
      { itemName: 'Biji Kopi Arabica', quantity: 5000, unit: 'gram', minStock: 1000, costPerUnit: 150, supplier: 'PT Kopi Nusantara' },
      { itemName: 'Biji Kopi Robusta', quantity: 3000, unit: 'gram', minStock: 500, costPerUnit: 100, supplier: 'PT Kopi Nusantara' },
      { itemName: 'Susu Full Cream', quantity: 20, unit: 'liter', minStock: 5, costPerUnit: 18000, supplier: 'Toko Bahan Kue Jaya' },
      { itemName: 'Gula Pasir', quantity: 10000, unit: 'gram', minStock: 2000, costPerUnit: 15, supplier: 'Toko Sembako Makmur' },
      { itemName: 'Gula Aren', quantity: 3000, unit: 'gram', minStock: 500, costPerUnit: 50, supplier: 'Petani Lokal' },
      { itemName: 'Coklat Bubuk', quantity: 2000, unit: 'gram', minStock: 500, costPerUnit: 80, supplier: 'Toko Bahan Kue Jaya' },
      { itemName: 'Matcha Powder', quantity: 500, unit: 'gram', minStock: 100, costPerUnit: 200, supplier: 'Import Jepang Co.' },
      { itemName: 'Teh Earl Grey', quantity: 50, unit: 'pcs', minStock: 10, costPerUnit: 2000, supplier: 'Tea House Indonesia' },
      { itemName: 'Es Krim Vanilla', quantity: 5, unit: 'liter', minStock: 2, costPerUnit: 45000, supplier: 'PT Dairy Best' },
      { itemName: 'Roti Tawar', quantity: 10, unit: 'pcs', minStock: 3, costPerUnit: 15000, supplier: 'Bakery Fresh' },
      { itemName: 'Telur Ayam', quantity: 30, unit: 'butir', minStock: 10, costPerUnit: 2500, supplier: 'Toko Sembako Makmur' },
      { itemName: 'Daging Ayam', quantity: 5000, unit: 'gram', minStock: 1000, costPerUnit: 45, supplier: 'Supplier Ayam Segar' },
      { itemName: 'Kentang', quantity: 3000, unit: 'gram', minStock: 500, costPerUnit: 20, supplier: 'Pasar Induk' },
      { itemName: 'Cup Plastik 16oz', quantity: 200, unit: 'pcs', minStock: 50, costPerUnit: 800, supplier: 'Toko Plastik Jaya' },
      { itemName: 'Sedotan Kertas', quantity: 500, unit: 'pcs', minStock: 100, costPerUnit: 300, supplier: 'Eco Pack Indonesia' },
      { itemName: 'Sirup Vanilla', quantity: 3, unit: 'botol', minStock: 1, costPerUnit: 75000, supplier: 'Import Beverage Co.' },
      { itemName: 'Whipped Cream', quantity: 5, unit: 'kaleng', minStock: 2, costPerUnit: 35000, supplier: 'Toko Bahan Kue Jaya' },
    ]);

    console.log('✅ Seeding database berhasil!');
    return true;
  } catch (error) {
    console.error('❌ Gagal seeding database:', error.message);
    return false;
  }
}
