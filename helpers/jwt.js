const jwt = require('jsonwebtoken');

const getJWT = ( uid )=>{
    

    return new Promise((resolve, reject)=>{
        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '6h'
        }, (error, token)=>{
            if(error){
                reject('No se pudo generar el JWT');
            } else{
                resolve( token );
            }
        });
    });
}

module.exports = {
    getJWT
}