-- Sample data for award
INSERT INTO award (year, award_type, product_id, category_id) VALUES
  (2023, 'best',       101, 1),
  (2024, 'most_sold',  102, 2),
  (2022, 'revelation', 103, 3),
  (2024, 'best',       104, 1),
  (2021, 'most_sold',  105, 4);

-- Sample data for review
INSERT INTO review (product_id, customer_id, rating, comment, created) VALUES
  (101, 201, 5, 'Outstanding quality — exceeded expectations.', '2024-06-12 10:15:00'),
  (101, 202, 4, 'Very good, minor packaging issue.',            '2024-07-01 09:00:00'),
  (102, 203, 3, 'Average performance for the price.',           '2024-08-20 14:30:00'),
  (103, 204, 5, 'Surprising performance — real revelation!',     '2022-11-05 08:45:00'),
  (104, 205, 2, 'Not what I expected.',                         '2024-01-10 18:20:00');

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

INSERT INTO reviews (product_id, author, rating, comment, created_at) VALUES
  (101, 'João Martins',       5, 'Qualidade excelente, o melhor azeite que já comprei.', '2024-05-10 12:30:00'),
  (101, 'Maria Fernandes',    4, 'Sabor muito bom, mas a garrafa podia ser maior.',      '2024-06-02 09:45:00'),
  (101, 'Luis Andrade',       3, 'Bom azeite, mas não achei nada de extraordinário.',    '2024-07-15 18:20:00'),

  (102, 'Beatriz Lopes',      5, 'As cerâmicas são lindíssimas, ótima decoração.',       '2024-03-04 11:00:00'),
  (102, 'Hugo Correia',       2, 'Veio com pequenas imperfeições. Esperava mais.',       '2024-04-22 16:50:00'),
  (102, 'Ana Ribeiro',        4, 'Muito bonito e bem feito, mas chegou um pouco atrasado.', '2024-05-13 14:10:00'),

  (103, 'Ricardo Costa',      5, 'Carteira leve, resistente e ecológica. Adorei!',       '2023-10-07 10:00:00'),
  (103, 'Carla Mendes',       4, 'Muito prática, mas podia ter mais compartimentos.',    '2023-12-19 19:40:00'),

  (104, 'Sofia Almeida',      3, 'Toalha bonita mas esperava que fosse mais macia.',     '2024-02-15 13:25:00'),
  (104, 'Pedro Oliveira',     1, 'A textura é áspera e o tecido parece frágil.',         '2024-03-01 08:15:00'),
  (104, 'Marta Gonçalves',    4, 'Boa qualidade, seca rápido e é leve.',                 '2024-03-28 17:55:00');


-- Reset sequence values to follow inserted rows (Postgres default sequence names)
SELECT setval('award_id_seq',       COALESCE((SELECT MAX(id) FROM award), 1));
SELECT setval('review_id_seq',      COALESCE((SELECT MAX(id) FROM review), 1));
SELECT setval('used_points_id_seq', COALESCE((SELECT MAX(id) FROM used_points), 1));
SELECT setval('loyalty_id_seq',     COALESCE((SELECT MAX(id) FROM loyalty), 1));
