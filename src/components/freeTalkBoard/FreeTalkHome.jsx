import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import FreeTalk from './FreeTalk';
import { useNavigate } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';
import HomeColorimg from '../../assets/HomeColor.png';
import Searchimg from '../../assets/Search.png';
import Chatimg from '../../assets/Chat.png';
import Myimg from '../../assets/My.png';

const FreeTalkHome = () => {
  const navigate = useNavigate();
  const chatList = useSelector((state) => state.chat.chatList[0]);

  return (
    <StHomeContainer>
      <FreeTalk />
      <StIconWrap>
        <StIconbox onClick={() => navigate('/form')}>
          <TiPencil color='white' size="32" />
        </StIconbox>
      </StIconWrap>
      <StSecondWrap>
        <StBottom>
          <StFirstTap
            onClick={() => {
              navigate('/main');
            }}
          >
            <StImg
              src={HomeColorimg}
              alt='홈'
            />
            <StHomeTitle>홈</StHomeTitle>
          </StFirstTap>
          <StTap
            onClick={() => {
              navigate('/search');
            }}
          >
            <StImg
              src={Searchimg}
              alt='검색'
            />
            <StTapTitle>검색</StTapTitle>
          </StTap>
          <StTap
            onClick={() => {
              navigate('/chat');
            }}
          >
            <StChatIconWrap>
              <StImg
                src={Chatimg}
                alt='채팅'
              />
              {chatList && chatList.totalCnt > 0 ? (
                <StNewDiv>
                <StNewTitle>N</StNewTitle>
              </StNewDiv>
              ) : null}
            </StChatIconWrap>
            <StTapTitle>채팅</StTapTitle>
          </StTap>
          <StLastTap
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <StImg
              src={Myimg}
              alt='마이페이지'
            />
            <StTapTitle>MY</StTapTitle>
          </StLastTap>
        </StBottom>
      </StSecondWrap>
    </StHomeContainer>
  );
};

export default FreeTalkHome;

const StHomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StSecondWrap = styled.div`
  width: 100%;
  position: sticky;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`;
const StBottom = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

const StFirstTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;
`

const StTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StChatIconWrap = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: center;
  /* align-items: start; */
  position: relative;
`

const StNewDiv = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1px;
  position: absolute;
`;
const StNewTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: white;
`;

const StLastTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;
`
const StImg = styled.img`
    width: 25px;
  height: 25px;
  margin: 2px;
`

const StHomeTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #f7931e;
`
const StTapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #696969;
`;

const StIconWrap = styled.div`
  width: 95%;
  display: flex;
  justify-content: right;
`;
const StIconbox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f7931e;
  border-radius: 30px;
  position: fixed;
  bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
