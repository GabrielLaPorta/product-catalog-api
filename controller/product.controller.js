const {ProductBusiness} = require('../business');

exports.findAll = async (req, res) => {
    try{ 
        const products = await ProductBusiness.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.findById = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await ProductBusiness.findById(id);
        res.json(product);                
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
    const product = req.body;
    
    try{ 
        const productInserted = await ProductBusiness.insert(product);
        res.status(201).json(productInserted);
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
    const product = req.body;
  
    try{
        const productUpdated = await ProductBusiness.update(id, product);
        res.json(productUpdated);                
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
        const product = await ProductBusiness.delete(id);
        res.json(product);                
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