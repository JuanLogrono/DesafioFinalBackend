import { conexion, products } from '../../config/mongoConfig.js';
import winstonLogger from '../../config/winston.js';
import { MongoContainer}  from '../../contenedor/mongoContenedor.js';


class MongoDaoProductos extends MongoContainer{
    constructor(){
       super(conexion, products)
    }
    async update(param, body) {
        try {
            this.mongoConnected()
            await products.updateOne({ id: param }, { $set: body })
        } catch (error) {
             winstonLogger.error(error)
        }
    }
    
}

export const mongoProductos = new MongoDaoProductos() 