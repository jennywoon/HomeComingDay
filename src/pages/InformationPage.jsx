import React from 'react';
import InformationHome from '../components/informationBoard/InformationHome';
import Header from '../components/Header';
import styled from 'styled-components';

const InformationPage = () => {

    return (
        <Container>
            <Header />
            <InformationHome />
        </Container>
    );
};

export default InformationPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`
