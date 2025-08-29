const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { getJWT } = require('../helpers/jwt');

const postUser = async (req, res = response)=>{
    try {
        const { name, email, password } = req.body;

        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({ok: false, msg: 'El correo ya se encuentra registrado'});
        }

        const user = new User({name, email, password});

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        await user.save();

        const token = await getJWT( user.id );

        res.json({
            ok: true,
            msg: user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }    
}

const login = async (req, res = response)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'email o password incorrecto'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'email o password incorrecto'
            });
        }


        const token = await getJWT( user.id );

        return res.json({
            ok: true,
            msg: user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }  
}

const renewToken = async (req, res)=>{
    try {
        const { uid } = req;
        const token = await getJWT(uid);        
        const user = await User.findById(uid);
        
        res.json({
            ok: true,
            msg: user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});        
    }
}


module.exports = {
    postUser,
    login,
    renewToken
}