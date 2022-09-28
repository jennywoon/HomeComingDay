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

const NoticeHome = () => {
  const navigate = useNavigate();

  return (
    <StHomeContainer>
      <StHelpContainer>
        <StHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            style={{ paddingLeft: '10px' }}
            onClick={() => {
              navigate('/main');
            }}
          />
          <StHeaderTitle>알림</StHeaderTitle>
          <div></div>
        </StHeader>
      </StHelpContainer>
        <NoticeList />
      {/* <BottomTap /> */}
      <StBottomTapWrap>
        <StBottom>
          <StTap
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
            <StTapTitle style={{ color: '#8E8E8E' }}>홈</StTapTitle>
          </StTap>
          <StTap
            onClick={() => {
              navigate('/search');
            }}
          >
            <img
              src={Searchimg}
              alt='검색'
              style={{ width: '45%', margin: '2px' }}
            />
            <StTapTitle style={{ color: '#8E8E8E' }}>검색</StTapTitle>
          </StTap>
          <StTap
            onClick={() => {
              navigate('/chat');
            }}
          >
            <img
              src={Chatimg}
              alt='채팅'
              style={{ width: '45%', margin: '2px' }}
            />
            <StTapTitle style={{ color: '#8E8E8E' }}>채팅</StTapTitle>
          </StTap>
          <StTap
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
            <StTapTitle style={{ color: '#8E8E8E' }}>MY</StTapTitle>
          </StTap>
        </StBottom>
      </StBottomTapWrap>
    </StHomeContainer>
  );
};

export default NoticeHome;

const StHomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StHelpContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StHeader = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
`;
const StHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const StBottomTapWrap = styled.div`
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

const StTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const StTapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
`;
