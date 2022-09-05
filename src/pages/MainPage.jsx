import React from 'react';
import Home from '../components/helpBoard/Home';
import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"
import { TiPencil } from "react-icons/ti";

const MainPage = () => {

    const navigate = useNavigate();

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