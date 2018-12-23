DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

-- Create new example rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Apple MacBook Pro", "Electronics", 1200, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Lenevo Yoga", "Electronics", 1000, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("HP Spectre", "Electronics", 800, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Dell XPS", "Electronics", 1100, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Autonomous", "Home Goods", 500, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Sofa", "Home Goods", 600, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Lamps", "Home Goods", 100, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Chairs", "Home Goods", 50, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Canon", "Camera", 2000, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Sony", "Camera", 1500, 50);


SELECT * FROM products;

-- ids, names, and prices of products for sale
SELECT item_id, product_name, price FROM products;

-- return products and quantity
SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id=1;

-- updating table after running the queries
-- UPDATE products
-- SET stock_quantity = 
-- WHERE item_id =