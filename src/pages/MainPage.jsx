import React from 'react';
import { useNavigate } from "react-router-dom"
import Home from '../components/helpBoard/Home';
import Header from '../components/Header';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import Loading from "../components/test/Loading";
import bell from '../assets/Bell.png';
import logo from '../assets/logo.png';

const MainPage = () => {
    const navigate = useNavigate();

    const data = useSelector((state) => state.mypages.mypages);
    const count = useSelector((state) => state.notice.notices.count);

    return (
        <Container>
            {/* <Header /> */}
            <StHeaderContainer>
                <StHeaderWrap>
                    <StLogo
                        onClick={() => {
                            navigate('/main');
                        }}
                    />
                    <StSchoolName>{data && data.schoolName}</StSchoolName>
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
            <Navbar>
                <NavbarTitle
                    onClick={() => { navigate("/main") }}
                    style={{ paddingLeft: "20px", fontWeight: "800", textDecoration: "underline", color: "#f7931e" }}
                >도움요청</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/information") }}
                >정보공유</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/calendar") }}
                >만남일정</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/freetalk") }}
                    style={{ paddingRight: "20px" }}
                >자유토크</NavbarTitle>
            </Navbar>
            <Home />
        </Container>
    );
};

export default MainPage;

const StHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eeeded;
`;

const StLogo = styled.div`
  width: 27px;
  height: 36px;
  background-image: url(${logo});
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

const StSchoolName = styled.div`
  font-size: 20px;
`

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

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`
const Navbar = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
`
const NavbarTitle = styled.div`
    cursor: pointer;
`
