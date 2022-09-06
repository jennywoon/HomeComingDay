import React from 'react';
import Home from '../components/helpBoard/Home';
import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"
import MyPageHome from '../components/myPageBoard/MyPageHome';

const MyPage = () => {

    return (
        <Container>
            <Header />
            <MyPageHome/>
        </Container>
    );
};

export default MyPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`