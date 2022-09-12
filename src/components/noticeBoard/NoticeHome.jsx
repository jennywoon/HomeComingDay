import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { TbBellRinging } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import Homeimg from '../../assets/Home.png';
import Searchimg from '../../assets/Search.png';
import Chatimg from '../../assets/Chat.png';
import Myimg from '../../assets/My.png';

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
                            <IoMdClose size="22" color="#8E8E8E" />
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
                        <img
              src={Homeimg}
              alt='홈'
              style={{ width: '45%', margin: '2px' }}
            />
                        <TapTitle style={{ color: "#8E8E8E" }}>홈</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/search") }}>
                    <img
              src={Searchimg}
              alt='검색'
              style={{ width: '45%', margin: '2px' }}
            />
                        <TapTitle style={{ color: "#8E8E8E" }}>검색</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/chat") }}>
                    <img
              src={Chatimg}
              alt='채팅'
              style={{ width: '45%', margin: '2px' }}
            />
                        <TapTitle style={{ color: "#8E8E8E" }}>채팅</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: "20px" }}
                        onClick={() => { navigate("/mypage") }}
                    >
                        <img
              src={Myimg}
              alt='마이페이지'
              style={{ width: '45%', margin: '2px' }}
            />
                        <TapTitle style={{ color: "#8E8E8E" }}>MY</TapTitle>
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
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
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
  font-size: 11px;
  font-weight: 400;
`