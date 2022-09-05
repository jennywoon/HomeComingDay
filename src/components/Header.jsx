import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { VscBell } from "react-icons/vsc";
import BottomTap from './BottomTap';

const Header = () => {

    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <div></div>
            <HeaderTitle
                onClick={() => { navigate("/") }} style={{ cursor: "pointer" }}
            >HomeComing Day</HeaderTitle>
            
                <VscBell size="27" color="#696969"
                    onClick={() => {navigate("/notice")}} style={{cursor: "pointer"}}
                />

        </HeaderContainer>

    );
};

export default Header;

const HeaderContainer = styled.div`
    /* position: sticky;
    top: 0; */
    background-color: #eee;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 20px; */
    font-size: 20px;
    font-weight: bold;
    /* border: 1px solid green; */
`

const HeaderTitle = styled.div`
`

