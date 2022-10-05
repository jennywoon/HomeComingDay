import React from 'react';
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';

const HeaderTap = () => {
    const navigate = useNavigate();

    return (
        <Navbar>
            <NavbarTitle
                onClick={() => { navigate("/main")}}
                style={{ cursor: "pointer", paddingLeft: "20px" }}
            >도움요청</NavbarTitle>
            <NavbarTitle
                onClick={() => { navigate("/information") }}
                style={{ cursor: "pointer" }}
            >정보공유</NavbarTitle>
            <NavbarTitle
                onClick={() => { navigate("/calendar") }}
                style={{ cursor: "pointer" }}
            >만남일정</NavbarTitle>
            <NavbarTitle
                onClick={() => { navigate("/freetalk") }}
                style={{ cursor: "pointer", paddingRight: "20px" }}
            >자유토크</NavbarTitle>
        </Navbar>
    );
};

export default HeaderTap;

const Navbar = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    ;
`

const NavbarTitle = styled.div``