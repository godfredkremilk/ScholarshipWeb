import React from 'react';
import styled from 'styled-components';

const HelpContainer = styled.div`
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

const FAQContainer = styled.div`
  
  max-width: 600px; /* Added max-width to limit the container on larger screens */
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 30px;
`;

const FAQTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
`;

const FAQItem = styled.div`
  margin-bottom: 15px;
`;

const FAQQuestion = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333333;
`;

const FAQAnswer = styled.p`
  font-size: 16px;
  color: #666666;
`;

const ContactContainer = styled.div`
  max-width: 600px; /* Added max-width to limit the container on larger screens */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 30px;
`;

const ContactTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ContactIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const ContactText = styled.p`
  font-size: 18px;
  color: #666666;
`;

const Help = () => {
  return (
    <HelpContainer>
      <Title>Help</Title>

      <FAQContainer>
        <FAQTitle>Frequently Asked Questions</FAQTitle>

        <FAQItem>
          <FAQQuestion>How do I create an account?</FAQQuestion>
          <FAQAnswer>
            To create an account, click on the "Sign Up" button at the top right corner of the page and fill out the
            registration form.
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>How can I reset my password?</FAQQuestion>
          <FAQAnswer>
            If you have forgotten your password, you can click on the "Forgot Password" link on the login page and
            follow the instructions to reset your password.
          </FAQAnswer>
        </FAQItem>

        {/* Add more FAQs here */}
      </FAQContainer>

      <ContactContainer>
        <ContactTitle>Contact Information</ContactTitle>

        <ContactInfo>
          <ContactIcon src="/images/email-icon.png" alt="Email Icon" />
          <ContactText>support@example.com</ContactText>
        </ContactInfo>

        <ContactInfo>
          <ContactIcon src="/images/phone-icon.png" alt="Phone Icon" />
          <ContactText>+1 123-456-7890</ContactText>
        </ContactInfo>

        {/* Add more contact information here */}
      </ContactContainer>
    </HelpContainer>
  );
};

export default Help;
