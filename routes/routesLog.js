import express from "express";
import passport from "../config/passport.js";

const {Router}= express;

export const routerLog = Router()


routerLog.get("/",(req,res)=>{
    res.render('log.hbs',{in:true,titulo:"login"})
    
});
routerLog.post("/", passport.authenticate('auth', { failureRedirect: '/error_login' }),(req,res)=>{
    res.redirect('/api/productos')
})
routerLog.get("/error_login", (req,res)=>{
    res.render('error')
});