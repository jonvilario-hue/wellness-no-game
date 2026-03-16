-- Generic E-commerce Relational Pattern
CREATE TABLE products (
    id integer PRIMARY KEY,
    name varchar(100),
    category varchar(50),
    price numeric,
    stock_quantity integer
);

CREATE TABLE customers (
    id integer PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(100) UNIQUE,
    joined_date date
);

CREATE TABLE orders (
    id integer PRIMARY KEY,
    customer_id integer REFERENCES customers(id),
    order_date timestamp,
    status varchar(20),
    total_amount numeric
);

CREATE TABLE order_items (
    id integer PRIMARY KEY,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    quantity integer,
    unit_price numeric
);