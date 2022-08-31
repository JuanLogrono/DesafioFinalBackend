import express from "express";
import { uploader } from "../config/multer.js";
import passport from "../config/passport.js";
import { mongoUsers } from "../contenedor/mongoUser.js";

const {Router}= express;

export const routerRegistro = Router()


routerRegistro.get("/", (req,res)=>{
    res.render('registro.hbs',{titulo:'registro'})
})

routerRegistro.post("/", passport.authenticate('registro', { failureRedirect: 'api/error_registro' }), (req,res)=>{
    const username= req.body.username
    const{nombre,direccion,telefono,edad}=req.body
    const foto=username
    const body={nombre,direccion,telefono,edad,foto}
    mongoUsers.update(username,body)
    res.redirect('/api/registro/guardar_imagen')
})
routerRegistro.route('/guardar_imagen')
.post(uploader.single(`avatar`),(req,res)=>{
    res.send('api/login')
})
.get((req,res)=>{

res.render('cargarImagen.hbs', {user:'avatar'})
})

routerRegistro.get("/error_registro", (req,res)=>{
    res.render('error',{registro:'registro'})    
    })