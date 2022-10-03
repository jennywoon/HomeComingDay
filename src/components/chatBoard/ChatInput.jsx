import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpCircle } from "react-icons/bs";
import { useEffect } from "react";

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

    const onClick = () => {
        onSend();
    };

    const [isActive, setIsActive] = useState(false);
    const handleCheck = (e) => {
        setIsActive(e)
    }
    // 공백 입력 불가하도록 설정
    useEffect(() => {
        if(text.trim() !== ""){
            handleCheck(true);
        } else{
            handleCheck(false);
        }
    }, [text])

    return (
        <React.Fragment>
            <StMessageBox>
                {/* <AiOutlinePlus
                    style={{ paddingLeft: "20px", color: "#969696" }} size="22px"
                /> */}
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
                    style={{ color: "#969696", cursor:"pointer" }} size="22px"
                    disabled={isActive ? false : true}
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
    justify-content: center;
    align-items: center;
`

const StChatInput = styled.input`
    width: 85%;
    height: 30px;
    font-size: 16px;
    border: none;
    outline: none;
    ::-webkit-input-placeholder{
        font-size: 14px;
    }
`