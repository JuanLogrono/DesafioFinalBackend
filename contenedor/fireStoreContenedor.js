import { crearId } from "../logica/crearId.js";

crearId

export class FirebaseContainer {
    constructor(db, collection) {
        this.db = db
        this.query = this.db.collection(collection)
    }

    async createAdd(body) {
        try {
            const id=Number (await crearId(this.read()))
            let newProduct= {...body, id}
            const doc = this.query.doc(`${id}`);

            await doc.create(newProduct)
        }
        catch (error) {
            console.log(error)
        }
    }
    async read(param) {
        let respuesta
        try {
            if (param === undefined) {
                const productos = await this.query.get()
                let docs = productos.docs;
                respuesta = docs.map((doc) => (doc.data()))
            } else {
                let productFilter = await this.query.doc(param).get();
                respuesta = productFilter.data()
            }
            return respuesta
        }
        catch (error) {
            console.log(error)
        }
    }
    async update(param, body) {
        try {
            const doc= this.query.doc(param);
            await doc.update(body)
                           
        } catch (error) {
            console.log(error)
        }
    }
    async delete(param) {
        try {
            const doc = this.query.doc(param);
            await doc.delete()
        }
        catch (error) {
            console.log(error)
        }
    }

}