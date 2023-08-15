import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DonateContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid #ccc;
  background-image: url(/feed1.jpg);
  background-size: cover;
  background-position: center;
  background-color: #333;
  color: #fff;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const DonateScreen = styled.div`
  display: none;
  text-align: center;
  transition: opacity 0.5s ease;
  color: #000;
  opacity: 1.2;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.6);
  padding: 20px;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

  ${({ active }) =>
    active &&
    `
    display: block;
  `}
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const LearnMoreButton = styled(Button)`
  background-color: #555;
`;

const DonateFeed = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prevScreen) => (prevScreen % 3) + 1);
    }, 3000); // Change screen every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const content = {
    1: {
      title: 'FundMyFuture Foundation',
      description:
        'FundMyFuture Foundation is a non-profit organization dedicated to supporting students in need of financial assistance for their education.',
      buttonText: 'Donate Now',
    },
    2: {
      title: 'Empower Students',
      description:
        'Join us in empowering students to pursue their dreams and achieve academic success. Your donations directly contribute to scholarships, educational resources, and mentorship programs.',
      buttonText: 'Donate Now',
    },
    3: {
      title: 'Make a Difference',
      description:
        'With your support, we can make a significant difference in the lives of deserving students. Help us provide equal educational opportunities and transform lives through quality education.',
      buttonText: 'Donate Now',
    },
  };

  return (
    <DonateContainer>
      {Object.keys(content).map((screen) => (
        <DonateScreen
          key={screen}
          active={currentScreen === parseInt(screen)}
        >
          <h2>{content[screen].title}</h2>
          <p>{content[screen].description}</p>
          <ButtonContainer>
            <Button>{content[screen].buttonText}</Button>
            <LearnMoreButton>Learn More</LearnMoreButton>
          </ButtonContainer>
        </DonateScreen>
      ))}
    </DonateContainer>
  );
};

export default DonateFeed;
