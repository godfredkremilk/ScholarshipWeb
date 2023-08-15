import {  collection, doc, getDoc } from 'firebase/firestore';
import {firestore } from '../firebase/firebase';


// Get user document by ID
export const getUserById = async (userId) => {
  try {
    const userRef = doc(collection(firestore, 'users'), userId);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log('Error getting user profile:', error);
    throw error;
  }
};
