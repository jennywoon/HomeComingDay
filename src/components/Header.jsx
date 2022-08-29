import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { VscBell } from "react-icons/vsc";
import BottomTap from './BottomTap';

const Header = () => {

    return (
        <HeaderContainer>
            <HeaderTitle>HomeComing Day</HeaderTitle>
            <VscBell size="23" />
        </HeaderContainer>

    );
};

export default Header;

const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #eee;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    font-size: 20px;
    font-weight: bold;
`

const HeaderTitle = styled.div``
