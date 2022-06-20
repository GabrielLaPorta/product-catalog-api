const { UserRepository } = require("../repository");
const { CreateErrorUtil } = require("../utils");
const bcrypt = require ('bcrypt');

exports.findAll = async () => {
    try { 
    const users = await UserRepository.findAll();
    return users;
    } catch(error) { throw error; }
}

exports.findById = async (id) => {
    try {
        const user = await UserRepository.findById(id);
        if(!user){
            throw CreateErrorUtil.createError("Usuário não encontrada", 404);
        }
        else {
            return user;
        }
    }
    catch(error) {
        throw error;
    }
}

exports.insert = async (user) => {
    const validation = userValidate(user);
    if(validation instanceof Error) throw validation;

    try{
        const insertedCategory = await UserRepository.insert({...user, password: bcrypt.hashSync(user.password,8)});
        return insertedCategory;
    }
    catch(error) {
        throw error;
    }
    
}

exports.update = async (id, user) => {
    const validation = userValidate(user);
    if(validation instanceof Error) throw validation;

    try {
        const userResult = await UserRepository.findById(id);
        if(!userResult){
            throw CreateErrorUtil.createError("Usuário não encontrada", 404);;
        }

        return await UserRepository.update(id,{...userResult, ...user, password: bcrypt.hashSync(user.password,8)});
    }
    catch(error) {
        throw error;
    }
}

exports.delete = async (id) => {
    try {
        const userDeleted = await UserRepository.delete(id);
        if(!userDeleted){
            throw CreateErrorUtil.createError("Usuário não encontrada", 404);
        }
        else {
            return userDeleted;
        }
    }
    catch(error) {
        throw error;
    }
}

exports.login = async (email, password) => {
    try {
        const userResult = await UserRepository.findByEmail(email);
        if(!userResult){
            throw CreateErrorUtil.createError("Email ou senha inválidos", 401);
        }
        else {
            if (bcrypt.compareSync(password, userResult.password)) {
                return userResult
            }
            throw CreateErrorUtil.createError("Email ou senha inválidos", 401);
        }
    }
    catch(error) {
        throw error;
    }
}

function userValidate(user) {
    if(user && user.email && user.password){
        return true;
    }
    else {
        return CreateErrorUtil.createError("Faltam parâmetros do usuário", 400);
    }
}