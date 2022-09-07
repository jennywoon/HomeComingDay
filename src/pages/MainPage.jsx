import React from 'react';
import Home from '../components/helpBoard/Home';
import Header from '../components/Header';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import Loading from "../components/test/Loading";

const MainPage = () => {

    // const { isLoading } = useSelector((state) => state.helps)

    // if (isLoading) {
    //     return <Loading />;
    //   }

    return (
        <Container>
            <Header />
            <Home/>
        </Container>
    );
};

export default MainPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`