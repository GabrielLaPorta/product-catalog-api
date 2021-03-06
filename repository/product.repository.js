const {Client} = require('pg');
require("dotenv").config();
const connectionString = process.env["DATABASE_URL"];

exports.findAll = async () => {
    const database = new Client(connectionString);
    database.connect();
    try {
        const result = await database.query("SELECT * from products");
        return (result.rows);
    } catch (error) {
        throw error;
    } finally {
        database.end();
    }
}

exports.findById = async (id) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query("SELECT * FROM products WHERE id=$1", [id]);
        return(result.rows[0]);        
    }
    catch (error) {
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    } finally {
        database.end();
    }
}

exports.findByCategoryId = async (categoryId) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query("SELECT * FROM products WHERE id=$1 AND category_id=$2", [id, categoryId]);
        return(result.rows);        
    }
    catch (error) {
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    } finally {
        database.end();
    }
}

exports.search = async (term = "", categoryId) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const sqlWithCategory = `
            SELECT *, c.name as category_name, p.name as name, p.id as id FROM products p
            INNER JOIN categories c ON c.id = p.category_id 
            WHERE (UPPER(p.name) LIKE UPPER($1) OR UPPER(description) LIKE UPPER($1)) AND category_id=$2
        `;
        const sqlWithoutCategory = `
            SELECT *, c.name as category_name, p.name as name, p.id as id FROM products p
            INNER JOIN categories c ON c.id = p.category_id
            WHERE UPPER(p.name) LIKE UPPER($1) OR UPPER(description) LIKE UPPER($1)
        `;
        const sql = categoryId ? sqlWithCategory : term ? sqlWithoutCategory : `
            SELECT *, c.name as category_name, p.name as name, p.id as id FROM products p
            INNER JOIN categories c ON c.id = p.category_id
        `;
        const params = categoryId ?  ['%'+term+'%', categoryId] : term ? ['%'+term+'%'] : null;
        const result = await database.query(sql, params);
        return(result.rows);
    }
    catch (error) {
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    } finally {
        database.end();
    }
}

exports.insert = async (product) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query(
            "INSERT INTO products(name, description, image_url, price, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [product.name, product.description, product.imageUrl, product.price, product.categoryId]);
        return(result.rows[0]);
    }
    catch(error) {
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    } finally {
        database.end();
    }
}

exports.insertWithCategory = async (product) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        await database.query('BEGIN');
        console.log('BEGIN');
        let categoryResult = await database.query(
            "INSERT INTO categories(name) VALUES ($1) RETURNING *", 
            [product.categoryName]);

        categoryResult = categoryResult.rows[0];
        console.log('INSERT CATEGORY');

        const productResult = await database.query(
            "INSERT INTO products(name, description, image_url, price, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [product.name, product.description, product.imageUrl, product.price, categoryResult.id]);
        console.log('INSERT PRODUCT');

        await database.query('COMMIT');
        console.log('COMMIT');

        return (productResult.rows[0]);
    } catch(error) {
        await database.query('ROLLBACK');
        console.log('ROLLBACK');
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    }
    finally {
        database.end();
    }
}

exports.update = async (id, product) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query(
            "UPDATE products SET name=$1, description=$2, image_url=$3, price=$4, category_id=$5 WHERE id=$6 RETURNING *", 
            [product.name, product.description, product.imageUrl, product.price, product.categoryId, id]);
        return(result.rows[0]);
    }
    catch(error) {
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    } finally {
        database.end();
    }
}

exports.delete = async (id) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query("DELETE FROM products WHERE id=$1 RETURNING *", [id]);
        return(result.rows[0]);
    }
    catch(error) {
        throw {
            name: error.name,
            message: error.message,
            status: 500
        }; 
    } finally {
        database.end();
    }
}