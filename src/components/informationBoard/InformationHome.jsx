import React from 'react';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import HeaderTap from '../HeaderTap';
import Information from './Information';
import { useNavigate } from 'react-router-dom';
import { TiPencil } from 'react-icons/ti';
import HomeColorimg from '../../assets/HomeColor.png';
import Searchimg from '../../assets/Search.png';
import Chatimg from '../../assets/Chat.png';
import Myimg from '../../assets/My.png';

const InformationHome = () => {
  const navigate = useNavigate();

  return (
    <StHomeContainer>
      <Information />
      <StIconWrap>
        <StIconbox onClick={() => navigate('/form')}>
          <TiPencil color='white' size='32' />
        </StIconbox>
      </StIconWrap>
      <StSecondWrap>
        <StBottom>
          <StFirstTap
            onClick={() => {
              navigate('/main');
            }}
          >
            <StTapimg
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
            <StTapimg
              src={Searchimg}
              alt='검색'
              
            />
            <StTapTitle >검색</StTapTitle>
          </StTap>
          <StTap
            onClick={() => {
              navigate('/chat');
            }}
          >
            <StTapimg
              src={Chatimg}
              alt='채팅'
              
            />
            <StTapTitle>채팅</StTapTitle>
          </StTap>
          <StLastTap
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <StTapimg
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

export default InformationHome;

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

const StHomeTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #f7931e;
`

const StTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StLastTap = styled.div`
    display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;
`

const StTapimg = styled.img`
  width: 45%;
  margin: 2px;
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
