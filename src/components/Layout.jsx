import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <LayoutContainer>
            <LayoutWrap>
                <Header />
                <LayoutContents>{children}</LayoutContents>
                <BottomTap/>
            </LayoutWrap>
        </LayoutContainer>
    );
};

export default Layout;

const LayoutContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F7EDE2;
    display: flex;
    justify-content: center;
`

const LayoutWrap = styled.div`
    width: 512px;
    height: 929px;
    border: 1px solid blue;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const LayoutContents = styled.div`
    display: flex;
    justify-content: center;
`