import React from 'react';
import styled from 'styled-components';
import Calendar from "./Calendar"
import { useNavigate } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TiPencil } from "react-icons/ti";

const CalendarHome = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <Navbar>
                <NavbarTitle
                    onClick={() => { navigate("/") }}
                    style={{ cursor: "pointer", paddingLeft: "20px" }}
                >도움요청</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/information") }}
                    style={{ cursor: "pointer" }}
                >정보공유</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/calendar") }}
                    style={{ cursor: "pointer", fontWeight: "800", textDecoration: "underline" }}
                >만남일정</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/freetalk") }}
                    style={{ cursor: "pointer", paddingRight: "20px" }}
                >자유토크</NavbarTitle>
            </Navbar>
            <Calendar />
            <IconWrap>
                <Iconbox
                    onClick={() => navigate('/form')}
                >
                    <TiPencil color="white" size="40px" />
                </Iconbox>
            </IconWrap>
            <SecondWrap>
                <Bottom>
                    <Tap onClick={() => { navigate("/") }}
                        style={{ paddingLeft: "20px" }}
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
                    >
                        <FiUser size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
        </HomeContainer>
    );
};

export default CalendarHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Navbar = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    /* font-weight: bold; */
    ;
`

const NavbarTitle = styled.div``
const SecondWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #eee;
    bottom: 0;
`
const Bottom = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  background-color: black;
  border-radius: 30px;
  position: fixed;
  bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`