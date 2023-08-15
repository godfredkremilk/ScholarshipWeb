import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { FiThumbsUp, FiMessageSquare, FiSend } from 'react-icons/fi';

const ProfileContent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentPostId, setCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'posts'), async (snapshot) => {
      const retrievedPosts = await Promise.all(
        snapshot.docs.map(async (postDoc) => {
          const postData = postDoc.data();
          const userDocRef = doc(firestore, 'users', postData.userId);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.exists() ? userDocSnap.data() : null;
          return { ...postData, user: userData, id: postDoc.id, likes: [] };
        })
      );
      
      const currentUserPosts = retrievedPosts.filter(post => post.user?.userId === auth.user?.uid);

      setPosts(currentUserPosts);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching posts: ', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'posts'));
      const retrievedPosts = await Promise.all(
        querySnapshot.docs.map(async (postDoc) => {
          const postData = postDoc.data();
          const userDocRef = doc(firestore, 'users', postData.userId);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.exists() ? userDocSnap.data() : null;
          return { ...postData, user: userData, id: postDoc.id, likes: [] };
        })
      );
      const currentUserPosts = retrievedPosts.filter(post => post.user?.userId === auth.user?.uid);

      setPosts(currentUserPosts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts: ', error);
      setIsLoading(false);
    }
  };

  const handleLike = (postId) => {
    // Implement your logic for handling likes
  };

  const handleComment = (postId) => {
    setCommentPostId(postId);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Implement your logic for submitting comments
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(firestore, 'posts', postId));
      console.log('Post deleted successfully');
      // Update the posts state to remove the deleted post
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  const renderPosts = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
  
    if (posts.length === 0) {
      return <Typography>No posts found.</Typography>;
    }
  
    const myPosts = posts.filter(post => post.userId === auth.currentUser?.uid);
  

    return (
      <ul className="post-list">
        <Typography variant="h6" style={{ marginBottom: '10px' }}>
          MY POST
        </Typography>
        {myPosts.map((post, index) => (
          <li key={post.id} className="post-item">
            {/* Post content */}
            <div className="post-user-info">
              <div className="user-avatar">
                <img src={post.user?.avatar} alt="User Avatar" />
              </div>
              <div className="user-details">
                <Typography variant="h6" className="post-username">{post.user?.username}</Typography>
                <Typography variant="subtitle2" className="post-name">{post.user?.name}</Typography>
              </div>
              <Typography variant="subtitle2" className="post-timestamp">
                {post.timestamp && post.timestamp.toDate().toLocaleString()}
              </Typography>
            </div>
            <Typography className="post-content">{post.content}</Typography>
            {post.mediaUrl && (
              <div className="post-media">
                {post.mediaUrl.endsWith('.mp4') ? (
                  <video controls>
                    <source src={post.mediaUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="image-container">
                    <img src={post.mediaUrl} alt="Post Media" />
                  </div>
                )}
              </div>
            )}
            <div className="post-meta">
              {/* Like, comment, and delete buttons */}
              <div className="post-actions">
                <Button onClick={() => handleLike(post.id)} startIcon={<FiThumbsUp />}>
                  {post.likes.includes(auth.currentUser?.uid) ? 'Unlike' : 'Like'}
                </Button>
                <Button onClick={() => handleComment(post.id)} startIcon={<FiMessageSquare />}>
                  Comment
                </Button>
                {post.userId === auth.currentUser?.uid && (
                  <Button onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                )}
              </div>
              <div className="post-likes">
                {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
              </div>
            </div>
            {/* Display comments */}
            <div className="post-comments">
              {post.comments && post.comments.map((comment) => (
                <div key={comment.timestamp} className="comment">
                  <Typography variant="subtitle2" className="comment-username">
                    {comment.userId === auth.currentUser?.uid ? 'You' : comment.user?.username}
                  </Typography>
                  <Typography variant="body2" className="comment-content">
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" className="comment-timestamp">
                    {comment.timestamp && comment.timestamp.toDate().toLocaleString()}
                  </Typography>
                </div>
              ))}
            </div>
            {/* Comment input */}
            {commentPostId === post.id && (
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <TextField
                  name="comment"
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  required
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <Button type="submit" variant="contained" startIcon={<FiSend />}>Comment</Button>
              </form>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Box>
      {/* Render profile details */}
      {renderPosts()}
    </Box>
  );
};

export default ProfileContent;
