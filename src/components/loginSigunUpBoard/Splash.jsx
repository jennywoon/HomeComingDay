import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Login from './Login';
import logo3 from "../../assets/logo3.png"

const Splash = () => {
    const [flag, setFlag] = useState(false);
    const useSplash = (setFlag) => {
        useEffect(() => {
            const interval = setTimeout(() => {
                setFlag((value) => !value);
            }, 2000);
            return () => {
                clearTimeout(interval);
            };
        }, [setFlag]);
    };
    useSplash(setFlag);

    return (
        <Container>
            {!flag ? (
            <HomeContainer>
                <LogoWrap>
                    <LogoNameImg/>
                </LogoWrap>
            </HomeContainer>
            ) : (
                <Login/>
            )}
        </Container>
    )
};

export default Splash;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`
const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    background-color: #f7931e;
    justify-content: center;
    align-items: center;
`

const LogoWrap = styled.div`
    /* width: 50%;
    height: 50%; */
`

const LogoNameImg = styled.div`
    width: 240px;
    height: 160px;
    background-image: url(${logo3});
    background-position: center;
    background-size: 100% 100%;
`