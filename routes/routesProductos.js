import express from 'express';
import {productClass} from '../daos/index.js';
const { Router } = express;

export const routerProductos = Router();

routerProductos.get('/:id?',async (req,res)=>{
    const param= req.params.id;
  if(!param)  res.send(await productClass.read())
  else res.send(await productClass.read(param))
});



routerProductos.route('/:id')
.put(async(req,res)=>{
    const param= req.params.id;
    const nuevo=req.body
    await productClass.update(param,nuevo)
    res.send(await productClass.read(param) );
})
.delete(async (req,res)=>{
   const param= req.params.id;
   await productClass.delete(param)
res.send (await productClass.read())
})

routerProductos.post('/',(req,res)=>{
    const product =req.body

    const newProduct={...product,timestamp:new Date()}
    console.log(productClass.createAdd(newProduct));
    res.send(`Producto agregado con éxito`)
})