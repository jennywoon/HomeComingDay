import React from 'react';
import FreeTalkHome from '../components/freeTalkBoard/FreeTalkHome';
import styled from 'styled-components';
import Header from '../components/Header';

const FreeTalkPage = () => {

    return (
        <Container>
            <Header />
            <FreeTalkHome />
        </Container>
    );
};

export default FreeTalkPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`