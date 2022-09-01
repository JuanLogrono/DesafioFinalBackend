import { carrito, conexion } from '../../config/mongoConfig.js';
import winstonLogger from '../../config/winston.js';
import { MongoContainer } from '../../contenedor/mongoContenedor.js';
import { mongoProductos } from '../productos/mongoDaoProducto.js';
class MongoDaoCarrito extends MongoContainer {
    constructor() {
        super(conexion, carrito)
    }
    
    async addProducts(param, body) {
        try {
            this.mongoConnected();
            const cart = await this.read({username:param});
            const productoAgregado = await mongoProductos.read({id:body})

            const add = [...cart[0].productos, productoAgregado[0]]
            await carrito.updateOne({ username: param }, { $set: { productos: add } })
        } catch (error) {
             winstonLogger.error(error)
        }
    }
    async readProducts(param) {
        try {
            this.mongoConnected()
            const cart = await this.read({username:param})
            const cartProducts = cart[0]
            return cartProducts
        }
        catch (error) {
             winstonLogger.error(error)
        }
    }
    async deleteProducts(param, paramProd) {
        try {
            const deleteProd = await this.readProducts({username:param})
            const add = deleteProd.filter((e)=>e.id !== paramProd)
            await carrito.updateOne({ id: param }, { $set: { productos: add } })
        }
        catch(error){
             winstonLogger.error(error)
        }

        }
}

    export const mongoCarrito = new MongoDaoCarrito()