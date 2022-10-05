import React from "react";
import ChatMessage from "./ChatMessage";
import styled from "styled-components";

const ChatMessageBox = ({ messages, scrollRef }) => {
    return (
        <StMessageWrapper>
            {messages.length > 0 &&
                messages.map((message, idx) => {
                    return (
                        <ChatMessage
                            key={idx}
                            message={message.message}
                            userId={message.userId}
                            createdAt={message.createdAt}
                        />
                    );
                })}
            <div ref={scrollRef} />
        </StMessageWrapper>
    );
};

// 성능 최적화. React.memo()를 사용, props 값이 변하지 않으면 리랜더링 되지 않음.
export default React.memo(ChatMessageBox);

const StMessageWrapper = styled.div`
    width: 100%;
    height: 81.3%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #f0f0f0;
    &::-webkit-scrollbar {
        width: 0px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 50px;
        width: 0px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 50px;
        width: 0px;
    }
    @media only screen and (max-width: 420px) {
        min-width: 280px;
        height: 70vh;
        top: 0;
        left: 0;
        margin-top: 12px;
    }
`;