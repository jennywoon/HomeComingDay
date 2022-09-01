import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {IoIosArrowBack} from 'react-icons/io'
import { BiDotsVerticalRounded } from "react-icons/bi";

const ChatHeaderTap = () => {

    const navigate = useNavigate();

    return (
        <Navbar>
            <IoIosArrowBack
                size="23px" cursor="pointer" style={{ paddingLeft: "20px" }}
                onClick={() => navigate("/chat")} />
            <ChatInfo>
            <NavbarTitle
            // onClick={() => { navigate("/") }}
            // style={{ cursor: "pointer"}}
            >이름</NavbarTitle>
            <HeadStudent>14학번</HeadStudent>
            </ChatInfo>
            <BiDotsVerticalRounded
                size="23px" style={{ paddingRight: "20px" }}
            />
        </Navbar>
    );
};

export default ChatHeaderTap;

const Navbar = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
`
const ChatInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const NavbarTitle = styled.div``
const HeadStudent = styled.p`
    font-size: 12px;
    color:gray;
`