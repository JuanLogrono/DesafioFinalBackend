import fs from 'fs'
import { crearId } from '../logica/crearId.js';


export class ArchivoContainer {
    constructor(urlProducts) {
        this.urlProducts = urlProducts;
    }
    async write(product) {
        let reWrite = await fs.promises.writeFile(this.urlProducts, JSON.stringify(product));
        return reWrite
    };

    async read(id) {
        try {
            let prod = await fs.promises.readFile(this.urlProducts, 'utf-8');
            let product = (prod === "") ? {} : JSON.parse(prod)
            if (id !== undefined) {
                product = product.filter(element => element.id === Number(id));
            }
            return (product.length === 0) ? "producto inexistente" : product;
        }
        catch (err) {
            console.log(err)
        }
    }
    async createAdd(newProduct) {
        let id;
        const time = new Date();
        let timestamp = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        try {
            let productos = await this.read();
            id = await crearId(this.read())
            let nuevoObjeto = { ...newProduct, id, timestamp }
            productos = [...productos, nuevoObjeto]
            await this.write(productos)
        }
        catch (err) {
            console.log(err)
            this.write([{ ...newProduct, "id": 1, timestamp }])
        }
    }

    async delete(id) {
        try {
            let productos = await this.read()
            let resultado = productos.filter(element => element.id !== Number(id))
            this.write(resultado)
            return ("Elemento Eliminado")
        }

        catch (err) {
            console.log(err)
        }
    };
}; 

