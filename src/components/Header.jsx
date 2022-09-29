import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { VscBell } from 'react-icons/vsc';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { __getMyPage } from '../redux/modules/MyPageSlice';
import Cookies from 'universal-cookie';
import { getCookie, removeCookie } from '../shared/cookies';
import goldmedal from '../assets/goldmedal.png';
import logoutAlert from '../assets/logoutAlert.png';
import { __getNoticeCount } from '../redux/modules/NoticeSlice';
import bell from '../assets/Bell.png';

const Header = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mypages.mypages);
  const count = useSelector((state) => state.notice.notices.count);
  console.log(count);

  // 토큰 만료되면 로그아웃
  const navigate = useNavigate();
  const token = getCookie('accessToken');
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
        <NeedLogin>
          <NeedLoginModal>
            <LoginModalTop>자동 로그아웃 안내</LoginModalTop>
            <LoginModalImg>
              <img
                src={logoutAlert}
                style={{ width: '63px' }}
                alt='로그인 필요'
              />
            </LoginModalImg>
            <LoginModaltxt>
              로그인 후 1시간이 경과되어
              <br />
              자동 로그아웃 되었습니다
            </LoginModaltxt>
            <NeedLoginBtn
              onClick={() => {
                navigate('/login');
              }}
            >
              다시 로그인 하기
            </NeedLoginBtn>
          </NeedLoginModal>
        </NeedLogin>
      )}
      <HeaderContainer>
        <HeaderWrap>
          <Logo
            onClick={() => {
              navigate('/main');
            }}
            style={{ cursor: 'pointer' }}
          />
          <div style={{ fontSize: '20px' }}>{data && data.schoolName}</div>
          <IconWrap>
            <img
              src={bell}
              alt='알림 아이콘'
              size='27'
              onClick={() => {
                navigate('/notice');
              }}
              style={{ cursor: 'pointer' }}
            />
            {count > 0 ? (
              <NewDiv>
                <NewTitle>N</NewTitle>
              </NewDiv>
            ) : null}
          </IconWrap>
        </HeaderWrap>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eeeded;
`;

const Logo = styled.div`
  width: 27px;
  height: 36px;
  background-image: url(${logo});
  background-position: center;
  background-size: 100% 100%;
`;
const HeaderWrap = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
`;
const HeaderTitle = styled.div``;
const IconWrap = styled.div`
  display: flex;
  /* border: 1px solid red; */
  align-items: start;
  position: relative;
`;
const NewDiv = styled.div`
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
const NewTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: white;
`;
const NeedLogin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: rgba(87, 87, 87, 0.3);
  z-index: 99999;
`;
const NeedLoginBtn = styled.button`
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
const NeedLoginModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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

const LoginModalTop = styled.div`
  width: 100%;
  height: 44px;
  background: #f7931e;
  font-weight: 700;
  font-size: 16px;
  border-radius: 16px 16px 0px 0px;
  color: #ffffff;
  line-height: 44px;
`;
const LoginModalImg = styled.div`
  width: 100%;
  height: 70px;
  line-height: 70px;
`;
const LoginModaltxt = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
`;
