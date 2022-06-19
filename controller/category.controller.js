const {CategoryBusiness} = require('../business');

exports.findAll = async (req, res) => {
    try{ 
        const categories = await CategoryBusiness.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.findById = async (req, res) => {
    const id = req.params.id;
    try{
        const category = await CategoryBusiness.findById(id);
        res.json(category);                
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
    const category = req.body;
    
    try{ 
        const categoryInserted = await CategoryBusiness.insert(category);
        res.status(201).json(categoryInserted);
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
    const category = req.body;
  
    try{
        const categoryUpdated = await CategoryBusiness.update(id, category);
        res.json(categoryUpdated);                
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
        const category = await CategoryBusiness.delete(id);
        res.json(category);                
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