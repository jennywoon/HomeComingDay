import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from 'react-icons/io';
import Homeimg from '../../assets/Home.png';
import Searchimg from '../../assets/Search.png';
import Chatimg from '../../assets/Chat.png';
import Myimg from '../../assets/My.png';
import NoticeList from './NoticeList';
// import { initSocketConnection, disconnectSocket } from './Socketio';

const ChatHome = () => {
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state);
  console.log(userinfo)

  //   useEffect(() => {
  //     initSocketConnection();
  //     return () => {
  //       disconnectSocket();
  //     };
  //   }, []);

  return (
    <HomeContainer>
      <HelpContainer>
        <Header>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            style={{ paddingLeft: '10px' }}
            onClick={() => {
              navigate('/main');
            }}
          />
          <HeaderTitel>알림</HeaderTitel>
          <div></div>
        </Header>
        <NoticeList />
      </HelpContainer>
      {/* <BottomTap /> */}
      <BottomTapWrap>
        <Bottom>
          <Tap
            onClick={() => {
              navigate('/main');
            }}
            style={{ paddingLeft: '20px' }}
          >
            <img
              src={Homeimg}
              alt='홈'
              style={{ width: '45%', margin: '2px' }}
            />
            <TapTitle style={{ color: '#8E8E8E' }}>홈</TapTitle>
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
`;

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
  /* margin-bottom: 10px; */
  border-bottom: 1px solid #f5f5f5;
`;
const HeaderTitel = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const BottomTapWrap = styled.div`
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
