import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import HeaderTap from "./HeaderTap"
import Help from './Help';
import Layout from './Layout';

const Home = () => {
    return (
        // <Layout>
        <HomeContainer>
                {/* <HeaderTap /> */}
                <Help />
                {/* <BottomTap /> */}
        </HomeContainer>
        // </Layout>
    );
};

export default Home;

const HomeContainer = styled.div`
    /* width: 100%; */
    /* height: 800px; */
    height: 100%;
    /* height: calc(var(--vh, 1vh) * 93); */
    /* border: 10px solid red; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;

`
