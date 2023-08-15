import React, { useState } from 'react';
import styled from 'styled-components';

const BookmarkedContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const BookmarkedList = styled.ul`
  list-style: none;
  padding: 0;
  

  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const PostItem = styled.li`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #666;
`;

const ApplyButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoBookmarksText = styled.p`
  font-size: 16px;
  color: #666;
`;

const Bookmarked = () => {
  const [savedPosts, setSavedPosts] = useState([
    {
      id: 1,
      title: 'Post 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ]);

  const removeBookmark = (postId) => {
    setSavedPosts(savedPosts.filter(post => post.id !== postId));
  };

  return (
    <BookmarkedContainer>
      <Heading>Bookmarked</Heading>

      {savedPosts.length > 0 ? (
        <BookmarkedList>
          {savedPosts.map(post => (
            <PostItem key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <ApplyButton onClick={() => removeBookmark(post.id)}>Remove</ApplyButton>
            </PostItem>
          ))}
        </BookmarkedList>
      ) : (
        <NoBookmarksText>No bookmarks</NoBookmarksText>
      )}
    </BookmarkedContainer>
  );
};

export default Bookmarked;
