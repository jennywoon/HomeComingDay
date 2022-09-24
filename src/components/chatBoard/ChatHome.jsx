import React , {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Homeimg from '../../assets/Home.png';
import Searchimg from '../../assets/Search.png';
import ChatColorimg from '../../assets/ChatColor.png';
import Myimg from '../../assets/My.png';
import { useDispatch } from 'react-redux';
import { __getReset } from '../../redux/modules/MyPageSlice';

const ChatHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(__getReset())
  },[])


  return (
    <HomeContainer>
      <HelpContainer>
        <ChatCardContainer
          onClick={() => {
            navigate('/chatform');
          }}
          style={{ cursor: 'pointer' }}
        >
          <HeadImg />
          <ChatContainer>
            {/* map 돌릴 예정 */}
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
              <ChatContent>시간 언제 괜찮으신가요?</ChatContent>
            </SecondContainer>
          </ChatContainer>
        </ChatCardContainer>
        <ChatCardContainer>
          <HeadImg />
          <ChatContainer>
            {/* map 돌릴 예정 */}
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
              <ChatContent>시간 언제 괜찮으신가요?</ChatContent>
            </SecondContainer>
          </ChatContainer>
        </ChatCardContainer>
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
            style={{ color: '#f7931e' }}
          >
            <img
              src={ChatColorimg}
              alt='채팅'
              style={{ width: '45%', margin: '2px' }}
            />
            <TapTitle style={{ fontWeight: 'bold' }}>채팅</TapTitle>
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

const ChatCardContainer = styled.div`
  display: flex;
  /* border: 1px solid green; */
  width: 90%;
  height: 80px;
  justify-content: center;
  align-items: center;
`;
const ChatContainer = styled.div`
  width: 90%;
  /* height: 80px; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
`;

const HeadImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f6bd60;
  border-radius: 50%;
`;

const FirstContainer = styled.div`
  /* width: 80%; */
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;
const FirstWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const SecondWrap = styled.div`
  display: flex;
`;
const TimeCheck = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #bebebe;
`;
const UserName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;
const Dismmision = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #bebebe;
`;
const SecondContainer = styled.div`
  padding: 0 10px;
`;
const ChatContent = styled.div`
  font-weight: 400;
  font-size: 16px;
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
