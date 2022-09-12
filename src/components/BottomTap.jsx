import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeColorimg from '../assets/HomeColor.png';
import Searchimg from '../assets/Search.png';
import Chatimg from '../assets/Chat.png';
import Myimg from '../assets/My.png';

const BottomTap = () => {
  const navigate = useNavigate();

  return (
    <SecondWrap>
      <Bottom>
        <Tap
          onClick={() => {
            navigate('/');
          }}
          style={{ paddingLeft: '20px', color: '#f7931e' }}
        >
          <img
            src={HomeColorimg}
            alt='홈'
            style={{ width: '45%', margin: '2px' }}
          />
          <TapTitle style={{ fontWeight: 'bold' }}>홈</TapTitle>
        </Tap>
        <Tap
          onClick={() => {
            navigate('/search');
          }}
        >
          <img
            src={Searchimg}
            alt='검색'
            style={{ width: '45%', margin: '2px' }}
          />
          <TapTitle style={{ color: '#8E8E8E' }}>검색</TapTitle>
        </Tap>
        <Tap
          onClick={() => {
            navigate('/chat');
          }}
        >
          <img
            src={Chatimg}
            alt='채팅'
            style={{ width: '45%', margin: '2px' }}
          />
          <TapTitle style={{ color: '#8E8E8E' }}>채팅</TapTitle>
        </Tap>
        <Tap
          style={{ paddingRight: '20px' }}
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <img
            src={Myimg}
            alt='마이페이지'
            style={{ width: '45%', margin: '2px' }}
          />
          <TapTitle style={{ color: '#8E8E8E' }}>MY</TapTitle>
        </Tap>
      </Bottom>
    </SecondWrap>
  );
};

export default BottomTap;

const SecondWrap = styled.div`
  width: 100%;
  position: sticky;
  background-color: #eee;
  bottom: 0;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`;
const Bottom = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const TapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
`;
