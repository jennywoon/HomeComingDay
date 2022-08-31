import React from 'react';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import FreeTalk from './FreeTalk';
import HeaderTap from "../HeaderTap"

const FreeTalkHome = () => {
    return (
        <HomeContainer>
            <HeaderTap />
            <FreeTalk/>
            <BottomTap />
        </HomeContainer>
    );
};

export default FreeTalkHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
`