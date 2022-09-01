import winstonLogger from "../config/winston.js";

export const crearId = async (allProduct) => {
    let id = 0
    let productos;
    try {
        let product = await allProduct
        if (product === "") productos = []
        else productos = product;

        if (productos.length === 0) id = 1
        else id = Number(productos[productos.length - 1].id) + 1;
        return id
    }
    catch(error){
         winstonLogger.error(error)
    }
}