import React from 'react';
import { useNavigate } from "react-router-dom"
import Home from '../components/helpBoard/Home';
import Header from '../components/Header';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import Loading from "../components/test/Loading";

const MainPage = () => {
    const navigate = useNavigate();

    // const { isLoading } = useSelector((state) => state.helps)

    // if (isLoading) {
    //     return <Loading />;
    //   }

    return (
        <Container>
            <Header />
            <Navbar>
                    <NavbarTitle
                        onClick={() => { navigate("/") }}
                        style={{paddingLeft: "20px", fontWeight: "800", textDecoration: "underline", color: "#f7931e" }}
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
            <Home/>
        </Container>
    );
};

export default MainPage;

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
