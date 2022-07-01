import app from 'firebase-admin'
import serviceAccount from '../ecommerce-backend-4c1ee-firebase-adminsdk-1td59-2b49c0c5c8.json'assert {type: 'json'}


app.initializeApp({
    credential: app.credential.cert(serviceAccount),
    databaseURL: 'http://ecommerce-backend-4c1ee.firebaseio.com'
})

export const db = app.firestore();