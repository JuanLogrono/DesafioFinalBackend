import { routerProducts } from './routes/routesProducts.js'
import { routerCart } from './routes/routesCart.js';

import express from 'express';

export const app = express();


app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/carrito', routerCart)
app.use('/api/productos', routerProducts);

app.use((req, res) => {
    res.status(404).send({
        error: 404,
        descripción: `ruta ${req.url}, método ${req.method} no implementada`
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
});