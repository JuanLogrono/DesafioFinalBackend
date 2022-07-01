import { arrayCarrito } from "../../config/memoriaConfig.js";
import { MemoriaContainer } from "../../contenedor/memoriaContenedor.js";
import { archivoProductos } from "../productos/archivoDaoProducto.js";

class MemoriaDaoContainer extends MemoriaContainer {
    constructor() {
        super(arrayCarrito)

    }
 async  addProducts(id, body) {
            let cart =  this.read(id);
            let newProduct =await archivoProductos.read(body.id);
            console.log(newProduct)
            cart[0].productos = [...cart[0].productos, newProduct[0]]

            }
     readProducts(paramId) {
            let resultado = this.read(paramId)
            let productsCart = resultado[0].productos;
            return (productsCart);
    
    }
    deleteProducts(idCart, idProd){
           const carts = this.read(idCart)
           const newProducts=carts[0].productos
           const deleteProduct=newProducts.filter(element=>element.id !== Number(idProd));
           carts[0].productos=deleteProduct
    }
}


export const memoriaCarrito = new MemoriaDaoContainer()