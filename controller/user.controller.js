const {UserBusiness} = require('../business');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env["SECRET_KEY"];

exports.findAll = async (req, res) => {
    try{ 
        const users = await UserBusiness.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.findById = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await UserBusiness.findById(id);
        res.json(user);                
    }
    catch (error) {
        if(error.status) {
            res.status(error.status).json(error);
        }
        else {
            res.status(500).json({message: "Erro inesperado"});            
        }
    }
}

exports.insert = async (req, res) => {
    const user = req.body;
    
    try{ 
        const userInserted = await UserBusiness.insert(user);
        res.status(201).json(userInserted);
    }
    catch(error) {
        if(error.status) {
            res.status(error.status).json(error);
        }
        else {
            res.status(500).json({message: "Erro inesperado"});            
        }
    }   
}

exports.update = async(req, res) => {
    const id = req.params.id;  
    const user = req.body;
  
    try{
        const userUpdated = await UserBusiness.update(id, user);
        res.json(userUpdated);                
    }
    catch (error) {
        if(error.status) {
            res.status(error.status).json(error);
        }
        else {
            res.status(500).json({message: "Erro inesperado"});            
        }
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;    
    
    try{
        const user = await UserBusiness.delete(id);
        res.json(user);                
    }
    catch (error) {
        if(error.status) {
            res.status(error.status).json(error);
        }
        else {
            res.status(500).json({message: "Erro inesperado"});            
        }
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;    
    
    try{
        const user = await UserBusiness.login(email, password);

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, secretKey, { expiresIn: '1h' });

        res.status(201).json({
          token: token
        });            
    }
    catch (error) {
        if(error.status) {
            res.status(error.status).json(error);
        }
        else {
            res.status(500).json({message: "Erro inesperado"});            
        }
    }
}