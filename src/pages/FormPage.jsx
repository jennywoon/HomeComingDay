import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Form2 from "../components/test/Form2"
import { getCookie } from '../shared/cookies';
import goldmedal from "../assets/goldmedal.png"

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
            <p>로그인 필요</p>
            <img src={goldmedal} alt="로그인 필요" />
            <span>
              로그인된 상태에서만
              <br />
              이용할 수 있습니다.
            </span>
            <NeedLoginBtn
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인하러가기
            </NeedLoginBtn>
          </NeedLoginModal>
        </NeedLogin>
      )}
      <Container>
        <Form2 />
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
  background-color: var(--blue4);
  padding: 16px 30px;
  color: black;
  border-radius: 9px;
  margin-top: 17px;
  a {
    width: 100%;
    height: 100%;
  }
`;
const NeedLoginModal = styled.div`
  p {
    font-weight: 700;
    margin-bottom: 10px;
  }
  span {
    font-weight: 500;
    color: var(--blue4);
    margin-top: 15px;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 99999;
  box-shadow: 0px 14px 24px -4px rgba(117, 146, 189, 0.32),
    inset 0px 8px 14px rgba(255, 255, 255, 0.3);
  border-radius: 21px;
  padding: 40px 80px;
  width: 80%;
  text-align: center;
`;