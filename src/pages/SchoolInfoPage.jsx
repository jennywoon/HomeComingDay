import React from 'react';
import styled from 'styled-components';
import SchoolInfo from '../components/loginSigunUpBoard/SchoolInfo';

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