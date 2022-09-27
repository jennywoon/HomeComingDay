import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Form2 from "../components/test/Form2"
import { getCookie } from '../shared/cookies';
import goldmedal from "../assets/goldmedal.png"
import FormBoard from "../components/test/FormBoard"
import logoutAlert from "../assets/logoutAlert.png"

const FormPage = () => {
  // 토큰 만료되면 로그아웃
  const token = getCookie("accessToken");
  const navigate = useNavigate();
  const [loginOn, setLoginOn] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoginOn(false);
    }
  }, [loginOn]);

  return (
    <>
      {loginOn ? (
        ""
      ) : (
        <NeedLogin>
                    <NeedLoginModal>
                        <LoginModalTop>
                            자동 로그아웃 안내
                        </LoginModalTop>
                        <LoginModalImg>
                        <img src={logoutAlert} style={{width:"63px"}}alt="로그인 필요" />
                        </LoginModalImg>
                        <LoginModaltxt>
                            로그인 후 1시간이 경과되어 
                            <br/>
                            자동 로그아웃 되었습니다   
                        </LoginModaltxt>
                        <NeedLoginBtn
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            다시 로그인 하기
                        </NeedLoginBtn>
                    </NeedLoginModal>
                </NeedLogin>
      )}
      <Container>
        {/* <Form2 /> */}
        <FormBoard/>
      </Container>
    </>
  );
};

export default FormPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

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
  background: #FFFFFF;
  padding: 10px 0px;
  color: #F7931E;
  border-radius: 9px;
  margin-top: 17px;
  width:85%;
  border: 1px solid #F7931E;
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
  height:240px;
  z-index: 99999;
  box-shadow: 0px 14px 24px -4px rgba(117, 146, 189, 0.32),
    inset 0px 8px 14px rgba(255, 255, 255, 0.3);
  border-radius: 21px;
  width: 80%;
  text-align: center;
  
`;

const LoginModalTop = styled.div`
    width:100%;
    height:44px;
    background: #F7931E;
    font-weight: 700;
    font-size: 16px;
    border-radius: 16px 16px 0px 0px;
    color: #FFFFFF;
    line-height: 44px;
`
const LoginModalImg = styled.div`
    width:100%;
    height:70px;
    line-height: 70px;
`
const LoginModaltxt = styled.div`
    width:100%;
    text-align: center;
    font-size: 14px;
    
`