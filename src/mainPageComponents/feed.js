import React, { useEffect, useState } from 'react';
import {
  serverTimestamp,
} from 'firebase/firestore';
import { auth} from '../firebase/firebase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchPosts, updateLikeCount, updateComment } from '../api/FirebaseUtil';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentInput, setCommentInput] = useState('');
  const [commentPostId, setCommentPostId] = useState('');

  useEffect(() => {
    fetchPostsFromFirebase();
  }, []);

  const fetchPostsFromFirebase = async () => {
    try {
      const retrievedPosts = await fetchPosts();
      setPosts(retrievedPosts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts: ', error);
      setIsLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        const updatedPosts = [...posts];
        const post = updatedPosts[postIndex];

        const user = auth.currentUser;
        if (user) {
          const liked = post.likes.includes(user.uid);
          if (liked) {
            post.likes = post.likes.filter((userId) => userId !== user.uid);
          } else {
            post.likes.push(user.uid);
          }

          await updateLikeCount(postId, post.likes.length);

          setPosts(updatedPosts);
        }
      }
    } catch (error) {
      console.error('Error handling like: ', error);
    }
  };

  const handleComment = (postId) => {
    setCommentPostId(postId);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.error('User not authenticated.');
      return;
    }

    const content = commentInput.trim();
    if (content !== '') {
      const postIndex = posts.findIndex((post) => post.id === commentPostId);
      if (postIndex !== -1) {
        const updatedPosts = [...posts];
        const post = updatedPosts[postIndex];

        const commentData = {
          content,
          timestamp: serverTimestamp(),
          userId: user.uid,
        };

        post.comments.push(commentData);
        await updateComment(post.id, post.comments);

        setPosts(updatedPosts);
        setCommentInput('');
        setCommentPostId('');
      }
    }
  };

  const renderPosts = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (posts.length === 0) {
      return <Typography>No posts found.</Typography>;
    }

    return (
      <ul className="post-list">
        {posts.map((post, index) => (
          <PostItem
            key={post.id}
            post={post}
            handleLike={handleLike}
            handleComment={handleComment}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            commentPostId={commentPostId}
            handleCommentSubmit={handleCommentSubmit}
          />
        ))}
      </ul>
    );
  };

  return (
    <Box>
      <PostForm />
      {renderPosts()}
    </Box>
  );
};

export default Feed;
