import { enviarMail } from "../config/nodemailer.js";


export const mailRegistro=(user)=>{
    
    const {username, nombre, edad, telefono,direccion}=user[0];
    const asunto = 'Nuevo Registro'
    const cuerpoMail = `<ul>
    <li>Nombre: ${nombre}</li>
    <li>E-mail: ${username}</li>
    <li>Edad: ${edad}</li>
    <li>Teléfono: ${telefono}</li>
    <li>Dirección: ${direccion}</li>
    </ul>`
    enviarMail(asunto,cuerpoMail)
}



export const mailPedido = (user,productsView)=>{
    const asunto = `Nuevo pedido ${user.nombre} ${user.username}`
    const listaProd= productsView.productos
    let lista=""
    listaProd.map((e)=>{
        lista+=`<li>${e.nombre}  $${e.precio}</li>`
    })
    const cuerpoMail = `<strong>Productos seleccionados:</strong> <ul>${lista}</ul>`
    enviarMail(asunto,cuerpoMail)
}
