import React from 'react';
import { useNavigate } from "react-router-dom"; 
import styled from 'styled-components';
import { AiOutlineHome } from "react-icons/ai";
import { BsChatLeftDots } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

const BottomTap = () => {
    const navigate = useNavigate()

    return (
        <SecondWrap>
                <Bottom>
                    <Tap onClick={() => {
                        navigate("/")
                    }}>
                        <AiOutlineHome size="23"/>
                        <TapTitle>HOME</TapTitle>
                    </Tap>
                    <Tap>
                        <BsChatLeftDots size="23"/>
                        <TapTitle>CHAT</TapTitle>
                    </Tap>
                    <Tap>
                        <BiSearch size="23"/>
                        <TapTitle>SEARCH</TapTitle>
                    </Tap>
                    <Tap>
                        <FiUser size="23"/>
                        <TapTitle>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
    );
};

export default BottomTap;

const SecondWrap = styled.div`
    /* width: 420px; */
    position: relative;
    bottom: 0;
`
const Bottom = styled.div`
    height: 60px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
`

const Tap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const TapTitle = styled.div`
    font-size: 12px;
`