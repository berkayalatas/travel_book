import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { initializeApp } from "firebase/app";

const firebaseConfig =  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
});


export const db = firebase.firestore(firebaseConfig);
export const auth = getAuth(firebaseConfig);
export default firebaseConfig;
// const app = initializeApp(firebaseConfig);
//export const db = getDatabase(app);

