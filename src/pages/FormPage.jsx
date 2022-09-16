import React from 'react';
import styled from 'styled-components';
import Form2 from "../components/test/Form2"

const FormPage = () => {
  return (
    <Container>
      <Form2/>
    </Container>
  );
};

export default FormPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`