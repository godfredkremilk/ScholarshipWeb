import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FiThumbsUp, FiMessageSquare, FiSend } from 'react-icons/fi';
import { auth } from '../firebase/firebase';
import styled from 'styled-components';

const StyledPostItem = styled.li`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  list-style-type: none;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StyledAvatar = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    margin-right: 16px;
  }
`;

const StyledAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledPostContentContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-left: 16px;
  }
`;

const StyledPostContent = styled(Typography)`
  margin-bottom: 8px;
  color: #333333;
`;

const StyledPostMedia = styled(Box)`
  margin-top: 8px;
  margin-bottom: 8px;
  max-width: 100%;
  max-height: 500px;
  overflow: hidden;
  border-radius: 4px;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const StyledPostHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StyledUsername = styled(Typography)`
  font-weight: bold;
  color: #333333;
  margin-bottom: 4px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 8px;
  }
`;

const StyledPostActions = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const StyledButton = styled(Button)`
  text-transform: none;
  padding: 6px 12px;
  font-size: 14px;
  color: #555555;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const StyledLikesCount = styled(Typography)`
  margin-left: 8px;
  color: #777777;
`;

const StyledCommentForm = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 8px;

  @media (min-width: 768px) {
    margin-top: 16px;
  }
`;

const StyledCommentTextField = styled(TextField)`
  margin-right: 8px;
  flex: 1;
`;

const StyledCommentButton = styled(Button)`
  text-transform: none;
  color: #ffffff;
  background-color: #333333;

  &:hover {
    background-color: #555555;
  }
`;

const PostItem = ({
  post,
  handleLike,
  handleComment,
  commentInput,
  setCommentInput,
  commentPostId,
  handleCommentSubmit,
}) => {
  return (
    <StyledPostItem>
      <StyledAvatar>
        <StyledAvatarImage src={post.user?.avatar} alt="User Avatar" />
      </StyledAvatar>
      <StyledPostContentContainer>
        <StyledPostHeader>
          <StyledUsername variant="h6">{post.user?.username}</StyledUsername>
          <Typography variant="subtitle2">{post.user?.name}</Typography>
        </StyledPostHeader>
        <StyledPostContent>{post.content}</StyledPostContent>
        {post.mediaUrl && (
          <StyledPostMedia>
            {post.mediaUrl.endsWith('.mp4') ? (
              <video controls>
                <source src={post.mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <img src={post.mediaUrl} alt="Post Media" />
            )}
          </StyledPostMedia>
        )}
        <StyledPostActions>
          <StyledButton onClick={() => handleLike(post.id)} startIcon={<FiThumbsUp />}>
            {post.likes.includes(auth.currentUser?.uid) ? 'Unlike' : 'Like'}
          </StyledButton>
          <StyledButton onClick={() => handleComment(post.id)} startIcon={<FiMessageSquare />}>
            Comment
          </StyledButton>
          <StyledLikesCount variant="subtitle2">
            {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
          </StyledLikesCount>
        </StyledPostActions>
        {post.comments && post.comments.length > 0 && (
          <Box>
            {post.comments.map((comment) => (
              <Box key={comment.timestamp} sx={{ marginTop: '8px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {comment.userId === auth.currentUser?.uid ? 'You' : comment.user?.username}
                </Typography>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            ))}
          </Box>
        )}
        {commentPostId === post.id && (
          <StyledCommentForm component="form" onSubmit={handleCommentSubmit}>
            <StyledCommentTextField
              name="comment"
              label="Add a comment"
              variant="outlined"
              fullWidth
              required
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <StyledCommentButton type="submit" variant="contained" startIcon={<FiSend />}>
              Comment
            </StyledCommentButton>
          </StyledCommentForm>
        )}
      </StyledPostContentContainer>
    </StyledPostItem>
  );
};

export default PostItem;
