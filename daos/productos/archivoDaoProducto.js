import { ArchivoContainer } from "../../contenedor/archivoContenedor.js";

class ArchivoDaoContainer extends ArchivoContainer{
    constructor(){
        super('./public/productos.json')
    }
    async update(paramId, body) {
        try {
            const allProducts = await this.read()
            let i = allProducts.findIndex((producto) => producto.id === Number(paramId));
            (body.nombre) ? allProducts[i].nombre = body.nombre : null;
            /*  (body.descripción) ? allProducts[i].descripción = body.descripción : null;
             (body.código) ? allProducts[i].código = body.código : null;
             (body.foto) ? allProducts[i].foto = body.foto : null;
             (body.precio) ? allProducts[i].precio = body.precio : null;
             (body.stock) ? allProducts[i].stock = body.stock : null; */
            await this.write(allProducts)
        }
        catch (err) {
            console.log(err)
        }
    }

}

export const archivoProductos= new ArchivoDaoContainer()