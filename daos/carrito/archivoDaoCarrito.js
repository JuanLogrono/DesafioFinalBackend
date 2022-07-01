import { ArchivoContainer } from "../../contenedor/archivoContenedor.js";
import { archivoProductos } from "../productos/archivoDaoProducto.js";

class ArchivoDaoCarrito extends ArchivoContainer {
    constructor() {
        super('./public/carrito.json')
    }
    async addProducts(id, body) {
        try {
            let cart = await this.read(id);
            let newProduct = await archivoProductos.read(body.id);
            cart[0].productos = [...cart[0].productos, newProduct[0]]
            await this.write(cart);


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
           await this.write(carts)

        } catch (err) {
           console.log(err) 
        }
    }
}

export const archivoCarrito = new ArchivoDaoCarrito()