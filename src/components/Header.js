import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { signIn, register } from '../api/auth';

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
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavigationMenu = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavigationLink = styled.a`
  color: #333333;
  font-size: 12px;
  text-decoration: none;
  margin-right: 20px;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 10px;
    margin-right: 10px;
  }

  &:hover {
    color: #0a66c2;
  }
`;

const Button = styled.button`
  background-color: #0a66c2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 8px 16px;
    width: fit-content;
  }

  &:hover {
    background-color: #095293;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;


const LogoImage = styled.img`
  width: 50px;

  @media (max-width: 768px) {
    width: 40px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  z-index: 10000;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ModalButton = styled(Button)`
  margin-top: 10px;
`;

const ModalSwitch = styled.span`
  color: #0a66c2;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
`;

const Header = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [signInMode, setSignInMode] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');

  const navigate = useNavigate();

  const handleSignInClick = () => {
    setSignInOpen(true);
  };

  const handleModalClose = () => {
    setSignInOpen(false);
    setSignInMode(true);
    setEmail('');
    setPassword('');
    setError(null);
    setFirstName('');
    setLastName('');
    setCompany('');
  };

  const handleModalSwitch = () => {
    setSignInMode(!signInMode);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    signIn(email, password)
      .then(() => {
        console.log('User signed in successfully');
        navigate('/Mainpage');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setError('Invalid email or password.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Invalid email or password.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !firstName || !lastName || !company) {
      setError('Please fill in all the fields.');
      return;
    }
  
    // Validate password length
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    register(email, password)
      .then(() => {
        console.log('User registered successfully');
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters long.');
        } else if (error.code === 'auth/email-already-in-use') {
          setError('The email address is already in use.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      });
  };

  


  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="Fundmyfuture" />
      <NavigationMenu>
        <IconContainer>
          <NavigationLink href="/about">About</NavigationLink>
        </IconContainer>
      </NavigationMenu>
      <Button onClick={handleSignInClick}>
        <span>Sign In</span>
      </Button>

      {signInOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleModalClose}>&times;</CloseButton>
            {signInMode ? (
              <ModalForm onSubmit={handleSignIn}>
                <ModalTitle>Sign In</ModalTitle>
                <ModalInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ModalInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>
                  <ModalSwitch onClick={handleForgotPassword}>Forgot password?</ModalSwitch>
                </p>
                {error && <ErrorText>{error}</ErrorText>}
                <ModalButton type="submit">Sign In</ModalButton>
                <p>
                  Don't have an account?{' '}
                  <ModalSwitch onClick={handleModalSwitch}>Register</ModalSwitch>
                </p>
              </ModalForm>
            ) : (
              <ModalForm onSubmit={handleRegister}>
                <ModalTitle>Register</ModalTitle>
                <ModalInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ModalInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ModalInput
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <ModalInput
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <ModalInput
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                {error && <ErrorText>{error}</ErrorText>}
                <ModalButton type="submit">Register</ModalButton>
                <p>
                  Already have an account?{' '}
                  <ModalSwitch onClick={handleModalSwitch}>Sign In</ModalSwitch>
                </p>
              </ModalForm>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </HeaderContainer>
  );
};

export default Header;



