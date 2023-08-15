import React from 'react';
import styled, { keyframes } from 'styled-components';
import featureIcon1 from '../images/feature-icon-1.mp4';

const BodyContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 40px;
  background-color: #F4F7FD;
  margin-top: 70px;
  color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px;
  }
`;

const fadeInUpAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeftAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRightAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Heading = styled.h1`
  font-size: 45px;
  margin-bottom: 10px;
  color: #333333;
  animation: ${fadeInUpAnimation} 1s ease-in;

  @media (max-width: 768px) {
    font-size: 33px;
  }
`;

const Subheading = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
  color: #777777;
  animation: ${fadeInUpAnimation} 1s ease-in;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 20px;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUpAnimation} 1s ease-in;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FeatureIcon = styled.video`
  width: 100px;
  margin-bottom: 20px;
  animation: ${fadeInLeftAnimation} 1s ease-in;


  @media (max-width: 768px) {
    width: 60px;
    margin-bottom: 10px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333333;
  animation: ${fadeInRightAnimation} 1s ease-in;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FeatureDescription = styled.p`
  font-size: 13px;
  text-align: center;
  color: #777777;
  animation: ${fadeInUpAnimation} 1s ease-in;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const Body = () => {
  return (
    <BodyContainer>
<Heading>Welcome to FundmyFuture</Heading>
<Subheading>Explore a wide range of scholarship opportunities and connect with organizations, institutions, and donors who can help support your educational journey.</Subheading>
<FeaturesContainer>
<Feature>
<FeatureIcon autoPlay loop muted>
<source src={featureIcon1} type="video/mp4" />
Your browser does not support the video tag.
</FeatureIcon>
<FeatureTitle>Get Scholarship Assistance</FeatureTitle>
<FeatureDescription>
Connect with other university students and receive support with your tuition through our scholarship social media app.
</FeatureDescription>
</Feature>
<Feature>
<FeatureIcon autoPlay loop muted>
<source src={featureIcon1} type="video/mp4" />
Your browser does not support the video tag.
</FeatureIcon>
<FeatureTitle>Interact with other Users</FeatureTitle>
<FeatureDescription>
Engage and interact with fellow students on our platform, where you can seek advice, share experiences, and form connections to enhance your educational journey.
</FeatureDescription>
</Feature>
<Feature>
<FeatureIcon autoPlay loop muted>
<source src={featureIcon1} type="video/mp4" />
Your browser does not support the video tag.
</FeatureIcon>
<FeatureTitle>Donate to Empower Students</FeatureTitle>
<FeatureDescription>
Contribute to the Fund my Future Foundation by donating to help students with their tuition expenses. Make a difference in their lives and enable them to pursue their education.
</FeatureDescription>
</Feature>
</FeaturesContainer>
</BodyContainer>
  );
};

export default Body;

