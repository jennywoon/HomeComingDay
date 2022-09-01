import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GrChatOption } from "react-icons/gr";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const BottomTap = () => {
    const navigate = useNavigate()

    return (
        <SecondWrap>
            <Bottom>
                <Tap onClick={() => { navigate("/") }}
                    style={{ paddingLeft: "20px" }}
                >
                    <AiOutlineHome size="23"/>
                    <TapTitle style={{fontWeight:"bold"}}>HOME</TapTitle>
                </Tap>
                <Tap onClick={() => { navigate("/search") }}>
                    <BiSearch size="23" color="#696969"/>
                    <TapTitle style={{color:"#696969"}}>SEARCH</TapTitle>
                </Tap>
                <Tap onClick={() => { navigate("/chat")}}>
                    <HiOutlineChatAlt2 size="23" color="#696969"/>
                    <TapTitle style={{color:"#696969"}}>CHAT</TapTitle>
                </Tap>
                <Tap
                    style={{ paddingRight: "20px" }}
                >
                    <FiUser size="23"  color="#696969"/>
                    <TapTitle style={{color:"#696969"}}>MY</TapTitle>
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