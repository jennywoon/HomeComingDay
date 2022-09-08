import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlinePlus } from "react-icons/ai";
import ChatHeaderTap from './ChatHeaderTap';
import { BsArrowUpCircle } from "react-icons/bs";

const ChatForm = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <ChatHeaderTap />
            <HelpContainer>
                <HelpWrap>
                    <ChatDiv>
                        <ChatDate>2022년 9월 1일</ChatDate>
                    </ChatDiv>
                </HelpWrap>
            </HelpContainer>
            <MessageBox>
                <AiOutlinePlus
                    style={{ paddingLeft: "20px", color: "#969696" }} size="37"
                />
                <ChatInput
                    placeholder="메세지를 입력해주세요"
                />
                <BsArrowUpCircle
                    style={{ paddingRight: "20px", color: "#969696" }} size="37"
                />
            </MessageBox>
        </HomeContainer>
    );
};

export default ChatForm;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const HelpContainer = styled.div`
  gap: 12px;
  height: 100%;
  /* border: 1px solid green; */
  /* overflow-y: scroll; */
`;

const HelpWrap = styled.div`
  /* padding: 0 10px; */
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  /* background-color: #D9D9D9; */
`;

const ChatDiv = styled.div`
    width: 100%;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
`

const ChatDate = styled.div`
    margin-top: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #bebebe;
`

const MessageBox = styled.div`
    width: 100%;
    height: 60px;
    /* border: 1px solid blue; */
    position: sticky;
    bottom: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ChatInput = styled.input`
    width: 75%;
    height: 30px;
    font-size: 16px;
    border: none;
    outline: none;
`