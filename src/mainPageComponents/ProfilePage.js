import React, { useState, useEffect } from 'react';
import { auth, firestore, storage } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import '../css/profile.css';

const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
`;

const ProfileSetupForm = ({ currentUser, userDetails, onProfileSave, onCancel }) => {
  const [username, setUsername] = useState(userDetails?.username || '');
  const [firstName, setFirstName] = useState(userDetails?.firstName || '');
  const [lastName, setLastName] = useState(userDetails?.lastName || '');
  const [userType, setUserType] = useState(userDetails?.userType || '');
  const [school, setSchool] = useState(userDetails?.school || '');
  const [company, setCompany] = useState(userDetails?.company || '');
  const [bio, setBio] = useState(userDetails?.bio || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDocRef = doc(firestore, 'users', currentUser.uid);

      const updatedUserDetails = {
        username,
        firstName,
        lastName,
        userType,
        school,
        company,
        bio,
      };

      await setDoc(userDocRef, updatedUserDetails);

      onProfileSave(updatedUserDetails);
    } catch (error) {
      console.error('Error setting up profile:', error);
      // TODO: Handle error
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Profile Setup</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userType">User Type:</label>
        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="worker">Worker</option>
          <option value="other">Other</option>
        </select>
      </div>
      {userType === 'student' && (
        <div className="form-group">
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="Enter your school"
          />
        </div>
      )}
      {userType === 'worker' && (
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter your company"
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter your bio"></textarea>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-save">
          Save
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Close
        </button>
      </div>
    </form>
  );
};

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserDetails(userData);
            setSelectedImage(userData?.avatar); // Set the profile picture URL for the modal preview
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
          // TODO: Handle error
        }
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  const handleProfileSave = (updatedUserDetails) => {
    const updatedProfileImage = userDetails?.avatar || updatedUserDetails?.avatar;
    setUserDetails({ ...updatedUserDetails, avatar: updatedProfileImage });
    setEditMode(false);
  };
  

  const handleProfileUpdate = () => {
    setEditMode(true);
  };

  const handleCancelUpdate = () => {
    setEditMode(false);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleImageUpload = (imageFile) => {
    if (imageFile) {
      const storageRef = ref(storage, `profile-images/${currentUser.uid}`);
      const uploadTask = uploadBytes(storageRef, imageFile);

      uploadTask
        .then((snapshot) => {
          console.log('Profile image uploaded successfully');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            const updatedUserDetails = {
              ...userDetails,
              avatar: downloadURL,
            };
            setDoc(doc(firestore, 'users', currentUser.uid), updatedUserDetails)
              .then(() => {
                console.log('User avatar updated successfully');
                setUserDetails(updatedUserDetails);
              })
              .catch((error) => {
                console.error('Error updating user avatar:', error);
                // TODO: Handle error
              });
          });
        })
        .catch((error) => {
          console.error('Error uploading profile image:', error);
          // TODO: Handle error
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile-page">
      {userDetails && (
        <div className="profile-details">
          <ProfileContainer>
            <ProfileImage src={userDetails.avatar} alt="Profile Image" onClick={handleImageClick} />
            <div className="profile-info">
              <h2>{userDetails.username}</h2>
              <p>
                {userDetails.firstName} {userDetails.lastName}
              </p>
              <p>User Type: {userDetails.userType}</p>
              {userDetails.userType === 'student' && <p>School: {userDetails.school}</p>}
              {userDetails.userType === 'worker' && <p>Company: {userDetails.company}</p>}
              <p>Bio: {userDetails.bio}</p>
            </div>
          </ProfileContainer>
          {!editMode && (
            <button onClick={handleProfileUpdate} className="btn-update">
              Update Profile
            </button>
          )}
          {editMode && (
            <ProfileSetupForm
              currentUser={currentUser}
              userDetails={userDetails}
              onProfileSave={handleProfileSave}
              onCancel={handleCancelUpdate}
            />
          )}
        </div>
      )}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Profile Image Preview</h3>
            <img src={userDetails.avatar} alt="Profile " />
            <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
            <button onClick={() => handleImageUpload(selectedImage)}>Upload Photo</button>
            <button onClick={handleCloseModal}>Close</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ProfilePage;