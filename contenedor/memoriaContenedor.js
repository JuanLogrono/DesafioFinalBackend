

export class MemoriaContainer {
    constructor(arrayProductos) {
        this.arrayProductos = arrayProductos
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