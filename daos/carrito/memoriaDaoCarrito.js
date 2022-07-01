import { MemoriaContainer } from "../../contenedor/memoriaContenedor.js";
import { archivoProductos } from "../productos/archivoDaoProducto.js";
const arrayCarrito = [{ "productos": "", "id": 1, "timestamp": "29/6/2022, 23:5:1" }]
class MemoriaDaoContainer extends MemoriaContainer {
    constructor() {
        super(arrayCarrito)

    }
    async addProducts(id, body) {
        try {
            let cart = await this.read(id);
            let newProduct = await archivoProductos.read(body.id);
            cart[0].productos = [...cart[0].productos, newProduct[0]]

        } catch (err) {
            console.log(err)
        }
    }
    async readProducts(paramId) {
        try {
            let resultado = await this.read(paramId)
            let productsCart = resultado[0].productos;
            return (productsCart);
        }
        catch (err) {
            console.log(err)
        }
    }
    async deleteProducts(idCart, idProd){
        try {
           const carts =await this.read(idCart)
           const newProducts=carts[0].productos
           const deleteProduct=newProducts.filter(element=>element.id !== Number(idProd));
           carts[0].productos=deleteProduct
           

        } catch (err) {
           console.log(err) 
        }
    }
}


export const memoriaCarrito = new MemoriaDaoContainer()