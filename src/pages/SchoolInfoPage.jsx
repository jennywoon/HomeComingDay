import React from 'react';
import SchoolInfo from '../components/loginSigunUpBoard/SchoolInfo';
import styled from 'styled-components';

const SchoolInfoPage = () => {
  return (
    <Container>
      <SchoolInfo />
    </Container>
  );
};

export default SchoolInfoPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`