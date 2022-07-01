import { MemoriaContainer } from "../../contenedor/memoriaContenedor.js"

let productos =[]

class MemoriaDaoContainer extends MemoriaContainer{
    constructor(){
        super(productos)
    }
}

export const memoriaProductos= new MemoriaDaoContainer()