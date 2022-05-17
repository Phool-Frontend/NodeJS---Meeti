const passport = require("passport");

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect:'/ok',
    failureRedirect:'/no',
    failureFlash:true,
    badRequestMessage:'Ambos campos son obligatorios'
});

//revisa si el usuario esta autenticado o no

exports.usuarioAutenticado = (req,res,next) =>{
    //si el usuario esta autenticado adelante
    if(req.isAuthenticated() ){
        return next();
    }

    //Si no esta autenticado
    return res.redirect('/iniciar-sesion');
}


// Cerrar sesion
exports.cerrarSesion = (req,res) => {
    req.logout();
    req.flash('correcto','Cerraste sesion correctamente');
    res.redirect('/iniciar-sesion');
    next();
}