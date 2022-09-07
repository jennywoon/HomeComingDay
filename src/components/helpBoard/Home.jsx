import React from 'react';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import HeaderTap from '../HeaderTap';
import { useNavigate } from "react-router-dom"
import Help from "./Help"
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TiPencil } from "react-icons/ti";
import Header from "../../components/Header";

const Home = () => {
    const navigate = useNavigate();

    return (
            <HomeContainer>
                <Navbar>
                    <NavbarTitle
                        onClick={() => { navigate("/") }}
                        style={{paddingLeft: "20px", fontWeight: "800", textDecoration: "underline", color: "#f7931e" }}
                    >도움요청</NavbarTitle>
                    <NavbarTitle
                        onClick={() => { navigate("/information") }}
                    >정보공유</NavbarTitle>
                    <NavbarTitle
                        onClick={() => { navigate("/calendar") }}
                    >만남일정</NavbarTitle>
                    <NavbarTitle
                        onClick={() => { navigate("/freetalk") }}
                        style={{ paddingRight: "20px" }}
                    >자유토크</NavbarTitle>
                </Navbar>
                <Help />
                <IconWrap>
                    <Iconbox
                        onClick={() => navigate('/form')}
                    >
                        <TiPencil color="white" size="32" />
                    </Iconbox>
                </IconWrap>
                <SecondWrap>
                    <Bottom>
                        <Tap onClick={() => { navigate("/") }}
                            style={{ paddingLeft: "20px", color:"#f7931e" }}
                        >
                            <AiOutlineHome size="23" />
                            <TapTitle style={{ fontWeight: "bold" }}>HOME</TapTitle>
                        </Tap>
                        <Tap onClick={() => { navigate("/search") }}>
                            <BiSearch size="23" color="#696969" />
                            <TapTitle style={{ color: "#696969" }}>SEARCH</TapTitle>
                        </Tap>
                        <Tap onClick={() => { navigate("/chat") }}>
                            <HiOutlineChatAlt2 size="23" color="#696969" />
                            <TapTitle style={{ color: "#696969" }}>CHAT</TapTitle>
                        </Tap>
                        <Tap
                            style={{ paddingRight: "20px" }}
                            onClick={() => { navigate("/mypage")}}
                        >
                            <FiUser size="23" color="#696969" />
                            <TapTitle style={{ color: "#696969" }}>MY</TapTitle>
                        </Tap>
                    </Bottom>
                </SecondWrap>
            </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const Navbar = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
`
const NavbarTitle = styled.div`
    cursor: pointer;
`
const SecondWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #ffffff;
    bottom:0;
`
const Bottom = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
`

const Tap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const TapTitle = styled.div`
    font-size: 12px;
`

const IconWrap = styled.div`
  width: 95%;
  display: flex;
  justify-content: right;
`
const Iconbox = styled.div`
  width:50px;
  height:50px;
  background-color: #f7931e;
  border-radius: 30px;
  position: fixed;
  bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`