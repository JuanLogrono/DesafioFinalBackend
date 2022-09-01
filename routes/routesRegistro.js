import express from "express";
import { uploader } from "../config/multer.js";
import passport from "../config/passport.js";
import { mongoUsers } from "../contenedor/mongoUser.js";
import { mailRegistro } from "../logica/armarMail.js";
import { pais } from "../public/countryCodes.js";

const {Router}= express;

export const routerRegistro = Router()


routerRegistro.get("/", (req,res)=>{
    res.render('registro.hbs',{titulo:'registro',pais:pais})
})

routerRegistro.post("/", passport.authenticate('registro', { failureRedirect: 'api/error_registro' }), (req,res)=>{
    const username= req.body.username
    const{nombre,direccion,edad,telefono,pais}=req.body
    const foto=`/imagenes/${username}`
    const tel = pais+telefono    
    const body={nombre,direccion,telefono:tel,edad,foto}
    mongoUsers.update(username,body) 
    
    res.redirect('/api/registro/guardar_imagen')
})
routerRegistro.route('/guardar_imagen')
.post(uploader.single(`avatar`),async (req,res)=>{
   const user = await mongoUsers.findUser(req.session.passport.user)
   
   mailRegistro(user)
    res.redirect('api/login')
})
.get((req,res)=>{
res.render('cargarImagen.hbs', {user:'avatar'})
})

routerRegistro.get("/error_registro", (req,res)=>{
    res.render('error',{registro:'registro'})    
    })