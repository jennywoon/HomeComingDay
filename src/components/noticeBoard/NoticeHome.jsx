import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TbBellRinging } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const ChatHome = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <HelpContainer>
                <Header>
                    <IoIosArrowBack 
                    size="25px" cursor="pointer" style={{paddingLeft:"10px"}}
                    onClick={() => { navigate("/") }} />
                    <HeaderTitel>알림</HeaderTitel>
                    <div></div>
                </Header>
                <ChatCardContainer onClick={() => { navigate("/chatform") }} style={{ cursor: "pointer" }}>
                    <HeadImg>
                        <TbBellRinging size="32" color="white" />
                    </HeadImg>
                    <ChatContainer>
                        {/* map 돌릴 예정, 맵 돌리고 게시글 없을때 이미지 추가 */}
                        <FirstContainer>
                            <UserName>[마케팅 신입인데 뭘 해야...]게시글에 댓글(2)이 달렸습니다</UserName>
                            <ChatContent>15분 전</ChatContent>
                        </FirstContainer>
                        <SecondContainer>
                            <IoMdClose size="22" color="#696969" />
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
                        <AiOutlineHome size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>HOME</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/search") }}>
                        <BiSearch size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>SEARCH</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/chat") }}>
                        <HiOutlineChatAlt2 size="23" color="#696969"/>
                        <TapTitle style={{ color: "#696969" }}>CHAT</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: "20px" }}
                        onClick={() => { navigate("/mypage") }}
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

const Header = styled.div`
    width: 100%;
    height: 48px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`
const HeaderTitel = styled.div`
    font-size: 16px;
    font-weight: 800;
`
const ChatCardContainer = styled.div`
    display: flex;
    /* border: 1px solid green; */
    width: 90%;
    height: 80px;
    justify-content: center;
    align-items: center;
    gap: 5px;
`
const ChatContainer = styled.div`
    width: 90%;
    /* height: 80px; */
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* flex-direction: column; */
    gap: 4px;
`

const HeadImg = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f7931e;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FirstContainer = styled.div`
    /* width: 80%; */
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`
const UserName = styled.div`
    font-weight: 600;
    font-size: 16px;
    width: 90%;
`
const SecondContainer = styled.div`
    padding: 0 10px;
`
const ChatContent = styled.div`
    font-weight: 400;
    font-size: 12px;
    color: #8E8E8E;
    margin-top: 5px;
`

const BottomTapWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #ffffff;
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