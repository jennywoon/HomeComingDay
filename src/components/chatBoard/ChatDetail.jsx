import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { chatApi } from './ChatApi';
import { getCookie } from '../../shared/cookies';
import useStore from "../../zustand/store";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getChatMessage, subMessage } from '../../redux/modules/ChatSlice';
import ChatMessageBox from "./ChatMessageBox"
import ChatInput from './ChatInput';
import Header from "../Header"
import { IoIosArrowBack } from 'react-icons/io'
import { BiDotsVerticalRounded } from "react-icons/bi";

const ChatDetail = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const roomId = params.id;
    const { setCurrentHeader } = useStore();

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    })

    // 보내는 사람
    const isLoading = useSelector((state) => state.user.isLoading);
    // const isLoading = useSelector((state) => state.userSlice.isLoading);
    // const userInfo = useSelector((state) => state.userSlice.userInfo);
    const mypages = useSelector((state) => state.mypages.mypages);
    console.log(mypages);
    useEffect(() => {
        if (isLoading && mypages.username === "") {
            navigate("/login");
        }
    }, []);

    const token = getCookie("accessToken");
    const [text, setText] = useState("")
    const scrollRef = useRef();
    const ws = useRef();

    // 상대방 정보
    const [otherUserInfo, setOtherUserInfo] = useState([]);

    // messages
    // const messages = useSelector((state) => state.ChatSlice.messages);
    const messages = useSelector((state) => state.chat.messages);
    console.log(messages);

    // 상대방 정보 가져오기
    useEffect(() => {
        setCurrentHeader("채팅");
        chatApi
            .enterChatRoom(roomId)
            .then((response) => {
                setOtherUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            console.log(roomId);
    }, [])

    // 채팅방 이전 메시지 가져오기
    useEffect(() => {
        let sock = new SockJS(`${BASE_URL}/stomp/chat`);
        let client = Stomp.over(sock);
        ws.current = client;

        dispatch(getChatMessage(roomId));
        console.log(roomId);
    }, []);

    // 방 입장 시 스크롤 아래로 이동
    useEffect(() => {
        scrollRef.current.scrollIntoView({ block: "end" });
    }, []);

    // 메시지 state 변경 시 스크롤 아래로 이동
    useEffect(() => {
        scrollRef.current.scrollIntoView({ block: "end" });
    }, [messages]);

    // 소켓 연결, unmount 시 소켓 연결 해제
    useEffect(() => {
        wsConnect();
        return () => {
            wsDisConnect();
        }
    })

    function wsConnect() {
        try {
            ws.current.debug = function (str) { };
            ws.current.debug();
            // type: "CHAT"을 보내는 용도는 채팅방에 들어갈 때를 알기 위해서
            ws.current.connect({ token: token, type: "CHAT" }, () => {
                // connect 이후 subscribe
                ws.current.subscribe(`${BASE_URL}/sub/chat/room/${roomId}`, (response) => {
                    const newMessage = JSON.parse(response.body);
                    dispatch(subMessage(newMessage));
                });

                // 입장 시 enter 메시지 발신
                // 이 메시지를 기준으로 서버에서 unReadCount 판별
                const message = {
                    roomId: roomId,
                };
                ws.current.send(`${BASE_URL}/pub/chat/enter`, { token: token }, JSON.stringify(message));
            });
        } catch (error) {
            console.log(error);
        }
    }

    // 소켓 연결 해제
    function wsDisConnect() {
        try {
            ws.current.disconnect(() => {
                ws.current.unsubscribe("sub-0");
            });
        } catch (error) {
            console.log(error);
        }
    }

    // 메시지 발신
    const onSend = async () => {
        try {
            //send할 데이터
            const message = {
                roomId: roomId,
                message: text,
                otherUserId: otherUserInfo.otherUserId,
            };

            if (text === "") {
                return;
            }
            // send message
            ws.current.send("/pub/chat/message", { token: token }, JSON.stringify(message));
            setText("");
        } catch (error) {
            console.log(error);
        }
    };

    if (messages === null) {
        return;
    }

    return (
        <StContainer>
            <Header/>
            <Navbar>
            <IoIosArrowBack
                size="37" cursor="pointer" style={{ paddingLeft: "20px" }}
                onClick={() => navigate("/chat")} />
            <ChatInfo>
                <NavbarTitle>{otherUserInfo.otherUsername}</NavbarTitle>
                <InfoWrap>
                    <HeadDepartment>학과 · </HeadDepartment>
                    <HeadStudent> 학번</HeadStudent>
                </InfoWrap>
            </ChatInfo>
            <BiDotsVerticalRounded
                size="37" style={{ paddingRight: "20px" }}
            />
        </Navbar>
            <StChatContainer>
                <StChatWrap>
                    {/* <StChatDiv>
                        <StChatDate>날짜</StChatDate>
                    </StChatDiv> */}
                </StChatWrap>
            </StChatContainer>
            <ChatMessageBox messages={messages} scrollRef={scrollRef}/>
            <ChatInput
            mypages={mypages} 
            onSend={onSend} text={text} setText={setText}/>
        </StContainer>
    );
};

export default React.memo(ChatDetail);

const StContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const StChatContainer = styled.div`
    gap: 12px;
    /* height: 100%; */
    /* border: 1px solid blue; */
`

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

const StChatWrap = styled.div`
  width: 100%;
  height: 100%;
`

const StChatDiv = styled.div`
    width: 100%;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
`
const StChatDate = styled.div`
    margin-top: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #bebebe;
`