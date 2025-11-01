-- Sample data for award
INSERT INTO award (year, award_type, product_id, category_id) VALUES
  (2023, 'best',       101, 1),
  (2024, 'most_sold',  102, 2),
  (2022, 'revelation', 103, 3),
  (2024, 'best',       104, 1),
  (2021, 'most_sold',  105, 4);

-- Sample data for review
INSERT INTO review (product_id, rating, comment, created) VALUES
  (101, 5, 'Outstanding quality — exceeded expectations.', '2024-06-12 10:15:00'),
  (101, 4, 'Very good, minor packaging issue.',            '2024-07-01 09:00:00'),
  (102, 3, 'Average performance for the price.',           '2024-08-20 14:30:00'),
  (103, 5, 'Surprising performance — real revelation!',     '2022-11-05 08:45:00'),
  (104, 2, 'Not what I expected.',                         '2024-01-10 18:20:00');

-- Sample data for used_points
INSERT INTO used_points (order_id, points) VALUES
  (301, 100),
  (302, 50),
  (303, 200);

INSERT INTO products (id, name, price, description, image_url, rank) VALUES
(101,'Portuguese Olive Oil', 10.00, 'Organic extra virgin olive oil from Alentejo.', 'https://example.com/olive-oil.jpg',2),
(102,'Handmade Ceramics', 25.00, 'Traditional hand-painted ceramic bowl.', 'https://example.com/ceramics.jpg',3),
(103,'Cork Wallet', 15.50, 'Eco-friendly cork leather wallet.', 'https://example.com/cork-wallet.jpg',1),
(104,'Linen Towel', 12.00, 'Soft linen towel made in Portugal.', 'https://example.com/linen-towel.jpg',4);

-- Sample data for loyalty
INSERT INTO loyalty (customer_id, points) VALUES
  (201, 1200),
  (202, 50),
  (203, 0),
  (204, 350);

-- Reset sequence values to follow inserted rows (Postgres default sequence names)
SELECT setval('award_id_seq',       COALESCE((SELECT MAX(id) FROM award), 1));
SELECT setval('review_id_seq',      COALESCE((SELECT MAX(id) FROM review), 1));
SELECT setval('used_points_id_seq', COALESCE((SELECT MAX(id) FROM used_points), 1));
SELECT setval('loyalty_id_seq',     COALESCE((SELECT MAX(id) FROM loyalty), 1));
