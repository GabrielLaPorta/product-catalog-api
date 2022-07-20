const fs = require('fs');
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


exports.findByCategoryId = async (req, res) => {
    const categoryId = req.params.categoryId;
    try{
        const products = await ProductBusiness.findByCategoryId(categoryId);
        res.json(products);                
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


exports.search = async (req, res) => {
    const {term, categoryId} = req.query;
    try{
        const products = await ProductBusiness.search(term, categoryId);
        res.json(products);                
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
        const image_url = __dirname.replace("/controller", "") + "/public" + product.image_url.replace(req.protocol + "://" + req.get("host"), "")
        
        fs.unlink(image_url, (error) => {
            if (error) {
              console.error(error)
              return error
            }
        });

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

exports.uploadImage = async (req, res) => {
    try{
        if(req.file) {
            res.status(201).json({
                imageUrl: req.file.path,
                message: "Upload realizado com sucesso"
            });                
        } else {
            res.status(400).json({message: "Falha no upload"})
        }
    }
    catch (error) {
        res.status(500).json({message: "Erro inesperado"});            
    }
}