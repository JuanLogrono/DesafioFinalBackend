import mongoose from 'mongoose';
import winstonLogger from '../config/winston.js';
import { crearId } from '../logica/crearId.js';


export class MongoContainer {
    constructor(connectionDir, model) {
        this.connectionDir = connectionDir
        this.model = model
    }
    mongoConnected() {
        mongoose.connect(this.connectionDir, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async createAdd(product) {
        try {
            this.mongoConnected()
            const id = await crearId(this.read());
            const newItem = { ...product, "id": id }
            const saveNew = this.model(newItem);
            await saveNew.save()
        }
        catch (err) {
            winstonLogger.error(err)
        }
    }

    async read(cod) {
        try {
            this.mongoConnected()
            let paramCod = (cod !== undefined) ? cod  : {}
            const verProductos =await this.model.find(paramCod,{_id:0,__v:0})      
            return verProductos
        } catch (error) {
            winstonLogger.error(error)
        }
    }
    
    async delete(param) {
        try {
            this.mongoConnected()
        await this.model.deleteOne({ id: param })
        }
        catch (error) {
            winstonLogger.error(error)
        }
    }
}
