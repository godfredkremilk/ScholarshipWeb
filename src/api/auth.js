// auth.js
import { auth, firestore } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, collection, doc } from 'firebase/firestore';

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email, password, firstName, lastName, company) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const usersCollection = collection(firestore, 'users');
    const userDocRef = doc(usersCollection, user.uid);
    
    const userDetails = {
      email,
    };
    
    await setDoc(userDocRef, userDetails);
    
    return user;
  } catch (error) {
    throw error;
  }
};

