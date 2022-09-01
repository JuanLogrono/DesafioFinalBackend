import nodemailer from "nodemailer";
import winstonLogger from "./winston.js";

//ingresar usuario y contraseña
const mailAdmin={user: '',
                pass: ''}
const transporter =nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: mailAdmin,
    tls: {
        rejectUnauthorized: false
      }
});

export const enviarMail= async(asunto,datos)=>{
   try {
    const info= await transporter.sendMail({
        from:'servidor Node.js',
        to: mailAdmin.user,
        subject: asunto,
        html: datos,
        
    })
   winstonLogger.info(info)}
   catch(error){
        winstonLogger.error(error)
   }
}