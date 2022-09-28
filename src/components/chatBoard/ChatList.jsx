import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { deleteChatList, deleteUnreadCount, getChatList } from '../../redux/modules/ChatSlice';
import Loading from '../test/Loading';
import { chatApi } from './ChatApi';
import _ from "lodash";

const ChatList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { setCurrentHeader } = useStore();

    const isLoadings = useSelector((state) => state.user.isLoading);
    const mypages = useSelector((state) => state.mypages.mypages);

    useEffect(() => {
        if (isLoadings && mypages.username === "") {
            navigate("/login")
        }
    }, []);

    const chatList = useSelector((state) => state.chat.chatList);
    const isLoading = useSelector((state) => state.chat.isLoading);
    const hasNext = useSelector((state) => state.chat.hasNext);
    const page = useSelector((state) => state.chat.page);

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    })

    const inicialRoom = {
        roomname: null,
        roomId: null,
        lastMessage: null,
        lastTime: null,
        chatList,
    }

    // 채팅방 나가기 모달창
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [clickedChatId, setClickChatId] = useState("");
    const PopupRef = useRef();

    // 채팅방 나가기
    const deleteChat = () => {
        chatApi.deleteChat(clickedChatId).then((response) => {
            if (response.status === 200) {
                setIsOpenPopup(false);
                dispatch(deleteChatList(clickedChatId));
            } else {
                window.alert("에러처리")
            }
        })
    }

    // 무한스크롤
    const InfinityScrollRef = useRef();

    // 무한스크롤 함수
    // Grid onScroll 이벤트에 넣어두어 Grid 스크롤 발생시 실행
    const InfinityScroll = _.throttle((e) => {
        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext) {
            dispatch(getChatList(page));
        }
    }, 300);

    // 카테고리바에 별 표시 삭제
    useEffect(() => {
        dispatch(deleteUnreadCount());
    }, [])

    // 채팅방 리스트 조회  api
    useEffect(() => {
        if (page === 1) {
            dispatch(getChatList(page));
        }
        // setCurrentHeader("채팅");
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <StContainer>
            <StChatContainer>
                <StChatCardContainer onClick={() => {
                    navigate('/chatform');
                }}
                    style={{ cursor: 'pointer' }}>
                    <StHeadImg />
                </StChatCardContainer>
                {/* 아직 채팅방 업을 때 아이콘 추가 */}
                <StChatWrap ref={InfinityScrollRef} onScroll={InfinityScroll}>
                    {chatList.length > 0 &&
                        chatList.map((chat, i) => {
                            return (
                                <>
                                    <StFirstContainer>
                                        <StFirstWrap>
                                            <StUserName>나청운</StUserName>
                                            <StAdmission>학번</StAdmission>
                                        </StFirstWrap>
                                        <StSecondWrap>
                                            <StTimeCheck>15분 전</StTimeCheck>
                                        </StSecondWrap>
                                    </StFirstContainer>
                                    <StSecondContainer>
                                        <StChatContent>마지막 채팅 메시지</StChatContent>
                                    </StSecondContainer>
                                </>
                            )
                        })
                    }
                </StChatWrap>
            </StChatContainer>
        </StContainer>
    );
};

export default ChatList;

const StContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`

const StChatContainer = styled.div`
      /* gap: 8px; */
  height: 100vh;
  /* overflow-y: scroll; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  /* border: 1px solid blue; */
`

const StChatCardContainer = styled.div`
    display: flex;
  /* border: 1px solid green; */
  width: 90%;
  height: 80px;
  justify-content: center;
  align-items: center;
`

const StHeadImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f6bd60;
  border-radius: 50%;
`;

const StChatWrap = styled.div`
      width: 90%;
  /* height: 80px; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
`

const StFirstContainer = styled.div`
  /* width: 80%; */
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const StFirstWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StUserName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;
const StAdmission = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #bebebe;
`;

const StSecondWrap = styled.div`
  display: flex;
`;
const StTimeCheck = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #bebebe;
`;

const StSecondContainer = styled.div`
  padding: 0 10px;
`;
const StChatContent = styled.div`
  font-weight: 400;
  font-size: 16px;
`;