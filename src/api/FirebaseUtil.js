import {
  collection,
  query,
  orderBy,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, firestore, storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'))
    );
    const retrievedPosts = await Promise.all(
      querySnapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();
        const userDocRef = doc(firestore, 'users', postData.userId);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.exists() ? userDocSnap.data() : null;
        return { ...postData, user: userData, id: postDoc.id, likes: [] };
      })
    );
    return retrievedPosts;
  } catch (error) {
    console.error('Error fetching posts: ', error);
    throw error;
  }
};

export const addPost = async (content, mediaFile) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('User not authenticated.');
      return;
    }

    const postData = {
      content,
      timestamp: serverTimestamp(),
      userId: user.uid,
      mediaUrl: '',
      likes: [],
      comments: [], // Add a comments field to the post data
    };

    const postRef = await addDoc(collection(firestore, 'posts'), postData);

    if (mediaFile) {
      const storageRef = ref(storage, `posts/${postRef.id}/${mediaFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, mediaFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          console.error('Error uploading media file: ', error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(postRef, { mediaUrl: downloadUrl });
          console.log('Media file uploaded successfully!');
        }
      );
    }

    console.log('Post added successfully!');
  } catch (error) {
    console.error('Error adding post: ', error);
    throw error;
  }
};

export const updateLikeCount = async (postId, likeCount) => {
  try {
    const postRef = doc(firestore, 'posts', postId);
    await updateDoc(postRef, { likes: likeCount.toString() }); 
  } catch (error) {
    console.error('Error updating like count: ', error);
    throw error;
  }
};

export const updateComment = async (postId, comments) => {
  try {
    const postRef = doc(firestore, 'posts', postId);
    await updateDoc(postRef, { comments: [...comments] });
  } catch (error) {
    console.error('Error updating comments: ', error);
    throw error;
  }
};
