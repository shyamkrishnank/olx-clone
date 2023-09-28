
import {initializeApp} from 'firebase/app'
import 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage'
import { getStorage,  } from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJhox7nNGTMin2vT-AMvun7dPmK4ckVQo",
    authDomain: "my-project-8788f.firebaseapp.com",
    projectId: "my-project-8788f",
    storageBucket: "my-project-8788f.appspot.com",
    messagingSenderId: "266190021073",
    appId: "1:266190021073:web:0cf31e3d09a221dbec00f0",
    measurementId: "G-78DL5DTEQQ"
  };

const firebase = initializeApp(firebaseConfig)
export const storage = getStorage(firebase);
export const firestore = getFirestore(firebase)
export default firebase