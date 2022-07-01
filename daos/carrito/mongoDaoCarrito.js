import mongoose from 'mongoose';
import { MongoContainer } from '../../contenedor/mongoContenedor.js';
import { crearId } from '../../logica/crearId.js';
import { mongoProductos } from '../productos/mongoDaoProducto.js';

const carritoSchema = new mongoose.Schema(
    {
        timeStamp: { type: Date },
        id: { type: String },
        productos: { type: Array }
    }
)
export const carrito = mongoose.model('carrito', carritoSchema)

const conexion = 'mongodb+srv://juanLogrono:Juan1234@cluster0.evzhzyt.mongodb.net/?retryWrites=true&w=majority';


class MongoDaoCarrito extends MongoContainer {
    constructor() {
        super(conexion, carrito)
    }
    async createAdd(product) {
        try {
            this.mongoConnected()
            const id = await crearId(this.read());
            const newCart = { ...product, "id": id }
            const saveNew = carrito(newCart);
            await saveNew.save()
        }
        catch (err) {
            console.log(err)
        }
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