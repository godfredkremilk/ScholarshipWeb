import React, { useRef } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FiSend, FiCamera } from 'react-icons/fi';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledPostContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  .MuiOutlinedInput-root {
    border-radius: 30px;
    background-color: #f0f2f5;
  }

  .MuiOutlinedInput-input {
    padding: 0px 0px;
    font-size: 14px;
  }

  .MuiOutlinedInput-multiline {
    padding: 0px 0px;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const StyledButton = styled(Button)`
  background-color: #1877f2;
  color: #ffffff;
  text-transform: none;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;

  &:hover {
    background-color: #166fe5;
  }
`;

const StyledFileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledFileButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f0f2f5;
  color: #1877f2;
  text-transform: none;
  padding: 4px 8px;
  border-radius: 24px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e4e6e9;
  }
`;

const StyledFileIcon = styled(FiCamera)`
  color: #1877f2;
`;

const StyledFileName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PostForm = ({ handleFormSubmit }) => {
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    // Do something with the file
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    handleFormSubmit(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledPostContainer>
        <Avatar alt="Profile Picture" src="profile-picture.jpg" sx={{ width: 40, height: 40 }} />
        <StyledTextField
          name="content"
          label="What's on your mind?"
          variant="outlined"
          fullWidth
          multiline
          rows={1}
          required
        />
      </StyledPostContainer>
      <StyledFileContainer>
        <StyledFileButton onClick={handleFileButtonClick}>
          <StyledFileIcon />
          <StyledFileName>Add Photo/Video</StyledFileName>
        </StyledFileButton>
        <HiddenFileInput
          type="file"
          name="media"
          accept="image/*, video/*"
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
      </StyledFileContainer>
      <StyledButton type="submit" startIcon={<FiSend />}>
        Post
      </StyledButton>
    </StyledForm>
  );
};

export default PostForm;
