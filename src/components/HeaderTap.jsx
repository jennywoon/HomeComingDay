import React from 'react';
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';

const HeaderTap = () => {
    const navigate = useNavigate();

    return (
        <Navbar>
            <NavbarTitle
                onClick={() => { navigate("/mainhelp") }}
                style={{ cursor: "pointer" }}
            >도움요청</NavbarTitle>
            <NavbarTitle>정보공유</NavbarTitle>
            <NavbarTitle>만남일정</NavbarTitle>
            <NavbarTitle>자유토크</NavbarTitle>
        </Navbar>
    );
};

export default HeaderTap;

const Navbar = styled.div`
    width: 420px;
    height: 30px;
    border: 1px solid green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 20px; */
    font-size: 15px;
    font-weight: bold;
`

const NavbarTitle = styled.div``