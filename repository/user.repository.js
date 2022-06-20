const {Client} = require('pg');
require("dotenv").config();
const connectionString = process.env["DATABASE_URL"];

exports.findAll = async () => {
    const database = new Client(connectionString);
    database.connect();
    try {
        const result = await database.query('SELECT email from public."user"');
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
        const result = await database.query('SELECT email FROM public."user" WHERE id=$1', [id]);
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

exports.findByEmail = async (email) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query('SELECT * FROM public."user" WHERE email=$1', [email]);
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

exports.insert = async (user) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query(
            'INSERT INTO public."user"(email, password) VALUES ($1, $2) RETURNING email', 
            [user.email, user.password]);
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

exports.update = async (id, user) => {
    const database = new Client(connectionString);
    database.connect();
    try{
        const result = await database.query(
            'UPDATE public."user" SET email=$1, password=$2 WHERE id=$3 RETURNING email', 
            [user.email, user.password, id]);
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
        const result = await database.query('DELETE FROM public."user" WHERE id=$1 RETURNING email', [id]);
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