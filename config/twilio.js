import twilio from 'twilio';
import winstonLogger from './winston.js';
//completar con account SID auth Token y los numeros de twilio y de destino
const accountSid = ''
const AuthToken = ''
const twilioNumber = ''
const verifyNumber= ''
const twilioNumberWSP = 'whatsapp:';
const verifyNumberWSP = 'whatsapp:';

const client = twilio(accountSid,AuthToken)

export const enviarSMS =async (SMSbody,tel)=>{
try {
    const mensaje= await client.messages.create({
        body: SMSbody,
        from: twilioNumber,
        to: tel || verifyNumber 
    })
    winstonLogger.info(mensaje)
} catch (error) {
    winstonLogger.error(error)
}
}

export const enviarWSP =async(body)=>{
try{
       const mensaje= await client.messages.create({
        body: body,
        from: twilioNumberWSP,
        to: verifyNumberWSP
    })
    winstonLogger.info(mensaje)
} catch (error) {
    winstonLogger.error(error)
}
}
