import React from 'react';
import Home from '../components/helpBoard/Home';
import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"
import MyPageHome from '../components/myPageBoard/MyPageHome';
import { VscBell } from "react-icons/vsc";
import mypagelogo from "../assets/mypagelogo.png"

const MyPage = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <HeaderContainer>
                <HeaderWrap>
                    <Logo onClick={() => { navigate("/") }} style={{ cursor: "pointer" }} />
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
