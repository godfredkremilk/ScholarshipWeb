import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';

const HeaderContainer = styled.header`
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 35px;
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  color: #808080;

  @media (max-width: 768px) {
    padding: 10px;
    height: 30px;
  }
`;

const LogoImage = styled.img`
  width: 50px;

  @media (max-width: 768px) {
    width: 40px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto; /* Center the content horizontally */

  background-color: #ffffff;
  border-radius: 20px;
  padding: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2px;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 8px;
  border: none;
  background-color: transparent;
  color: #333333;
  font-size: 14px;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 150px;
    padding: 6px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 19px;
  color: #333333;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: #ff0000;
    transition: color 0.3s ease-in-out;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 999;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const NotificationItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
    transition: background-color 0.3s ease-in-out;
  }
`;

const MainHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <HeaderContainer>
      <LogoImage src={logo} alt="Fundmyfuture" />
      <SearchContainer>
        <SearchInput type="text" placeholder="Search" />
        <Icon icon={faSearch} />
      </SearchContainer>
      <RightSection>
        <Icon icon={faBell} onClick={handleNotificationClick} />
        {isDropdownOpen && (
          <NotificationDropdown>
            <NotificationItem>Notification 1</NotificationItem>
            <NotificationItem>Notification 2</NotificationItem>
            <NotificationItem>Notification 3</NotificationItem>
          </NotificationDropdown>
        )}
      </RightSection>
    </HeaderContainer>
  );
};

export default MainHeader;
