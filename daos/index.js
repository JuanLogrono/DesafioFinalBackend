


export let productClass
export let cartClass



    productClass = await import("./productos/mongoDaoProducto.js")
        .then(m => m.mongoProductos)
    cartClass = await import("./carrito/mongoDaoCarrito.js")
        .then(m => m.mongoCarrito)


