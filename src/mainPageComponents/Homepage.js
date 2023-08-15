import React from 'react';
import styled from 'styled-components';
import Feed from './feed';
import Donatefeed from './Donatefeed';
import ScholarshipList from './ScholarshipList';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  padding-right: 20px;
  border-right: 1px solid #e5e5e5; /* Add a right border to the LeftContainer */
`;

const DonatefeedContainer = styled.div`
  margin-bottom: 20px; /* Add space at the bottom */
`;

const RightContainer = styled.div`
  width: 272px;
  background-color: #ffff;
  padding: 0;


  @media (max-width: 950px) {
    display: none;
  }
`;

const Homepage = () => {
  return (
    <HomeContainer>
      <LeftContainer>
        <DonatefeedContainer>
          <Donatefeed />
        </DonatefeedContainer>
        <Feed />
      </LeftContainer>
      <RightContainer>
        <ScholarshipList />
      </RightContainer>
    </HomeContainer>
  );
};

export default Homepage;
