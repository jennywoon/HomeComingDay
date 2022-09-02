import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const ChatHome = () => {
    const navigate =  useNavigate();

    return (
        <HomeContainer>
            <HelpContainer>
                <ChatCardContainer onClick={() => {navigate("/chatform")}} style={{cursor:"pointer"}}>
                    <HeadImg />
                    <ChatContainer>
                        {/* map 돌릴 예정 */}
                        <FirstContainer>
                            <FirstWrap>
                                <UserName>나청운</UserName>
                                <Dismmision>14학번</Dismmision>
                            </FirstWrap>
                            <SecondWrap>
                                <TimeCheck>15분 전</TimeCheck>
                            </SecondWrap>
                        </FirstContainer>
                        <SecondContainer>
                            <ChatContent>시간 언제 괜찮으신가요?</ChatContent>
                        </SecondContainer>
                    </ChatContainer>
                </ChatCardContainer>
                <ChatCardContainer>
                    <HeadImg />
                    <ChatContainer>
                        {/* map 돌릴 예정 */}
                        <FirstContainer>
                            <FirstWrap>
                                <UserName>나청운</UserName>
                                <Dismmision>14학번</Dismmision>
                            </FirstWrap>
                            <SecondWrap>
                                <TimeCheck>15분 전</TimeCheck>
                            </SecondWrap>
                        </FirstContainer>
                        <SecondContainer>
                            <ChatContent>시간 언제 괜찮으신가요?</ChatContent>
                        </SecondContainer>
                    </ChatContainer>
                </ChatCardContainer>
            </HelpContainer>
            {/* <BottomTap /> */}
            <BottomTapWrap>
                <Bottom>
                    <Tap onClick={() => { navigate("/") }}
                        style={{ paddingLeft: "20px" }}
                    >
                        <AiOutlineHome size="23" color="#696969"/>
                        <TapTitle style={{ color: "#696969" }}>HOME</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/search") }}>
                        <BiSearch size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>SEARCH</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/chat") }}>
                        <HiOutlineChatAlt2 size="23"/>
                        <TapTitle style={{ fontWeight: "bold" }}>CHAT</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: "20px" }}
                    >
                        <FiUser size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </BottomTapWrap>
        </HomeContainer>
    );
};

export default ChatHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const HelpContainer = styled.div`
  /* gap: 8px; */
  height: 100vh;
  /* overflow-y: scroll; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  /* border: 1px solid blue; */
`;

const ChatCardContainer = styled.div`
    display: flex;
    /* border: 1px solid green; */
    width: 90%;
    height: 80px;
    justify-content: center;
    align-items: center;
`
const ChatContainer = styled.div`
    width: 90%;
    /* height: 80px; */
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
`

const HeadImg = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f6bd60;
    border-radius: 50%;
`

const FirstContainer = styled.div`
    /* width: 80%; */
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
`
const FirstWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const SecondWrap = styled.div`
    display: flex;
`
const TimeCheck = styled.div`
    font-weight: 400;
    font-size: 12px;
    color: #BEBEBE;
`
const UserName = styled.div`
    font-weight: 600;
    font-size: 16px;
`
const Dismmision = styled.div`
    font-weight: 500;
    font-size: 12px;
    color: #BEBEBE;
`
const SecondContainer = styled.div`
    padding: 0 10px;
`
const ChatContent = styled.div`
    font-weight: 400;
    font-size: 16px;
`

const BottomTapWrap = styled.div`
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