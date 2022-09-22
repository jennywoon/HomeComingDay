import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { BiDotsVerticalRounded } from "react-icons/bi";

const ChatHeaderTap = () => {

    const navigate = useNavigate();

    return (
        <Navbar>
            <IoIosArrowBack
                size="37" cursor="pointer" style={{ paddingLeft: "20px" }}
                onClick={() => navigate("/chat")} />
            <ChatInfo>
                <NavbarTitle>이름</NavbarTitle>
                <InfoWrap>
                    <HeadDepartment>경영학과 · </HeadDepartment>
                    <HeadStudent> 14학번</HeadStudent>
                </InfoWrap>
            </ChatInfo>
            <BiDotsVerticalRounded
                size="37" style={{ paddingRight: "20px" }}
            />
        </Navbar>
    );
};

export default ChatHeaderTap;

const Navbar = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
`
const ChatInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 5px; */
`
const NavbarTitle = styled.div`
    font-size: 16px;
    /* height: 100%; */
    font-weight: 800;
    /* border: 1px solid blue; */
`
const InfoWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #bebebe;
    font-weight: 500;
`
const HeadDepartment = styled.div``
const HeadStudent = styled.p`
`