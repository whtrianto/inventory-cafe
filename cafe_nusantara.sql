/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100427 (10.4.27-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : cafe_nusantara

 Target Server Type    : MySQL
 Target Server Version : 100427 (10.4.27-MariaDB)
 File Encoding         : 65001

 Date: 26/04/2026 13:27:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '☕',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_2`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_3`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_4`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_5`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_6`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_7`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_8`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_9`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_10`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_11`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_12`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_13`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_14`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_15`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_16`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_17`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_18`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_19`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_20`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_21`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_22`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_23`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_24`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_25`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_26`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_27`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_28`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_29`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_30`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_31`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_32`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_33`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_34`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_35`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_36`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_37`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_38`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_39`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_40`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_41`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_42`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_43`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_44`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_45`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_46`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_47`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_48`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_49`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_50`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_51`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_52`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_53`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_54`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_55`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_56`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_57`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_58`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_59`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_60`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_61`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_62`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_63`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Kopi', 'Berbagai jenis kopi pilihan', '☕', '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `categories` VALUES (2, 'Non-Kopi', 'Minuman non kafein', '🧋', '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `categories` VALUES (3, 'Teh', 'Teh premium dan herbal', '🍵', '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `categories` VALUES (4, 'Makanan', 'Makanan berat dan ringan', '🍽️', '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `categories` VALUES (5, 'Snack', 'Camilan dan dessert', '🍰', '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `categories` VALUES (6, 'Minuman Segar', 'Jus dan smoothie segar', '🥤', '2026-04-26 05:50:19', '2026-04-26 05:50:19');

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `unit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pcs',
  `minStock` decimal(10, 2) NOT NULL DEFAULT 10.00,
  `costPerUnit` decimal(10, 2) NULL DEFAULT 0.00,
  `supplier` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `lastRestocked` datetime NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of inventory
-- ----------------------------
INSERT INTO `inventory` VALUES (1, 'Biji Kopi Arabica', 5000.00, 'gram', 1000.00, 150.00, 'PT Kopi Nusantara', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (2, 'Biji Kopi Robusta', 3000.00, 'gram', 500.00, 100.00, 'PT Kopi Nusantara', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (3, 'Susu Full Cream', 20.00, 'liter', 5.00, 18000.00, 'Toko Bahan Kue Jaya', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (4, 'Gula Pasir', 10000.00, 'gram', 2000.00, 15.00, 'Toko Sembako Makmur', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (5, 'Gula Aren', 3000.00, 'gram', 500.00, 50.00, 'Petani Lokal', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (6, 'Coklat Bubuk', 2000.00, 'gram', 500.00, 80.00, 'Toko Bahan Kue Jaya', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (7, 'Matcha Powder', 500.00, 'gram', 100.00, 200.00, 'Import Jepang Co.', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (8, 'Teh Earl Grey', 50.00, 'pcs', 10.00, 2000.00, 'Tea House Indonesia', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (9, 'Es Krim Vanilla', 5.00, 'liter', 2.00, 45000.00, 'PT Dairy Best', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (10, 'Roti Tawar', 10.00, 'pcs', 3.00, 15000.00, 'Bakery Fresh', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (11, 'Telur Ayam', 30.00, 'butir', 10.00, 2500.00, 'Toko Sembako Makmur', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (12, 'Daging Ayam', 5000.00, 'gram', 1000.00, 45.00, 'Supplier Ayam Segar', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (13, 'Kentang', 3000.00, 'gram', 500.00, 20.00, 'Pasar Induk', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (14, 'Cup Plastik 16oz', 200.00, 'pcs', 50.00, 800.00, 'Toko Plastik Jaya', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (15, 'Sedotan Kertas', 500.00, 'pcs', 100.00, 300.00, 'Eco Pack Indonesia', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (16, 'Sirup Vanilla', 3.00, 'botol', 1.00, 75000.00, 'Import Beverage Co.', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `inventory` VALUES (17, 'Whipped Cream', 5.00, 'kaleng', 2.00, 35000.00, 'Toko Bahan Kue Jaya', NULL, '2026-04-26 05:50:19', '2026-04-26 05:50:19');

-- ----------------------------
-- Table structure for menu_items
-- ----------------------------
DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE `menu_items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `price` decimal(10, 2) NOT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '/images/default-menu.jpg',
  `categoryId` int NOT NULL,
  `isAvailable` tinyint(1) NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `categoryId`(`categoryId` ASC) USING BTREE,
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_items
-- ----------------------------
INSERT INTO `menu_items` VALUES (1, 'Espresso', 'Kopi espresso murni yang kaya rasa', 18000.00, '/images/menu/espresso.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (2, 'Americano', 'Espresso dengan air panas, rasa smooth', 22000.00, '/images/menu/americano.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (3, 'Cappuccino', 'Espresso, steamed milk, dan foam lembut', 28000.00, '/images/menu/cappuccino.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (4, 'Cafe Latte', 'Espresso dengan susu steamed yang creamy', 28000.00, '/images/menu/latte.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (5, 'Mocha Latte', 'Perpaduan espresso, coklat, dan susu', 32000.00, '/images/menu/mocha.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (6, 'Kopi Susu Nusantara', 'Signature kopi susu gula aren', 25000.00, '/images/menu/kopi-susu.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (7, 'Affogato', 'Espresso panas dituang ke atas es krim vanilla', 35000.00, '/images/menu/affogato.jpg', 1, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (8, 'Coklat Panas', 'Coklat premium dengan susu hangat', 25000.00, '/images/menu/hot-choco.jpg', 2, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (9, 'Matcha Latte', 'Matcha Jepang premium dengan susu', 30000.00, '/images/menu/matcha.jpg', 2, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (10, 'Red Velvet Latte', 'Minuman red velvet creamy', 30000.00, '/images/menu/red-velvet.jpg', 2, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (11, 'Taro Latte', 'Minuman taro yang manis dan lembut', 28000.00, '/images/menu/taro.jpg', 2, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (12, 'Earl Grey', 'Teh hitam klasik dengan aroma bergamot', 20000.00, '/images/menu/earl-grey.jpg', 3, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (13, 'Chamomile Tea', 'Teh herbal yang menenangkan', 22000.00, '/images/menu/chamomile.jpg', 3, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (14, 'Lemon Tea', 'Teh segar dengan perasan lemon', 18000.00, '/images/menu/lemon-tea.jpg', 3, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (15, 'Thai Tea', 'Teh khas Thailand yang manis', 25000.00, '/images/menu/thai-tea.jpg', 3, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (16, 'Nasi Goreng Cafe', 'Nasi goreng spesial dengan telur dan ayam', 35000.00, '/images/menu/nasi-goreng.jpg', 4, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (17, 'Chicken Katsu Curry', 'Ayam katsu krispi dengan saus kari Jepang', 42000.00, '/images/menu/katsu.jpg', 4, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (18, 'Spaghetti Aglio Olio', 'Pasta dengan bawang putih dan cabai', 38000.00, '/images/menu/pasta.jpg', 4, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (19, 'Club Sandwich', 'Sandwich 3 lapis dengan ayam dan bacon', 35000.00, '/images/menu/sandwich.jpg', 4, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (20, 'Rice Bowl Teriyaki', 'Nasi dengan ayam teriyaki dan sayuran', 38000.00, '/images/menu/ricebowl.jpg', 4, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (21, 'French Fries', 'Kentang goreng krispi dengan saus', 22000.00, '/images/menu/fries.jpg', 5, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (22, 'Banana Split', 'Pisang dengan es krim dan topping', 30000.00, '/images/menu/banana-split.jpg', 5, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (23, 'Brownies', 'Brownies coklat lembut dan fudgy', 25000.00, '/images/menu/brownies.jpg', 5, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (24, 'Roti Bakar', 'Roti bakar dengan selai dan keju', 20000.00, '/images/menu/roti-bakar.jpg', 5, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (25, 'Dimsum 4pcs', 'Dimsum kukus isi ayam dan udang', 28000.00, '/images/menu/dimsum.jpg', 5, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (26, 'Jus Alpukat', 'Jus alpukat segar dengan susu', 25000.00, '/images/menu/avocado.jpg', 6, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (27, 'Mango Smoothie', 'Smoothie mangga segar', 28000.00, '/images/menu/mango.jpg', 6, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `menu_items` VALUES (28, 'Lemon Squash', 'Minuman lemon segar dengan soda', 22000.00, '/images/menu/lemon-squash.jpg', 6, 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `menuItemId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  `unitPrice` decimal(10, 2) NOT NULL,
  `subtotal` decimal(12, 2) NOT NULL,
  `notes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `orderId`(`orderId` ASC) USING BTREE,
  INDEX `menuItemId`(`menuItemId` ASC) USING BTREE,
  CONSTRAINT `order_items_ibfk_100` FOREIGN KEY (`menuItemId`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_99` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_items
-- ----------------------------
INSERT INTO `order_items` VALUES (2, 2, 7, 1, 35000.00, 35000.00, NULL, '2026-04-26 06:12:17', '2026-04-26 06:12:17');
INSERT INTO `order_items` VALUES (3, 3, 2, 1, 22000.00, 22000.00, NULL, '2026-04-26 06:13:02', '2026-04-26 06:13:02');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'Walk-in Customer',
  `tableNumber` int NULL DEFAULT NULL,
  `totalAmount` decimal(12, 2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','preparing','ready','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'pending',
  `paymentMethod` enum('cash','debit','qris','transfer') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'cash',
  `paymentStatus` enum('unpaid','paid') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'unpaid',
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `orderNumber`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_2`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_3`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_4`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_5`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_6`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_7`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_8`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_9`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_10`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_11`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_12`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_13`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_14`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_15`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_16`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_17`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_18`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_19`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_20`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_21`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_22`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_23`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_24`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_25`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_26`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_27`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_28`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_29`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_30`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_31`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_32`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_33`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_34`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_35`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_36`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_37`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_38`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_39`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_40`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_41`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_42`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_43`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_44`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_45`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_46`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_47`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_48`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_49`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_50`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_51`(`orderNumber` ASC) USING BTREE,
  UNIQUE INDEX `orderNumber_52`(`orderNumber` ASC) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'ORD-20260426-001', 'jnjn', 2, 20000.00, 'completed', 'qris', 'paid', NULL, 1, '2026-04-26 06:11:29', '2026-04-26 06:11:58');
INSERT INTO `orders` VALUES (2, 'ORD-20260426-002', 'Walk-in Customer', NULL, 35000.00, 'cancelled', 'cash', 'unpaid', NULL, 1, '2026-04-26 06:12:17', '2026-04-26 06:12:42');
INSERT INTO `orders` VALUES (3, 'ORD-20260426-003', 'Walk-in Customer', NULL, 22000.00, 'pending', 'cash', 'unpaid', NULL, 1, '2026-04-26 06:13:02', '2026-04-26 06:13:02');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','kasir') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'kasir',
  `isActive` tinyint(1) NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_2`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_3`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_4`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_5`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_6`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_7`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_8`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_9`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_10`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_11`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_12`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_13`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_14`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_15`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_16`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_17`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_18`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_19`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_20`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_21`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_22`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_23`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_24`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_25`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_26`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_27`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_28`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_29`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_30`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_31`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_32`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_33`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_34`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_35`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_36`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_37`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_38`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_39`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_40`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_41`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_42`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_43`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_44`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_45`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_46`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_47`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_48`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_49`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_50`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_51`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_52`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_53`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_54`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_55`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_56`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_57`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_58`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_59`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_60`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_61`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_62`(`email` ASC) USING BTREE,
  UNIQUE INDEX `email_63`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin Cafe', 'admin@cafenusantara.com', '$2b$10$h1NwL1m0Sa4AbLJwNPGTue/rcqkBXBNo8DA.w8BXEFAvKy0lWHNhO', 'admin', 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `users` VALUES (2, 'Budi Kasir', 'budi@cafenusantara.com', '$2b$10$.RRqHbEJNMoJb/tw/chf8.BxAtC0.Fs2zSH9cCw6xwQJEVZsTnTO2', 'kasir', 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');
INSERT INTO `users` VALUES (3, 'Sari Kasir', 'sari@cafenusantara.com', '$2b$10$.RRqHbEJNMoJb/tw/chf8.BxAtC0.Fs2zSH9cCw6xwQJEVZsTnTO2', 'kasir', 1, '2026-04-26 05:50:19', '2026-04-26 05:50:19');

SET FOREIGN_KEY_CHECKS = 1;
