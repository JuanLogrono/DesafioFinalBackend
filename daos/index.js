

 
 const dataBase=process.env.MOTOR

export let productClass
export let cartClass


if (dataBase === "mongoDB") {
    productClass = await import("./productos/mongoDaoProducto.js")
        .then(m => m.mongoProductos)
    cartClass = await import("./carrito/mongoDaoCarrito.js")
        .then(m => m.mongoCarrito)
}
else if (dataBase === 'Firebase') {
    productClass = await import("./productos/fireStoreDaoProducto.js")
        .then(m => m.firebaseProductos)
    cartClass = await import("./carrito/fireStoreDaoCarrito.js")
        .then(m => m.firebaseCarrito)
}
else if (dataBase === "archivo") {
    productClass = await import("./productos/archivoDaoProducto.js")
        .then(m => m.archivoProductos)
    cartClass = await import("./carrito/archivoDaoCarrito.js")
        .then(m => m.archivoCarrito)
} else if (dataBase === "memoria") {
    productClass = await import("./productos/archivoDaoProducto.js")
        .then(m => m.memoriaProductos)
    cartClass = await import("./carrito/archivoDaoCarrito.js")
        .then(m => m.memoriaCarrito)
} else {
    console.error("error en conexión a base de datos")
}

