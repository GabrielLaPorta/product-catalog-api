const { ProductRepository } = require("../repository");
const { CreateErrorUtil } = require("../utils");

exports.findAll = async () => {
    try { 
    const products = await ProductRepository.findAll();
    return products;
    } catch(error) { throw error; }
}

exports.findById = async (id) => {
    try {
        const product = await ProductRepository.findById(id);
        if(!product){
            throw CreateErrorUtil.createError("Produto não encontrado", 404);
        }
        else {
            return product;
        }
    }
    catch(error) {
        throw error;
    }
}

exports.insert = async (product) => {
    const validation = productValidate(product);
    if(validation instanceof Error) throw validation;
    try{
        if(product.categoryName){
            const productInserted = await ProductRepository.insertWithCategory(product);
            return productInserted;
        }else {
            const productInserted = await ProductRepository.insert(product);
            return productInserted;
        }
    }
    catch(error) {
        throw error;
    }
    
}

exports.update = async (id, product) => {
    const validation = productValidate(product);
    if(validation instanceof Error) throw validation;

    try {
        const productResult = await ProductRepository.findById(id);
        if(!productResult){
            throw CreateErrorUtil.createError("Produto não encontrado", 404);
        }

        return await ProductRepository.update(id,{...productResult, ...product});
    }
    catch(error) {
        throw error;
    }
}

exports.delete = async (id) => {
    try {
        const productDeleted = await ProductRepository.delete(id);
        if(!productDeleted){
            throw CreateErrorUtil.createError("Produto não encontrado", 404);
        }
        else {
            return productDeleted;
        }
    }
    catch(error) {
        throw error;
    }
}

function productValidate(product) {
    if(product && product.name && product.description && product.price && product.imageUrl && (product.categoryId || product.categoryName)){
        if (product.categoryId && product.categoryName) {
            return CreateErrorUtil.createError("O parâmetro de categoria só pode ser ou o 'categoryId' ou o 'categoryName'", 400);
        }
        return true;
    }
    else {
        return CreateErrorUtil.createError("Faltam parâmetros do produto", 400);
    }
}