//import mongoose from 'mongoose';
import { conexion, products } from '../../config/mongoConfig.js';
import { MongoContainer}  from '../../contenedor/mongoContenedor.js';



/* const productSchema = new mongoose.Schema(
    {
        "id": {type:String},
        "timestamp": {type:Date},
        "nombre": {type:String},
        "descripción": {type:String},
        "código": {type:String},
        "foto": {type:String},
        "precio": {type:Number},
        "stock": {type:Number}
    }
)
export const products = mongoose.model('producto', productSchema)

const conexion = 'mongodb+srv://juanLogrono:Juan1234@cluster0.evzhzyt.mongodb.net/?retryWrites=true&w=majority';

 */
class MongoDaoProductos extends MongoContainer{
    constructor(){
       super(conexion, products)
    }
    async update(param, body) {
        try {
            this.mongoConnected()
            await products.updateOne({ id: param }, { $set: body })
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const mongoProductos = new MongoDaoProductos() 