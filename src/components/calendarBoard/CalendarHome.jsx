import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';
import HomeColorimg from '../../assets/HomeColor.png';
import Searchimg from '../../assets/Search.png';
import Chatimg from '../../assets/Chat.png';
import Myimg from '../../assets/My.png';

const CalendarHome = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Calendar />
      <IconWrap>
        <Iconbox onClick={() => navigate('/form')}>
          <TiPencil color='white' size='32' />
        </Iconbox>
      </IconWrap>
      <SecondWrap>
        <Bottom>
          <Tap
            onClick={() => {
              navigate('/main');
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
            <TapTitle style={{ color: '#696969' }}>검색</TapTitle>
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
            <TapTitle style={{ color: '#696969' }}>채팅</TapTitle>
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
            <TapTitle style={{ color: '#696969' }}>MY</TapTitle>
          </Tap>
        </Bottom>
      </SecondWrap>
    </HomeContainer>
  );
};

export default CalendarHome;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
`;

const NavbarTitle = styled.div`
  cursor: pointer;
`;
const SecondWrap = styled.div`
  width: 100%;
  position: sticky;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`;
const Bottom = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
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
const IconWrap = styled.div`
  width: 95%;
  display: flex;
  justify-content: right;
`;
const Iconbox = styled.div`
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
