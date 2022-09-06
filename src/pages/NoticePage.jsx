import React from 'react';
import NoticeHome from "../components/noticeBoard/NoticeHome"
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { VscBell } from "react-icons/vsc";
import Header from '../components/Header';

const FreeTalkPage = () => {

    const navigate = useNavigate();
 
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

