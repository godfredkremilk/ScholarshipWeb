import React from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  color: #1da1f2;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SectionContainer = styled.div`
  max-width: 600px; /* Added max-width to limit the container on larger screens */
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const OptionLabel = styled.label`
  font-size: 18px;
  color: #333333;
  margin-left: 15px;
`;

const OptionInput = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 16px 32px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0c85d0;
  }
`;

const Settings = () => {
  const handleOptionChange = (event) => {
    // Handle option change logic here
  };

  const handleSaveSettings = () => {
    // Handle save settings logic here
  };

  return (
    <SettingsContainer>
      <Title>Settings</Title>

      <SectionContainer>
        <SectionTitle>Notification Settings</SectionTitle>

        <OptionItem>
          <OptionInput type="checkbox" id="notificationEmail" onChange={handleOptionChange} />
          <OptionLabel htmlFor="notificationEmail">Receive email notifications</OptionLabel>
        </OptionItem>

        <OptionItem>
          <OptionInput type="checkbox" id="notificationPush" onChange={handleOptionChange} />
          <OptionLabel htmlFor="notificationPush">Receive push notifications</OptionLabel>
        </OptionItem>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Privacy Settings</SectionTitle>

        <OptionItem>
          <OptionInput type="checkbox" id="privacyProfile" onChange={handleOptionChange} />
          <OptionLabel htmlFor="privacyProfile">Make profile public</OptionLabel>
        </OptionItem>

        <OptionItem>
          <OptionInput type="checkbox" id="privacyPosts" onChange={handleOptionChange} />
          <OptionLabel htmlFor="privacyPosts">Make posts public</OptionLabel>
        </OptionItem>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Display Settings</SectionTitle>

        <OptionItem>
          <OptionInput type="checkbox" id="displayTheme" onChange={handleOptionChange} />
          <OptionLabel htmlFor="displayTheme">Dark mode</OptionLabel>
        </OptionItem>

        <OptionItem>
          <OptionInput type="checkbox" id="displayFont" onChange={handleOptionChange} />
          <OptionLabel htmlFor="displayFont">Large font size</OptionLabel>
        </OptionItem>
      </SectionContainer>

      <Button onClick={handleSaveSettings}>Save Settings</Button>
    </SettingsContainer>
  );
};

export default Settings;
