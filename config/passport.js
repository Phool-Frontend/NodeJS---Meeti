const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');
const { pass } = require('./emails');

passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
    },
    async(email,password,next) =>{
        //Este codigo se ejecuta al terminar el formulario
        const usuario = await Usuarios.findOne( {
                                where   :  { email , activo:1 }} );

        //Revisar si existe o no
        if(!usuario) return next(null,false,{
            message:'Ese usuario no existe'
        });

        //El usuario existe, comparar su password
        const VerificarPass = usuario.validarPassword(password);
        //si el password es incorrecto
        if(!VerificarPass) return next(null,false,{
            message:'Password Incorrecto'
        });

        //Todo bien 
        return next(null,usuario);
    }
))

passport.serializeUser(function(usuario,cb){
    cb(null,usuario);
});

passport.deserializeUser(function(usuario,cb){
    cb(null,usuario);
});

module.exports = passport;
