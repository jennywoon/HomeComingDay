import React from 'react';
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';

const HeaderTap = () => {
    const navigate = useNavigate();

    return (
            <Navbar>
                <NavbarTitle
                    onClick={() => { navigate("/") }}
                    style={{ cursor: "pointer", paddingLeft: "30px" }}
                >도움요청</NavbarTitle>
                <NavbarTitle>정보공유</NavbarTitle>
                <NavbarTitle>만남일정</NavbarTitle>
                <NavbarTitle
                    style={{ paddingRight: "30px" }}
                >자유토크</NavbarTitle>
            </Navbar>
    );
};

export default HeaderTap;

const Navbar = styled.div`
    width: 420px;
    height: 40px;
    border: 1px solid green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    margin-top: 60px;
    position: fixed;
    background-color: white;
    z-index: 2;
`

const NavbarTitle = styled.div``