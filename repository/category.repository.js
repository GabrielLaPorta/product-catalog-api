const {Client} = require('pg');
require("dotenv").config();
const connectionString = process.env["DATABASE_URL"];

exports.findAll = async () => {
    const database = new Client(connectionString);
    database.connect();
    try {
        const result = await database.query("SELECT * from categories");
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
        const result = await database.query("SELECT * FROM categories WHERE id=$1", [id]);
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

exports.insert = async (category) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query(
            "INSERT INTO categories(name) VALUES ($1) RETURNING *", 
            [category.name]);
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

exports.update = async (id, category) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query(
            "UPDATE categories SET name=$1 WHERE id=$2 RETURNING *", 
            [category.name, id]);
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
        const result = await database.query("DELETE FROM categories WHERE id=$1 RETURNING *", [id]);
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