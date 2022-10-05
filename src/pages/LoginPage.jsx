import React from 'react';
import Login from "../components/loginSigunUpBoard/Login"
import styled from 'styled-components';

const LoginPage = () => {
  return (

    <Container>
      <Login />
    </Container>

  );
};

export default LoginPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`