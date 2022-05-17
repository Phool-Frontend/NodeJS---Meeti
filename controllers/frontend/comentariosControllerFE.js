const Comentarios = require('../../models/Comentarios');
const Meeti = require('../../models/Meeti');

exports.agregarComentario = async(req,res,next) => {
    // obtener el comentaria
    const { comentario } = req.body;

    // crear comentario en la BD
    await Comentarios.create({
        mensajes    :   comentario,
        usuarioId   :   req.user.id,
        meetiId     :   req.params.id   
    });

    //Redireccionar a la misma pagina
    res.redirect('back');
    next();
    
}

//elimina un comentario de la base de datos
exports.eliminarComentario = async(req,res,next) => {

    // Tomar el ID del comentario
    const { comentarioId } = req.body;
    
    // Consultar el Comentario
    const comentario = await Comentarios.findOne({ where:{ id:comentarioId }});

    // Verificar si existe el comentario
    if(!comentario){
        res.status(404).send('Accion no valida');
        return next();
    }
    

    //consultas el Meeti del comentario
    const meeti = await Meeti.findOne({ where : { id:comentario.meetiId}})

    
    // Verificar que quien lo borra sea el creador
    if(comentario.usuarioId === req.user.id || meeti.usuarioId === req.user.id){
        await Comentarios.destroy({ where: {  
            id: comentario.id
        }});
        res.status(200).send('Eliminando Correctamente');
        return next();
    }else{
        res.status(403).send('Accion no valida');
        return next();
    }

}