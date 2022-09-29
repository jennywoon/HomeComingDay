import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ChatList from '../components/chatBoard/ChatList';

const FreeTalkPage = () => {

    return (
        <Container>
            <ChatList/>
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