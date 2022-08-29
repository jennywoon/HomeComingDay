import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import HeaderTap from "./HeaderTap"
import Help from './Help';

const Home = () => {
    return (
        <HomeContainer>
            <HeaderTap/>
            <Help/>
            <BottomTap/>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
    /* width: 100%; */
    /* height: 800px; */
    height: 100%;
    /* height: calc(var(--vh, 1vh) * 93); */
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
`