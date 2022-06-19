const { CategoryRepository } = require("../repository");
const { CreateErrorUtil } = require("../utils");

exports.findAll = async () => {
    try { 
    const categories = await CategoryRepository.findAll();
    return categories;
    } catch(error) { throw error; }
}

exports.findById = async (id) => {
    try {
        const category = await CategoryRepository.findById(id);
        if(!category){
            throw CreateErrorUtil.createError("Categoria não encontrada", 404);
        }
        else {
            return category;
        }
    }
    catch(error) {
        throw error;
    }
}

exports.insert = async (category) => {
    const validation = categoryValidate(category);
    if(validation instanceof Error) throw validation;

    try{
        const insertedCategory = await CategoryRepository.insert(category);
        return insertedCategory;
    }
    catch(error) {
        throw error;
    }
    
}

exports.update = async (id, category) => {
    const validation = categoryValidate(category);
    if(validation instanceof Error) throw validation;

    try {
        const categoryResult = await CategoryRepository.findById(id);
        if(!categoryResult){
            throw CreateErrorUtil.createError("Categoria não encontrada", 404);;
        }

        return await CategoryRepository.update(id,{...categoryResult, ...category});
    }
    catch(error) {
        throw error;
    }
}

exports.delete = async (id) => {
    try {
        const categoryDeleted = await CategoryRepository.delete(id);
        if(!categoryDeleted){
            throw CreateErrorUtil.createError("Categoria não encontrada", 404);
        }
        else {
            return categoryDeleted;
        }
    }
    catch(error) {
        throw error;
    }
}

function categoryValidate(category) {
    if(category && category.name){
        return true;
    }
    else {
        return CreateErrorUtil.createError("Faltam parâmetros da categoria", 400);
    }
}