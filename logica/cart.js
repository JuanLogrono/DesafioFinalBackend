import fs from 'fs';
import { products } from './products.js';

export class Carrito {
    constructor(urlCart) {
        this.urlCart = urlCart
    }
    async write(cart) {
        let reWrite = await fs.promises.writeFile(this.urlCart, JSON.stringify(cart));
        return reWrite
    };

    async getAllCart() {
        try {
            let carts = await fs.promises.readFile(this.urlCart, 'utf-8');
            carts = JSON.parse(carts)
            return (carts)
        }
        catch (err) {
            console.log(err)
        }
    }
    async cartById(id) {
        let carrito = await this.getAllCart();
        let resultado = carrito.filter(element => element.id == id);
        return resultado
    }

    async getCartById(paramId) {
        try {
            let resultado = await this.cartById(paramId)
            let productsCart = resultado[0].productos;
            return (resultado.length === 0) ? "carrito inexistente" : productsCart;
        }
        catch (err) {
            console.log(err)
        }

    }
    async addCart() {
        let id = 0
        let carritos;
        const time= new Date()
        let timestamp =`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        let nuevoObjeto = {}
        try {
            let carts = await this.getAllCart()
            if (carts === "") carritos = []
            else carritos = carts;

            if (carritos.length === 0) id = 1
            else id = Number(carritos[carritos.length - 1].id) + 1;
            nuevoObjeto = { id, timestamp, 'productos': "" }
            carritos = [...carritos, nuevoObjeto]
            await this.write(carritos)
            return (nuevoObjeto.id)
        }
        catch (err) {
            console.log(err)
            this.write([{ "id": 1001, timestamp, 'productos': '' }]);
            return (1001);
        }
    }

    async deleteCartById(paramId) {
        try {
            let carts = await this.getAllCart()
            let resultado = carts.filter(element => element.id !== paramId)
            this.write(resultado)
            return "Elemento Eliminado"
        }

        catch (err) {
            console.log(err)
        }
    };

    async addProductToCart(cartId,productId) {
        try {
            let cart = await this.getAllCart();
            let filterCart=cart.filter(element=>element.id==cartId)
            let newProduct = await products.getById(productId);
            filterCart[0].productos=[...filterCart[0].productos,newProduct[0]]
            await this.write(cart);


        } catch (err) {
            console.log(err)
        }
    }
    async deleteProductsById(idCart, idProd){
        try {
           const carts =await this.getAllCart()
           let i = carts.findIndex((response)=>response.id==idCart)
           const newProducts=carts[i].productos
           const deleteProduct=newProducts.filter(element=>element.id !== idProd);
           carts[i].productos=deleteProduct
           await this.write(carts)

        } catch (err) {
           console.log(err) 
        }
    }

}


export const carrito = new Carrito('./public/carrito.json')