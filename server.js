import express from 'express'
import { routerProductos } from './routes/routesProductos.js';
import { routerCarrito } from './routes/routesCarrito.js';
import { routerLog } from './routes/routesLog.js';
import { routerRegistro } from './routes/routesRegistro.js';
import { engine } from 'express-handlebars';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo"
import path from 'path'
const app = express();



app.use(express.static('./public'));



//session

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        
        mongoUrl: 'mongodb+srv://juanLogrono:Juan1234@cluster0.evzhzyt.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: "mongoSecreto",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}))
//handlebars
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: 'main.hbs', 
    })
    );
    app.set("views", path.resolve("public", "views_hbs"));
    app.set("view engine", "hbs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    //rutas
    
    app.use('/api/registro',routerRegistro)
    app.use('/api/login',routerLog)
    app.use('/api/carrito', routerCarrito)
    app.use('/api/productos', routerProductos);
    
    
    app.use((error, req, res, next) => {
        res.status(500).send(error.message);
    });



    app.use((req, res) => {
    res.status(404).send({
        error: 404,
        descripción: `ruta ${req.url}, método ${req.method} no implementada`
    })
})



const PORT= process.env.PORT|| 8080
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})