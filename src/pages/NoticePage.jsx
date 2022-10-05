import React from 'react';
import styled from 'styled-components';
import NoticeHome from "../components/noticeBoard/NoticeHome"
import Header from '../components/Header';

const FreeTalkPage = () => {
 
    return (
        <Container>
            <Header/>
            <NoticeHome />
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

