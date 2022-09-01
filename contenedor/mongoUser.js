
import mongoose from "mongoose";
import { conexion } from "../config/mongoConfig.js";
import winstonLogger from "../config/winston.js";


const userSchema = new mongoose.Schema(
    {
        nombre: { type: String },
        password: { type: String },
        username: { type: String },
        direccion:{type:String},
        edad: { type: Number},
        telefono: {type: String},
        foto: {type:String}
    }
)

const usuarios = mongoose.model('usuario', userSchema);




class MongoUser {
    constructor() {
        this.connection = conexion
        this.model = usuarios
    }
    mongoConnected() {
        mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async addUser(user) {
        try {
            this.mongoConnected()
            const saveNew = this.model(user);
            await saveNew.save()
        }
        catch (err) {
           winstonLogger.error(err)
        }
    }
    async findUser(username) {
        try {
            this.mongoConnected()
            const filterUser = this.model.find({ username: username })
            return filterUser
        } catch (error) {
            winstonLogger.error(error)
        }
    }
    async update(username, body) {
        try {
            this.mongoConnected()
            await this.model.updateOne({ username: username }, { $set: body })
        } catch (error) {
            winstonLogger.error(error)
        }
    }
}
export const mongoUsers = new MongoUser()