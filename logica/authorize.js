

export const authenticationMid=(req,res,next)=>{
    req.user= {
        nombre:"admin",
        autorización: true
    }
    next()    
};

export const authorizationMid=(req,res,next)=>{
    if(req.user.autorización) next()
    else res.status(403).send({
        "Error": 1,
        "descripción":`Ruta ${req.url} método ${req.method} usuario no autorizado `        
    })
}