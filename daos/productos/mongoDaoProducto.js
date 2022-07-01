import mongoose from 'mongoose';
import { MongoContainer}  from '../../contenedor/mongoContenedor.js';
import { crearId } from '../../logica/crearId.js';

const productSchema = new mongoose.Schema(
    {
        nombre: { type: String },
        id: { type: String }
    }
)
export const products = mongoose.model('producto', productSchema)

const conexion = 'mongodb+srv://juanLogrono:Juan1234@cluster0.evzhzyt.mongodb.net/?retryWrites=true&w=majority';


class MongoDaoProductos extends MongoContainer{
    constructor(){
       super(conexion, products)
    }
    
}

export const mongoProductos = new MongoDaoProductos() 