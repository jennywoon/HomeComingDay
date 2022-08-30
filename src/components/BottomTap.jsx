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
                    <Tap onClick={() => {navigate("/")}}
                    style={{paddingLeft: "20px"}}
                    >
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
                    <Tap
                    style={{paddingRight: "20px"}}
                    >
                        <FiUser size="23"/>
                        <TapTitle>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
    );
};

export default BottomTap;

const SecondWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #eee;
    bottom: 0;
`
const Bottom = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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