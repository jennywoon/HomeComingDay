import React from 'react';
import SignUp from "../components/loginSigunUpBoard/SignUp"
import styled from 'styled-components';

const SignUpPage = () => {
  return (
    <Container>
      <SignUp />
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`