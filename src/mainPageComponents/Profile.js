import React from 'react';
import styled from 'styled-components';
import ProfilePage from './ProfilePage';
import ProfileContent from './ProfileContent';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProfilePageContainer = styled.div`
  flex: 1;
  margin-right: 10px; /* Adjust the margin value as needed */
  border-right: 1px solid #ccc; /* Add a right border */
  padding-right: 10px; /* Add some padding on the right side */
`;

const ProfileContentContainer = styled.div`
  flex: 1;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfilePageContainer>
        <ProfilePage />
      </ProfilePageContainer>
      <ProfileContentContainer>
        <ProfileContent />
      </ProfileContentContainer>
    </ProfileContainer>
  );
};

export default Profile;
