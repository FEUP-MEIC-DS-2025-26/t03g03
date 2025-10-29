-- Insert demo products
INSERT INTO products (name, price, description, image_url) VALUES
('Portuguese Olive Oil', 10.00, 'Organic extra virgin olive oil from Alentejo.', 'https://example.com/olive-oil.jpg'),
('Handmade Ceramics', 25.00, 'Traditional hand-painted ceramic bowl.', 'https://example.com/ceramics.jpg'),
('Cork Wallet', 15.50, 'Eco-friendly cork leather wallet.', 'https://example.com/cork-wallet.jpg'),
('Linen Towel', 12.00, 'Soft linen towel made in Portugal.', 'https://example.com/linen-towel.jpg');

-- Insert demo users
INSERT INTO users (name, email, password) VALUES
('Ana Silva', 'ana@example.com', 'password123'),
('João Pereira', 'joao@example.com', 'securepass'),
('Maria Costa', 'maria@example.com', 'mypassword');

-- Insert demo orders
INSERT INTO orders (user_id, total) VALUES
(1, 45.50),
(2, 12.00);
