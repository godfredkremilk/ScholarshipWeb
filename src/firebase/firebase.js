import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKaSnAjZeQkN3lG7RcBT71L--w6AmeJSo",
  authDomain: "scholarship-8e353.firebaseapp.com",
  projectId: "scholarship-8e353",
  storageBucket: "scholarship-8e353.appspot.com",
  messagingSenderId: "338237058435",
  appId: "1:338237058435:web:d5ea802cb1792feb25dab6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = getFirestore();
const storage = getStorage();

export { firebase, auth, firestore, storage };
