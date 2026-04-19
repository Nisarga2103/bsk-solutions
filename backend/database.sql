-- Create Database
CREATE DATABASE IF NOT EXISTS bsk_solutions;
USE bsk_solutions;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  rental_available BOOLEAN DEFAULT FALSE,
  rental_price_per_day DECIMAL(10, 2),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id)
);
ALTER TABLE orders 
ADD COLUMN status VARCHAR(50) DEFAULT 'Pending';
ALTER TABLE orders 
ADD COLUMN order_status VARCHAR(50) DEFAULT 'Pending';
-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  type ENUM('rental', 'purchase') DEFAULT 'purchase',
  rental_start_date DATE,
  rental_end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Rentals table
CREATE TABLE IF NOT EXISTS rentals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('pending', 'active', 'returned') DEFAULT 'pending',
  total_cost DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  type ENUM('order', 'rental', 'service', 'general') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample products
INSERT INTO products (name, description, category, price, stock, rental_available, rental_price_per_day, image_url) VALUES
('Dell Inspiron 15', 'Powerful laptop for work and entertainment', 'laptops', 45000, 10, TRUE, 1500, 'https://via.placeholder.com/300?text=Dell+Inspiron'),
('HP Pavilion 13', 'Ultrabook with great performance', 'laptops', 55000, 8, TRUE, 1800, 'https://via.placeholder.com/300?text=HP+Pavilion'),
('2MP CCTV Camera', 'HD surveillance camera for security', 'cctv', 3500, 20, TRUE, 200, 'https://via.placeholder.com/300?text=CCTV+Camera'),
('4MP CCTV Camera', 'Ultra HD surveillance camera', 'cctv', 6000, 15, TRUE, 300, 'https://via.placeholder.com/300?text=4MP+CCTV'),
('Cisco Network Switch', 'Managed network switch 24 ports', 'networking', 12000, 5, FALSE, 0, 'https://via.placeholder.com/300?text=Cisco+Switch'),
('TP-Link WiFi Router', 'AC1200 wireless router', 'networking', 2500, 25, FALSE, 0, 'https://via.placeholder.com/300?text=WiFi+Router'),
('Intel Core i7', 'Latest generation processor', 'cpu', 28000, 12, FALSE, 0, 'https://via.placeholder.com/300?text=Intel+i7'),
('AMD Ryzen 5', 'High performance processor', 'cpu', 18000, 15, FALSE, 0, 'https://via.placeholder.com/300?text=Ryzen+5'),
('16GB RAM Kit', 'DDR4 memory module', 'parts', 4500, 30, FALSE, 0, 'https://via.placeholder.com/300?text=RAM+16GB'),
('SSD 500GB', 'Fast solid state drive', 'parts', 3500, 40, FALSE, 0, 'https://via.placeholder.com/300?text=SSD+500GB'),
('WiFi Installation', 'Professional WiFi network setup', 'services', 2000, 999, FALSE, 0, 'https://via.placeholder.com/300?text=WiFi+Setup'),
('CCTV Installation', 'Complete security camera installation', 'services', 5000, 999, FALSE, 0, 'https://via.placeholder.com/300?text=CCTV+Install');

-- Default demo customer for testing rental bookings
INSERT INTO users (email, password_hash, fullname, phone, role) VALUES
('demo@bsk.com', '$2b$10$64Dx1hkDNvkf62rayQzaJuCed3cb.0seZSHfjRSk9U2VJk/u4rDQO', 'Demo User', '9999999999', 'customer'),
('admin@bsk.com', '$2b$10$64Dx1hkDNvkf62rayQzaJuCed3cb.0seZSHfjRSk9U2VJk/u4rDQO', 'Admin User', '8888888888', 'admin');
