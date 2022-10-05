import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
// 이미지 아이콘
import { TiPencil } from "react-icons/ti";

const Layout = ({ children }) => {

  const navigate = useNavigate();

  return (

    <LayoutContainer>
      <LayoutWrap>
        <Header />
        <IconWrap>
          <Iconbox
            onClick={() => navigate('/form')}
          >
            <TiPencil color="white" size="40px" />
          </Iconbox>
        </IconWrap>
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

const IconWrap = styled.div`
  width: 95%;
  display: flex;
  justify-content: right;
`
const Iconbox = styled.div`
  width:50px;
  height:50px;
  background-color: black;
  border-radius: 30px;
  position: fixed;
  bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`