import fs from 'fs'


export class Products {
    constructor(urlProducts) {
        this.urlProducts = urlProducts;
    }
    async write(product) {
        let reWrite = await fs.promises.writeFile(this.urlProducts, JSON.stringify(product));
        return reWrite
    };

    async getAll() {
        try {
            let prod = await fs.promises.readFile(this.urlProducts, 'utf-8');
            prod = JSON.parse(prod)
            return (prod)
        }
        catch (err) {
            console.log(err)
        }
    }
    async getById(id) {
        try {
            let productos = await this.getAll();
            let resultado = productos.filter(element => element.id === id);
            return (resultado.length === 0) ? "producto inexistente" : resultado;
        }
        catch (err) {
            console.log(err)
        }
    }
    async addProduct(newProduct) {
        let id = 0
        let productos;
        const time= new Date();
        let timestamp =`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        try {
            let product = await this.getAll()
            if (product === "") productos = []
            else productos = product;

            if (productos.length === 0) id = 1
            else id = Number(productos[productos.length - 1].id) + 1;
            let nuevoObjeto = { ...newProduct, id, timestamp }
            productos = [...productos, nuevoObjeto]
            await this.write(productos)
            return ("producto cargado con éxito")
        }
        catch (err) {
            console.log(err)
            this.write([{ ...newProduct, "id": 1, timestamp }])
        }
    }

    async deleteById(id) {
        try {
            let productos = await this.getAll()
            let resultado = productos.filter(element => element.id !== id)
            this.write(resultado)
            return ("Elemento Eliminado")
        }

        catch (err) {
            console.log(err)
        }
    };
    async changeProductById(paramId, nombre, descripción, código, foto, precio, stock) {
        try {
            const allProducts = await this.getAll()
            let i = allProducts.findIndex((producto) => producto.id === paramId);
            (nombre) ? allProducts[i].nombre = nombre : null;
            (descripción) ? allProducts[i].descripción = descripción : null;
            (código) ? allProducts[i].código = código : null;
            (foto) ? allProducts[i].foto = foto : null;
            (precio) ? allProducts[i].precio = precio : null;
            (stock) ? allProducts[i].stock = stock : null;
            await this.write(allProducts)
        }
        catch(err){
            console.log(err)
        }
        }
};

export const products = new Products('./public/productos.json')