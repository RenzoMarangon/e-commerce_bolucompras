/*import firebase*/
import db,{ app } from './firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, userRegByMail  } from 'firebase/auth';

/*Guardo los datos de la consola en fireStore*/
const userRegister = async( userId, userData ) => {

    const userCollection = collection(db,'users');
    const userDoc = doc( db, 'users', userId )
    const addUserToFirestore = await setDoc( userDoc, userData )
}

export { userRegister };