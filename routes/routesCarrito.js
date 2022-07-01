import express from "express";
import { cartClass } from "../daos/index.js";


const { Router } = express;

export const routerCarrito = Router()

routerCarrito.post('/',(req,res)=>{
    const addObj={
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

routerCarrito.route('/:id/productos')
.post((req,res)=>{
    const param=req.params.id;
   const body=req.body
   cartClass.addProducts(param,body)
    res.send('producto agregado')
})
.get(async (req,res)=>{
    const param= req.params.id
    const productsView= await cartClass.readProducts(param)
    res.send(productsView)
})

routerCarrito.delete('/:id/productos/:id_prod',(req,res)=>{
    const param=req.params.id;
    const productParam=req.params.id_prod
    cartClass.deleteProducts(param,productParam)
    res.send(`producto ${productParam} eliminado del carrito ${param}`)
})