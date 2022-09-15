import React from 'react';
import { useNavigate } from "react-router-dom"
import InformationHome from '../components/informationBoard/InformationHome';
import Header from '../components/Header';
import styled from 'styled-components';

const InformationPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <Navbar>
                <NavbarTitle
                    onClick={() => { navigate("/main") }}
                    style={{ paddingLeft: "20px" }}
                >도움요청</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/information") }}
                    style={{ fontWeight: "800", textDecoration: "underline", color:"#f7931e" }}
                >정보공유</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/calendar") }}
                    style={{  }}
                >만남일정</NavbarTitle>
                <NavbarTitle
                    onClick={() => { navigate("/freetalk") }}
                    style={{ paddingRight: "20px" }}
                >자유토크</NavbarTitle>
            </Navbar>
            <InformationHome />
        </Container>
    );
};

export default InformationPage;

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
    /* font-weight: bold; */
    ;
`

const NavbarTitle = styled.div`
    cursor: pointer;
`
