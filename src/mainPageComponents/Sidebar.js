import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faGraduationCap,
  faBookmark,
  faQuestionCircle,
  faCog,
  faSignOutAlt,
  faComment,
  faDonate
} from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase/firebase';

const SidebarContainer = styled.div`
  padding: 20px;
  backdrop-filter: blur(10px);
  color: #808080;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #808080;
  border-radius: 8px;
  position: fixed;
  top: 60px;

  /* Media query for small screen size */
  @media (max-width: 768px) {
    width: 40px; /* Set the reduced width for the sidebar */
    padding: 4px;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #808080;
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background-color: transparent;
  color: #808080;

  &:hover,
  &.active {
    color: #1877f2;
  }

  &.active {
    font-weight: bold;
  }

  /* Hide the link text when the screen size is reduced */
  @media (max-width: 768px) {
    span {
      display: none;
    }

    svg {
      margin-right: 0;
    }
  }

  svg {
    font-size: 18px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    padding: 6px;
    svg {
      margin-right: 8px;
    }
  }
`;

const SidebarDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #cccccc;
  margin: 10px 0;
`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate('/'); // Redirect the user to the sign-in page
      })
      .catch((error) => {
        // An error happened.
        console.error('Sign Out Error:', error);
      });
  };

  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarLink to="/mainpage" activeClassName="active" exact>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </SidebarLink>
        <SidebarLink to="/mainpage/profile" activeClassName="active">
          <FontAwesomeIcon icon={faUser} />
          <span>My Profile</span>
        </SidebarLink>
        <SidebarLink to="/mainpage/donate" activeClassName="active">
          <FontAwesomeIcon icon={faDonate} />
          <span>Donate</span>
        </SidebarLink>
        <SidebarLink to="/mainpage/scholarship" activeClassName="active">
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>Scholarship</span>
        </SidebarLink>
        <SidebarLink to="/mainpage/chatbox" activeClassName="active">
          <FontAwesomeIcon icon={faComment} />
          <span>Messaging</span>
        </SidebarLink>
        <SidebarDivider />
        <SidebarLink to="/mainpage/bookmarked" activeClassName="active">
          <FontAwesomeIcon icon={faBookmark} />
          <span>Bookmarked</span>
        </SidebarLink>
        <SidebarLink to="/mainpage/help" activeClassName="active">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span>Help</span>
        </SidebarLink>
        <SidebarLink to="/mainpage/settings" activeClassName="active">
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </SidebarLink>
        <SidebarDivider />
      </SidebarContent>
      <SidebarLink onClick={handleSignOut} style={{ marginTop: 'auto' }}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Sign Out</span>
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
