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

const Home = () => {
    const navigate = useNavigate();

    return (

        <HomeContainer>
            {/* <HeaderTap/> */}
            <Navbar>
                <NavbarTitle
                    onClick={() => { navigate("/") }}
                    style={{ cursor: "pointer", paddingLeft: "20px", fontWeight:"800", textDecoration:"underline"}}
                >도움요청</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/information") }}
                    style={{ cursor: "pointer" }}
                >정보공유</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/calendar") }}
                    style={{ cursor: "pointer" }}
                >만남일정</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/freetalk") }}
                    style={{ cursor: "pointer", paddingRight: "20px" }}
                >자유토크</NavbarTitle>
            </Navbar>
            <Help />
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

export default Home;

const HomeContainer = styled.div`
    width: 100%;
    /* height: 100vh; */
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