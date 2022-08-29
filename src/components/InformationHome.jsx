import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import HeaderTap from "./HeaderTap"
import Information from './Information';

const InformationHome = () => {
    return (
        <HomeContainer>
            <HeaderTap />
            <Information />
            <BottomTap />
        </HomeContainer>
    );
};

export default InformationHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`