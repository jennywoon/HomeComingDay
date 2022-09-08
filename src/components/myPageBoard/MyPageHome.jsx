import React from 'react';
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import MyPageUser from './MyPageUser';
import MyPageCard from './MyPageCard';

const MyPageHome = () => {

    const navigate = useNavigate();

    return (
        <HomeContainer>
            <MyPageTop>
                <MyPageUser />
            </MyPageTop>
            <MyPageBottom>
                <BottomWrap>
                    <TitleWrap>
                        <MyPostTitle>내가 쓴 게시글</MyPostTitle>
                        <PostCount>14</PostCount>
                    </TitleWrap>
                    {/* card 맵 돌리기 */}
                    <MyPageCard />
                    <MyPageCard />
                </BottomWrap>
            </MyPageBottom>
            <SecondWrap>
                <Bottom>
                    <Tap onClick={() => { navigate("/") }}
                        style={{ paddingLeft: "20px" }}
                    >
                        <AiOutlineHome size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>HOME</TapTitle>
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
                        style={{ paddingRight: "20px", color: "#f7931e" }}
                        onClick={() => { navigate("/mypage") }}
                    >
                        <FiUser size="23" />
                        <TapTitle style={{ fontWeight: "bold" }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
        </HomeContainer>
    );
};

export default MyPageHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: #f7931e; */
`

const MyPageTop = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center; 
    align-items: center;
    background-color: #f7931e;
    /* border: 1px solid red; */
`

const MyPageBottom = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /* background-color: #f7931e; */
`

const BottomWrap = styled.div`
    /* border: 1px solid red; */
    width: 90%;
`
const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin: 20px 0 15px 0;
    gap: 10px;
`
const MyPostTitle = styled.div`
    color: #bebebe;
`

const PostCount = styled.div`
    color: #f7931e;
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