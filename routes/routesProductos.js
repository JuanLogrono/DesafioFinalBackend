import express from 'express';
import winstonLogger from '../config/winston.js';
import {productClass} from '../daos/index.js';
import { dataUser } from '../logica/userNav.js';


const { Router } = express;



export const routerProductos = Router();
routerProductos.use((req,res,next)=>{
    if(req.session.passport) next()
    else res.redirect('/api/login')
})

routerProductos.get('/:id?',async (req,res)=>{
    
    const param= req.params.id;
    const userData= await dataUser(req.session.passport.user)
    let r;
    if(!param){
        r = await productClass.read()
    }else{ r= await productClass.read({id:param})}
    let respuesta=[];
    r.forEach(element => {
        respuesta.push({codigo:element.codigo,
                        id:element.id,
                        nombre:element.nombre,
                        descripcion:element.descripcion,
                        precio:element.precio,
                        foto:element.foto
                        })
    });
    const carritoDir= `/api/carrito/${req.session.passport.user}/productos`
    
     res.render('productos.hbs',{respuesta,carritoDir,userData,boton:true})
    
     
});



routerProductos.route('/:id')
.put(async(req,res)=>{
    const param= req.params.id;
    const nuevo=req.body
    await productClass.update(param,nuevo)
    res.send(await productClass.read({id:param}) );
})
.delete(async (req,res)=>{
   const param= req.params.id;
   await productClass.delete(param)
res.send (await productClass.read())
})

routerProductos.post('/',(req,res)=>{
    const product =req.body

    const newProduct={...product,timestamp:new Date()}
    winstonLogger.info(productClass.createAdd(newProduct));
    res.send(`Producto agregado con éxito`)
})