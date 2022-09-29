import React, { useCallback } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpCircle } from "react-icons/bs";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { onSend, text, setText } = props;

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
            <StMessageBox>
                <AiOutlinePlus
                    style={{ paddingLeft: "20px", color: "#969696" }} size="22px"
                />
                <StChatInput
                    placeholder="채팅 메세지를 입력해주세요(1,000자 제한)"
                    type="text"
                    onChange={onChangeChatHandler}
                    onKeyPress={onKeyPressHandler}
                    value={text}
                    maxLength="1000"
                />
                <BsArrowUpCircle
                    onClick={onClick}
                    style={{ paddingRight: "20px", color: "#969696", cursor:"pointer" }} size="22px"
                />
            </StMessageBox>
        </React.Fragment>
    );
}

export default React.memo(ChatInput);

const StMessageBox = styled.div`
    width: 100%;
    height: 60px;
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