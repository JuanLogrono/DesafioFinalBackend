import { db } from '../../config/fireStoreConfig.js';
import { FirebaseContainer } from '../../contenedor/fireStoreContenedor.js';



class FirebaseDaoContainer extends FirebaseContainer {
    constructor() {
        super(db, 'productos')
    }
}

export const firebaseProductos = new FirebaseDaoContainer()