import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/cookies';
import Home from '../components/helpBoard/Home';
import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import MyPageHome from '../components/myPageBoard/MyPageHome';
import { VscBell } from "react-icons/vsc";
import goldmedal from "../assets/goldmedal.png"
import mypagelogo from "../assets/mypagelogo.png"

const MyPage = () => {

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
            <HeaderContainer>
                <HeaderWrap>
                    <Logo onClick={() => { navigate("/main") }} style={{ cursor: "pointer" }} />
                    {/* <HeaderTitle
                onClick={() => { navigate("/") }} style={{ cursor: "pointer" }}
            >HomeComing Day</HeaderTitle> */}
                    <IconWrap>
                        <VscBell size="27"
                            onClick={() => { navigate("/notice") }} style={{ cursor: "pointer" }}
                        />
                        <NewDiv>
                            <NewTitle>N</NewTitle>
                        </NewDiv>
                    </IconWrap>
                </HeaderWrap>
            </HeaderContainer>
            <MyPageHome />
        </Container>
        </>
    );
};

export default MyPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const HeaderContainer = styled.div`
    /* position: sticky;
    top: 0; */
    background-color: #f7931e;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    /* border: 1px solid green; */
`

const Logo = styled.div`
    width: 27px;
    height: 36px;
    background-image: url(${mypagelogo});
    background-position: center;
    background-size: 100% 100%;
`
const HeaderWrap = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
`
const HeaderTitle = styled.div`
`
const IconWrap = styled.div`
    display: flex;
    /* border: 1px solid red; */
    align-items: start;
    position: relative;
`
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
`
const NewTitle = styled.div`
    font-size: 10px;
    font-weight: 600;
    color: white;
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