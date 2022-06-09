import express from "express";
import { carrito } from "../logica/cart.js";
import { authenticationMid, authorizationMid, } from '../logica/authorize.js'

const { Router } = express;

export const routerCart = Router()




routerCart.post('/',authenticationMid,authorizationMid, async (req, res) => {
    let idNewCart = await carrito.addCart()
    idNewCart = String(idNewCart)
    res.send(idNewCart)
})


routerCart.delete('/:id',authenticationMid,authorizationMid, async (req, res) => {
    let paramId = req.params.id
    res.send(await carrito.deleteCartById(paramId))
})


routerCart.route('/:id/productos', )
    .post(authenticationMid,authorizationMid,async (req, res) => {
        let cartId = Number(req.params.id);
        let productId=Number(req.body.productId)
        await carrito.addProductToCart(cartId,productId)
        res.send(await carrito.getCartById(cartId));
    })
    .get(authenticationMid,authorizationMid,async (req, res) => {
        let paramId = Number(req.params.id)
        res.send(await carrito.getCartById(paramId))
    });

    routerCart.delete('/:id/productos/:id_prod',authenticationMid,authorizationMid,async (req,res)=>{
        const cartParam=req.params.id;
        const productParam=Number(req.params.id_prod);
        await carrito.deleteProductsById(cartParam,productParam)
        res.send(await carrito.getCartById(cartParam))
    })