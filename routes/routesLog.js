import express from "express";
import { enviarMail } from "../config/nodemailer.js";
import passport from "../config/passport.js";
import winstonLogger from "../config/winston.js";

const {Router}= express;

export const routerLog = Router()


routerLog.get("/",(req,res)=>{
    res.render('log.hbs',{in:true,titulo:"login"})
    
});
routerLog.post("/", passport.authenticate('auth', { failureRedirect: 'api/login/error_login' }),(req,res)=>{
    res.redirect('/api/productos')
})
routerLog.get("/error_login", (req,res)=>{
    res.render('error')
});

routerLog.get('/log_out',(req,res)=>{
    const nombre=req.session.passport.user
   req.session.destroy(err=>{
    winstonLogger.error((err)?err:'log out')
   })
    res.render("log.hbs",{nombre:nombre,in:false,titulo:"log out"})
});