import express from 'express';
import { authenticationMid, authorizationMid } from '../logica/authorize.js';
import { products } from '../logica/products.js';

const { Router } = express;

export const routerProducts = Router();


routerProducts.get('/:id?',authenticationMid, authorizationMid, async (req, res) => {
    let param = Number(req.params.id);
    if (Number.isNaN(param)) res.send(await products.getAll())
    else res.send(await products.getById(param))
})
routerProducts.route('/:id')
    .put(authenticationMid, authorizationMid, async (req, res) => {
        let nombre = req.body.nombre;
        let precio = req.body.precio;
        let foto = req.body.foto;
        let stock = req.body.stock;
        let descripción = req.body.descripción;
        let código = req.body.código

        const paramId = Number(req.params.id)
        await products.changeProductById(paramId, nombre, descripción, código, foto, precio, stock)
        res.send(await products.getById(paramId))
    })
    .delete(authenticationMid, authorizationMid, async (req, res) => {
        let param = Number(req.params.id);
        await products.deleteById(param);
        res.send('producto eliminado')
    });

routerProducts.post('/',authenticationMid, authorizationMid, async (req, res) => {
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let foto = req.body.foto;
    let stock = req.body.stock;
    let descripción = req.body.descripción;
    let código = req.body.código

    let newProduct = { nombre, descripción, código, foto, precio, stock }

    res.send(await products.addProduct(newProduct))
});

