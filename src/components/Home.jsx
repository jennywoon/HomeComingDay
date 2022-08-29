import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import HeaderTap from "./HeaderTap"
import Help from './Help';
import Layout from './Layout';

const Home = () => {
    return (

        <HomeContainer>
                <HeaderTap />
                <Help />
                <BottomTap />
        </HomeContainer>

    );
};

export default Home;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
