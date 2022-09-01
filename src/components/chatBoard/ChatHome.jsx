import React from 'react';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import HeaderTap from "../HeaderTap"

const ChatHome = () => {
    return (
        <HomeContainer>
            <HelpContainer>
                <ChatContainer>
                        <HeadImg />
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
                            {/* <ChatContent>시간 언제 괜찮으신가요?</ChatContent> */}
                            {/* css 수정중 */}
                        </SecondContainer>
                </ChatContainer>
            </HelpContainer>
            <BottomTap />
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
  gap: 12px;
  height: 100vh;
  /* overflow-y: scroll; */
  display: flex;
  justify-content: center;
`;

const ChatContainer = styled.div`
    width: 95%;
    height: 80px;
    border: 1px solid red;
    display: flex;
    align-items: center;
`

const HeadImg = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f6bd60;
    border-radius: 50%;
`

const FirstContainer = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
`
const FirstWrap = styled.div`
    display: flex;
`
const SecondWrap = styled.div`
    display: flex;
`
const TimeCheck = styled.div``
const UserName = styled.div``
const Dismmision = styled.div``
const SecondContainer = styled.div``
const ChatContent = styled.div``