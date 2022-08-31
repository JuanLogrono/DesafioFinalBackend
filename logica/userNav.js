import { mongoUsers } from "../contenedor/mongoUser.js";

export const dataUser=async (users)=>{
    const usuario= await mongoUsers.findUser(users)
    const {nombre, username, direccion, foto, edad} = usuario[0];
    const datos={nombre, username, direccion, foto, edad}
    return datos
}