import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import Header from './Header';
import { useMediaQuery } from "react-responsive";
import HeaderTap from './HeaderTap';
import {TiPencil} from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {

  const navigate = useNavigate();

  return (

    <LayoutContainer>
      <LayoutWrap>
        <Header />
        <Iconbox 
        onClick={() => navigate('/form')}
        >
          <TiPencil color="white" size="40px" />
        </Iconbox>
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
  /* height: 100vh; */
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const LayoutContents = styled.div`
    display: flex;
    justify-content: center;
    
`

const Iconbox = styled.div`
  width:50px;
  height:50px;
  background-color: black;
  border-radius: 30px;
  position: fixed;
  bottom: 90px;
  right: 37%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`