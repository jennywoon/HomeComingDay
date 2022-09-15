import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import { useNavigate } from "react-router-dom"
import SearchTest from './SearchTest';
import Homeimg from "../../assets/Home.png"
import SearchColorimg from "../../assets/SearchColor.png"
import Chatimg from "../../assets/Chat.png"
import Myimg from "../../assets/My.png"

const SearchHome = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <Search/>
            <SearchTest/>
            <SecondWrap>
                <Bottom>
                    <Tap onClick={() => { navigate("/main") }}
                        style={{ paddingLeft: "20px" }}
                    >
                        <img src={Homeimg} alt='홈' style={{ width: '45%', margin:'2px' }} />
                        <TapTitle style={{ color: "#8E8E8E" }}>홈</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/search") }}
                        style={{ color:"#f7931e" }}
                    >
                        <img src={SearchColorimg} alt='검색' style={{ width: '45%', margin:'2px' }} />
                        <TapTitle style={{ fontWeight: "bold" }}>검색</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/chat") }}>
                    <img src={Chatimg} alt='채팅' style={{ width: '45%', margin:'2px' }} />
                        <TapTitle style={{ color: "#8E8E8E" }}>채팅</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: "20px" }}
                        onClick={() => { navigate("/mypage") }}
                    >
                        <img src={Myimg} alt='마이페이지' style={{ width: '45%', margin:'2px' }} />
                        <TapTitle style={{ color: "#8E8E8E" }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
        </HomeContainer>
    );
};

export default SearchHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const SecondWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #ffffff;
    bottom: 0;
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
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
    font-size: 11px;
    font-weight: 400;
`