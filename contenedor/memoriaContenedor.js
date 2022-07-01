

export class MemoriaContainer {
    constructor(arrayProductos) {
        this.arrayProductos = arrayProductos
    }
    createAdd(newProduct) {
        const i = this.arrayProductos.length;
        let id = (i < 1) ? 1 : this.arrayProductos[i - 1].id + 1;
        const time = new Date();
        let timestamp = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        let nuevoObjeto = { ...newProduct, id, timestamp }
        this.arrayProductos.push(nuevoObjeto)
        return ("producto cargado con éxito")
    }

    read(id) {
        let prod = this.arrayProductos
        let product = (prod === "") ? {} : prod
        if (id !== undefined) {
            product = product.filter(element => element.id === Number(id));
        }
        return (product.length === 0) ? "producto inexistente" : product;
    }
   

}