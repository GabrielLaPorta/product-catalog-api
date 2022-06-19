-- SET TIMEZONE BRAZIL
SET TIMEZONE TO 'America/Sao_Paulo';

-- CREATE TABLE USERS 
CREATE TABLE public."user" (
    id UUID NOT NULL default gen_random_uuid(),
    email VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id)
);

-- CREATE TABLE CATEGORIES 
CREATE TABLE categories (
   id SERIAL NOT NULL PRIMARY KEY,
   "name" varchar
);

-- INSERT DATA ON TABLE CATEGORIES 
INSERT INTO categories("name") VALUES('Anel');
INSERT INTO categories("name") VALUES('Colar');
INSERT INTO categories("name") VALUES('Brinco');
INSERT INTO categories("name") VALUES('Pulseira');

-- CREATE TABLE PRODUCTS
CREATE TABLE products (
    id UUID NOT NULL default gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    image_url VARCHAR,
    price FLOAT NOT NULL,
    category_id INTEGER NOT NULL,
    CONSTRAINT pk_product_id PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);
