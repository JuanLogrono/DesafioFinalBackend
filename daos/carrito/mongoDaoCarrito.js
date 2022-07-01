import { carrito, conexion } from '../../config/mongoConfig.js';
import { MongoContainer } from '../../contenedor/mongoContenedor.js';
import { mongoProductos } from '../productos/mongoDaoProducto.js';

class MongoDaoCarrito extends MongoContainer {
    constructor() {
        super(conexion, carrito)
    }
    
    async addProducts(param, body) {
        try {
            this.mongoConnected();
            const cart = await this.read(param);
            const productoAgregado = await mongoProductos.read(body.id)
            const add = [...cart[0].productos, productoAgregado[0]]
            await carrito.updateOne({ id: param }, { $set: { productos: add } })
        } catch (error) {
            console.log(error)
        }
    }
    async readProducts(param) {
        try {
            this.mongoConnected()
            const cart = await this.read(param)
            const cartProducts = cart[0].productos
            return cartProducts
        }
        catch (error) {
            console.log(error)
        }
    }
    async deleteProducts(param, paramProd) {
        try {
            const deleteProd = await this.readProducts(param)
            const add = deleteProd.filter((e)=>e.id !== paramProd)
            await carrito.updateOne({ id: param }, { $set: { productos: add } })
        }
        catch(error){
            console.log(error)
        }

        }
}

    export const mongoCarrito = new MongoDaoCarrito()