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
import Homeimg from '../../assets/Home.png';
import Searchimg from '../../assets/Search.png';
import ChatColorimg from '../../assets/ChatColor.png';
import Myimg from '../../assets/My.png';
import { __getReset } from '../../redux/modules/MyPageSlice';
import ChatDeleteModal from './ChatDeleteModal';
import { BiDotsVerticalRounded } from "react-icons/bi";
import profileorange from "../../assets/profileorange.png"
import { IoMdClose } from 'react-icons/io';
import nonedataballoon from "../../assets/nonedataballoon.png"

const ChatList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { setCurrentHeader } = useStore();

    useEffect(() => {
        dispatch(__getReset())
    }, [])

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
    console.log(chatList);

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
                {/* 아직 채팅방 없을 때 아이콘 추가 */}
                {chatList.length === 0 && 
                    <NoneData>
                        <NoneDataImg />
                        <p>참여 중인 채팅이 없습니다</p>
                    </NoneData>}
                <StChatWrap ref={InfinityScrollRef} onScroll={InfinityScroll}>
                    {chatList.length > 0 &&
                        chatList.map((chat, i) => {
                            return (
                                <StChatRoomContainer
                                    roomName={chat.roomName}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/chat/${chat.chatRoomUuid}`)
                                    }}
                                >
                                    <StChatWidthWrap>
                                        <StImg>
                                            <StHeadImg
                                                src={chat.otherUserImage}
                                            />
                                        </StImg>
                                        <StSecondChatWithWrap>
                                            <StFirstContainer>
                                                <StFirstWrap>
                                                    <StUserName>{chat.roomName}</StUserName>
                                                    <StAdmission>{chat.departmentName} · {chat.admission}</StAdmission>
                                                </StFirstWrap>
                                                <StSecondWrap>
                                                    <StTimeCheck>{chat.dayBefore}</StTimeCheck>
                                                </StSecondWrap>
                                            </StFirstContainer>
                                            <StSecondContainer>
                                                <StChatContent>{chat.lastMessage.substr(0, 25)}</StChatContent>
                                            </StSecondContainer>
                                        </StSecondChatWithWrap>
                                    </StChatWidthWrap>
                                    <IoMdClose
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpenPopup(true);
                                            setClickChatId(chat.chatRoomUuid);
                                        }}
                                        chatRoomUuid={chat.chatRoomUuid}
                                        style={{ cursor: "pointer", color: "#bebebe" }}
                                        size="20"
                                    />
                                    {isOpenPopup && (
                                        <ChatDeleteModal
                                            close={() => setIsOpenPopup(false)}
                                            event={() => {
                                                deleteChat();
                                            }}
                                        />
                                    )}
                                </StChatRoomContainer>
                            )
                        })
                    }
                </StChatWrap>
            </StChatContainer>
            <BottomTapWrap>
                <Bottom>
                    <Tap
                        onClick={() => {
                            navigate('/main');
                        }}
                        style={{ paddingLeft: '20px' }}
                    >
                        <img
                            src={Homeimg}
                            alt='홈'
                            style={{ width: '45%', margin: '2px' }}
                        />
                        <TapTitle style={{ color: '#8E8E8E' }}>홈</TapTitle>
                    </Tap>
                    <Tap
                        onClick={() => {
                            navigate('/search');
                        }}
                    >
                        <img
                            src={Searchimg}
                            alt='검색'
                            style={{ width: '45%', margin: '2px' }}
                        />
                        <TapTitle style={{ color: '#8E8E8E' }}>검색</TapTitle>
                    </Tap>
                    <Tap
                        onClick={() => {
                            navigate('/chat');
                        }}
                        style={{ color: '#f7931e' }}
                    >
                        <img
                            src={ChatColorimg}
                            alt='채팅'
                            style={{ width: '45%', margin: '2px' }}
                        />
                        <TapTitle style={{ fontWeight: 'bold' }}>채팅</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: '20px' }}
                        onClick={() => {
                            navigate('/mypage');
                        }}
                    >
                        <img
                            src={Myimg}
                            alt='마이페이지'
                            style={{ width: '45%', margin: '2px' }}
                        />
                        <TapTitle style={{ color: '#8E8E8E' }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </BottomTapWrap>
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

const StImg = styled.div``

const StHeadImg = styled.img`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-size: 100% 100%; */
  border-radius: 50%;
  /* margin-right: 7px; */
  /* border: 1px solid red; */
`;

const StChatWrap = styled.div`
    width: 100%;
  /* height: 80px; */
  /* border: 1px solid blue; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  margin-top: 10px;
`

const NoneData = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  font-weight: 500;
  font-size: 16px;
  /* border: 1px solid red; */
`;

const NoneDataImg = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${nonedataballoon});
  background-position: center;
  background-size: 100% 100%;
  margin-bottom: 10px;
`;
const StChatRoomContainer = styled.div`
  cursor: pointer;
  display: flex;
  /* width: 90%; */
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgba(245,245,245,1);
  align-items: center;
  justify-content: center;
`

const StChatWidthWrap = styled.div`
    width: 90%;
    /* border: 1px solid orangered; */
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    margin-bottom: 10px;
`

const StSecondChatWithWrap = styled.div`
    width: 100%;
    display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  flex-direction: column;
  /* border: 1px solid green; */
`
const StFirstContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  /* border: 1px solid blue; */
`;

const StFirstWrap = styled.div`
  display: flex;
  align-items: center;
  /* align-items: flex-end; */
  gap: 5px;
  /* border: 1px solid green; */
  /* width: 100%; */
`;

const StUserName = styled.div`
  font-weight: 600;
  font-size: 18px;
  /* width: 100%; */
`;
const StAdmission = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #bebebe;
  /* width: 100%; */
`;

const StSecondWrap = styled.div`
  display: flex;
  /* width: 100%; */
`;
const StTimeCheck = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #bebebe;
`;

const StSecondContainer = styled.div`
    width: 100%;
  padding: 0 10px;
  /* border: 1px solid red; */
  /* height: 60px; */
  display: flex;
`;
const StChatContent = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const BottomTapWrap = styled.div`
  width: 100%;
  position: sticky;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`;
const Bottom = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

const Tap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const TapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
`;
