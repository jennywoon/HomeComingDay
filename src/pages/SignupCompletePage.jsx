import React from 'react';
import SignupComplete from '../components/loginSigunUpBoard/SignupComplete'
import styled from 'styled-components';

const SignupCompletePage = () => {
  return (
    <Container>
      <SignupComplete />
    </Container>
  );
};

export default SignupCompletePage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`