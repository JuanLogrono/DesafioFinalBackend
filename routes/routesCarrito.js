import express from "express";
import { cartClass } from "../daos/index.js";
import { dataUser } from "../logica/userNav.js";


const { Router } = express;

export const routerCarrito = Router()

routerCarrito.use((req,res,next)=>{
    if(req.session.passport) next()
    else res.redirect('api/login')
})

routerCarrito.post('/',(req,res)=>{
    const username= req.session.passport.user
    const addObj={
        username: username,
        productos:[],
        timestamp: Date()
    }
    cartClass.createAdd(addObj)  
    res.send("carrito creado")
})

routerCarrito.delete('/:id',(req,res)=>{
    const param=req.params.id;
    cartClass.delete(param)
    res.send(`eliminado id ${param}`)
})

routerCarrito.route('/:user/productos')
.post((req,res)=>{
    const param=req.params.user;
   const body=Number(req.body.id)
   cartClass.addProducts(param,body)
    res.redirect('/api/productos')
})
.get(async (req,res)=>{
    const userData= await dataUser(req.session.passport.user)
    const param= req.params.user
    const productsView= await cartClass.readProducts(param)
    const {productos,id} = productsView
    res.render('carrito',{productos,id, userData, boton:true})
})

routerCarrito.delete('/:id/productos/:id_prod',(req,res)=>{
    const param=req.params.id;
    const productParam=req.params.id_prod
    cartClass.deleteProducts(param,productParam)
    res.send(`producto ${productParam} eliminado del carrito ${param}`)
})