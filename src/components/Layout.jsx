import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import Header from './Header';
import { useMediaQuery } from "react-responsive";
import HeaderTap from './HeaderTap';

const Layout = ({ children }) => {
    
    return (

        <LayoutContainer>
            <LayoutWrap>
                <Header />
                <LayoutContents>{children}</LayoutContents>
            </LayoutWrap>
        </LayoutContainer>
    );
};

export default Layout;

const LayoutContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const LayoutWrap = styled.div`
  width: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LayoutContents = styled.div`
    display: flex;
    justify-content: center;
`