import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import Homeimg from '../../assets/Home.png';
import SearchColorimg from '../../assets/SearchColor.png';
import Chatimg from '../../assets/Chat.png';
import Myimg from '../../assets/My.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchHome = () => {
  const navigate = useNavigate();
  const chatList = useSelector((state) => state.chat.chatList[0]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyPage());
  }, [dispatch]);

  return (
    <StHomeContainer>
      <Search />
      <StSecondWrap>
        <StBottom>
          <StFirstTap
            onClick={() => {
              navigate('/main');
            }}
          >
            <StImg src={Homeimg} alt='홈' />
            <StTapTitle>홈</StTapTitle>
          </StFirstTap>
          <StTap
            onClick={() => {
              navigate('/search');
            }}
          >
            <StImg src={SearchColorimg} alt='검색' />
            <StColorTapTitle>검색</StColorTapTitle>
          </StTap>
          <StTap
            onClick={() => {
              navigate('/chat');
            }}
          >
            <StIconWrap>
              <StImg src={Chatimg} alt='채팅' />
              {chatList && chatList.totalCnt > 0 ? (
                <StNewDiv>
                  <StNewTitle>N</StNewTitle>
                </StNewDiv>
              ) : null}
            </StIconWrap>
            <StTapTitle>채팅</StTapTitle>
          </StTap>
          <StLastTap
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <StImg src={Myimg} alt='마이페이지' />
            <StTapTitle>MY</StTapTitle>
          </StLastTap>
        </StBottom>
      </StSecondWrap>
    </StHomeContainer>
  );
};

export default SearchHome;

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
`;

const StFirstTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;
`;

const StLastTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;
`;

const StImg = styled.img`
  width: 25px;
  height: 25px;
  margin: 2px;
`;

const StTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StIconWrap = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

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

const StTapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #696969;
`;

const StColorTapTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #f7931e;
`;
