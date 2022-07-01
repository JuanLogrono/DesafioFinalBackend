import { db } from '../../config/fireStoreConfig.js';
import { FirebaseContainer } from '../../contenedor/fireStoreContenedor.js';
import { firebaseProductos } from '../productos/fireStoreDaoProducto.js';


class FirebaseDaoContainer extends FirebaseContainer {
    constructor() {
        super(db, 'carrito')
    }

    async addProducts(param, body) {
        try {
            const doc = await this.read(param)
            const newProduct = await firebaseProductos.read(body.id)
            const add = [...doc.productos, newProduct]
            console.log(newProduct)
            
            await this.query.doc(param).update({ "productos": add })
        }
        catch (error) {
            console.log(error)
        }
    }
    async readProducts(param) {
        try {
            const productView = await this.read(param)
            const mostrar = productView.productos
            return mostrar
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProducts(param, productParam) {
        try {
            const cart = await this.read(param)
            const productSave = cart.productos.filter((e) => e.id !== Number(productParam))
            await this.query.doc(param).update({ "productos": productSave })

        } catch (error) {
            console.log(error)
        }
    }
}

export const firebaseCarrito = new FirebaseDaoContainer()