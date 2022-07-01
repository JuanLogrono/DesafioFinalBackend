import { productos } from "../../config/memoriaConfig.js"
import { MemoriaContainer } from "../../contenedor/memoriaContenedor.js"

class MemoriaDaoContainer extends MemoriaContainer{
    constructor(){
        super(productos)
    }
    delete(id) {
        let productos = this.read()
        let resultado = productos.filter(element => element.id !== Number(id))
        this.arrayProductos = resultado
        console.log(this.arrayProductos)
        return ("Elemento Eliminado")
    }
    update(paramId, body) {
        const allProducts = this.arrayProductos;
        let i = allProducts.findIndex((producto) => producto.id === Number(paramId));
        (body.nombre) ? allProducts[i].nombre = body.nombre : null;
        (body.descripción) ? allProducts[i].descripción = body.descripción : null;
        (body.código) ? allProducts[i].código = body.código : null;
        (body.foto) ? allProducts[i].foto = body.foto : null;
        (body.precio) ? allProducts[i].precio = body.precio : null;
        (body.stock) ? allProducts[i].stock = body.stock : null; 
    }
}

export const memoriaProductos= new MemoriaDaoContainer()