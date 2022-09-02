import React from 'react';
import styled from 'styled-components';
import BottomTap from './BottomTap';
import Header from './Header';
import { useMediaQuery } from "react-responsive";
import HeaderTap from './HeaderTap';
import { TiPencil } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { VscBell } from "react-icons/vsc";

const SearchLayout = ({ children }) => {

    const navigate = useNavigate();

    return (

        <LayoutContainer>
            <LayoutWrap>
                <HeaderContainer>
                    <div></div>
                    <HeaderTitle
                        onClick={() => { navigate("/") }} style={{ cursor: "pointer" }}
                    >HomeComing Day</HeaderTitle>

                    <VscBell size="27" color="#000000"
                        onClick={() => {navigate("/notice")}} style={{cursor: "pointer"}}
                    />

                </HeaderContainer>
                <LayoutContents>{children}</LayoutContents>
            </LayoutWrap>
        </LayoutContainer>
    );
};

export default SearchLayout;

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

const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #eee;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    font-size: 20px;
    font-weight: bold;
`

const HeaderTitle = styled.div`
`



const LayoutContents = styled.div`
    display: flex;
    justify-content: center;    
`