import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpCircle } from "react-icons/bs";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { onSend, text, setText } = props;
    const ws = useRef();

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    const onChangeChatHandler = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onClick = (e) => {
        onSend();
    };

    return (
        <React.Fragment>
            <MessageBox>
                <AiOutlinePlus
                    style={{ paddingLeft: "20px", color: "#969696" }} size="37"
                />
                <StChatInput
                    placeholder="메세지를 입력해주세요"
                    type="text"
                    onChange={onChangeChatHandler}
                    onKeyPress={onKeyPressHandler}
                    value={text}
                />
                <BsArrowUpCircle
                    onClick={onClick}
                    style={{ paddingRight: "20px", color: "#969696" }} size="37"
                />
            </MessageBox>
        </React.Fragment>
    );
}

export default React.memo(ChatInput);

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

const StChatInput = styled.input`
    width: 75%;
    height: 30px;
    font-size: 16px;
    border: none;
    outline: none;
`