const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env["SECRET_KEY"];

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(" ")[1];
    if(token) {
        try{
            const payload = jwt.verify(token, secretKey);
            console.log("[ValidaToken] Payload",payload);
            next();
        }
        catch(err){
            res.status(403).json({mensagem:"Sem Token de acesso"});
        }        
    }
    else {
        res.status(403).json({mensagem:"Sem Token de acesso"});
    }
};
