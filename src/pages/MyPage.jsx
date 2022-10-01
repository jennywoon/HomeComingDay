import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../shared/cookies';
import styled from 'styled-components';
import MyPageHome from '../components/myPageBoard/MyPageHome';
import mypagelogo from '../assets/mypagelogo.png';
import logoutAlert from '../assets/logoutAlert.png';
import { __getNoticeCount } from '../redux/modules/NoticeSlice';
import bell from '../assets/Bell.png';

const MyPage = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.notice.notices.count);
  // console.log(count);

  // 토큰 만료되면 로그아웃
  const token = getCookie('accessToken');
  const navigate = useNavigate();
  const [loginOn, setLoginOn] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoginOn(false);
    }
  }, [loginOn]);

  useEffect(() => {
    dispatch(__getNoticeCount());
  }, [dispatch]);

  return (
    <>
      {loginOn ? (
        ''
      ) : (
        <StNeedLogin>
          <StNeedLoginModal>
            <StLoginModalTop>자동 로그아웃 안내</StLoginModalTop>
            <StLoginModalImg>
            <StLogoutAlert
                src={logoutAlert}
                alt='로그인 필요'
              />
            </StLoginModalImg>
            <StLoginModaltxt>
              로그인 후 1시간이 경과되어
              <br />
              자동 로그아웃 되었습니다
            </StLoginModaltxt>
            <StNeedLoginBtn
              onClick={() => {
                navigate('/login');
              }}
            >
              다시 로그인 하기
            </StNeedLoginBtn>
          </StNeedLoginModal>
        </StNeedLogin>
      )}
      <StContainer>
        <StHeaderContainer>
          <StHeaderWrap>
            <StLogo
              onClick={() => {
                navigate('/main');
              }}
            />
            <StIconWrap>
            <StBellimg
              src={bell}
              alt='알림 아이콘'
              onClick={() => {
                navigate('/notice');
              }}
            />
              {count > 0 ? (
                <StNewDiv>
                  <StNewTitle>N</StNewTitle>
                </StNewDiv>
              ) : null}
            </StIconWrap>
          </StHeaderWrap>
        </StHeaderContainer>
        <MyPageHome />
      </StContainer>
    </>
  );
};

export default MyPage;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

const StHeaderContainer = styled.div`
  background-color: #f7931e;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const StLogo = styled.div`
  width: 27px;
  height: 36px;
  background-image: url(${mypagelogo});
  background-position: center;
  background-size: 100% 100%;
  cursor: pointer;
`;

const StHeaderWrap = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StIconWrap = styled.div`
  display: flex;
  align-items: start;
  position: relative;
`;

const StBellimg = styled.img`
  cursor: pointer;
`

const StNewDiv = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 15px;
  position: absolute;
`;

const StNewTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: white;
`;

const StNeedLogin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: rgba(87, 87, 87, 0.3);
  z-index: 99999;
`;

const StNeedLoginBtn = styled.button`
  background: #ffffff;
  padding: 10px 0px;
  color: #f7931e;
  border-radius: 9px;
  margin-top: 17px;
  width: 85%;
  border: 1px solid #f7931e;
  border-radius: 12px;
  cursor: pointer;
`;

const StNeedLoginModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 240px;
  z-index: 99999;
  box-shadow: 0px 14px 24px -4px rgba(117, 146, 189, 0.32),
    inset 0px 8px 14px rgba(255, 255, 255, 0.3);
  border-radius: 21px;
  width: 80%;
  text-align: center;
`;

const StLoginModalTop = styled.div`
  width: 100%;
  height: 44px;
  background: #f7931e;
  font-weight: 700;
  font-size: 16px;
  border-radius: 16px 16px 0px 0px;
  color: #ffffff;
  line-height: 44px;
`;

const StLoginModalImg = styled.div`
  width: 100%;
  height: 70px;
  line-height: 70px;
`;

const StLogoutAlert = styled.img`
  width: 63px;
`

const StLoginModaltxt = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
`;
