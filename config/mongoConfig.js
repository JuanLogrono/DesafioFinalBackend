import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
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

const carritoSchema = new mongoose.Schema(
    {
        timeStamp: { type: Date },
        id: { type: String },
        productos: { type: Array }
    }
)
export const carrito = mongoose.model('carrito', carritoSchema)

export const products = mongoose.model('producto', productSchema)

export const conexion = 'mongodb+srv://juanLogrono:Juan1234@cluster0.evzhzyt.mongodb.net/?retryWrites=true&w=majority';
