const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        mongoose.connect( process.env.DB_CNN );
        console.log('DB CONNECT');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - contacte al administrador');
    }
}

module.exports = {
    dbConnection
}