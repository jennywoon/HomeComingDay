import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteChatList, getChatList } from '../../redux/modules/ChatSlice';
import Loading from '../test/Loading';
import { chatApi } from './ChatApi';
import _ from 'lodash';
import Homeimg from '../../assets/Home.png';
import Searchimg from '../../assets/Search.png';
import ChatColorimg from '../../assets/ChatColor.png';
import Myimg from '../../assets/My.png';
import { __getReset } from '../../redux/modules/MyPageSlice';
import ChatDeleteModal from './ChatDeleteModal';
import nonedataballoon from '../../assets/nonedataballoon.png';
import xorange from '../../assets/xorange.png';
import Header from '../Header';

const ChatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { setCurrentHeader } = useStore();

  useEffect(() => {
    dispatch(__getReset());
  }, []);

  const isLoadings = useSelector((state) => state.user.isLoading);
  const mypages = useSelector((state) => state.mypages.mypages);

    useEffect(() => {
        if (isLoadings && mypages.username === "") {
            navigate("/login")
        }
    }, []);

    // const chatList = useSelector((state) => state.chat.chatList);
    // const isLoading = useSelector((state) => state.chat.isLoading);
    // const hasNext = useSelector((state) => state.chat.hasNext);
    // const page = useSelector((state) => state.chat.page);
    const { chatList, isLoading, hasNext, page } = useSelector((state) => state.chat);
    // console.log(chatList);

    const inicialRoom = {
        roomname: null,
        roomId: null,
        lastMessage: null,
        lastTime: null,
        chatList,
    }

  // 채팅방 나가기 모달창
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [clickedChatId, setClickChatId] = useState('');

  // 채팅 목록 편집 눌러야 x 버튼 뜨도록 설정 + 버튼 누르면 글자 변경
  const [closeModal, setCloseModal] = useState({
    visible: false,
  });
  const [isOnCheck, setIsOnCheck] = useState(false);

  const handlerCloseModal = (e) => {
    setIsOnCheck(true);
    setCloseModal(() => {
      if (!closeModal.visible) {
        return { visible: true };
      } else {
        setIsOnCheck(false);
        return { visible: false };
      }
    });
  };

  // 채팅방 나가기
  const deleteChat = () => {
    chatApi.deleteChat(clickedChatId).then((response) => {
      if (response.status === 200) {
        setIsOpenPopup(false);
        dispatch(deleteChatList(clickedChatId));
      } else {
        window.alert('에러처리');
      }
    });
  };

  // 무한스크롤
  const InfinityScrollRef = useRef();

  // 무한스크롤 함수
  // Grid onScroll 이벤트에 넣어두어 Grid 스크롤 발생시 실행
  const InfinityScroll = _.throttle((e) => {
    if (
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <=
        200 &&
      hasNext
    ) {
      dispatch(getChatList(page));
    }
  }, 300);

  // 채팅방 리스트 조회  api
  useEffect(() => {
    if (page === 1) {
      dispatch(getChatList(page));
    }
    // setCurrentHeader("채팅");
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <StContainer>
        <StChatContainer>
          {/* {chatList.chatRoomResponseDto.length === 0 && */}
          {chatList.length === 0 && (
            <StNoneData>
              <StNoneDataImg />
              <StNoneText>
                참여 중인 채팅이 없습니다
                <br />
                <br />
                모든 게시글 상세 페이지의 동문 이름을 클릭하면
                <br /> 1:1 채팅을 시작하실 수 있어요
              </StNoneText>
            </StNoneData>
          )}
          <StChatWrap ref={InfinityScrollRef} onScroll={InfinityScroll}>
            {chatList.length > 0 &&
              chatList.map((chat, i) => {
                return (
                  <StChatRoomContainer
                    roomName={chat.roomName}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/chat/${chat.chatRoomUuid}`);
                    }}
                  >
                    {closeModal.visible ? (
                      <StCloseIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpenPopup(true);
                          setClickChatId(chat.chatRoomUuid);
                        }}
                        chatRoomUuid={chat.chatRoomUuid}
                      />
                    ) : null}
                    {isOpenPopup && (
                      <ChatDeleteModal
                        close={() => setIsOpenPopup(false)}
                        event={() => {
                          deleteChat();
                        }}
                      />
                    )}
                    <StChatWidthWrap>
                      <StImg>
                        <StHeadImg src={chat.otherUserImage} />
                      </StImg>
                      <StSecondChatWithWrap>
                        <StFirstContainer>
                          <StFirstWrap>
                            <StUserName>{chat.roomName}</StUserName>
                            <StAdmission>
                              {chat.departmentName} · {chat.admission}
                            </StAdmission>
                          </StFirstWrap>
                          <StSecondWrap>
                            <StTimeCheck>{chat.dayBefore}</StTimeCheck>
                          </StSecondWrap>
                        </StFirstContainer>
                        <StSecondContainer>
                          <StChatContent>
                            {chat.lastMessage.substr(0, 20)}
                          </StChatContent>
                          <StUnreadCount>
                            {chat.unreadCount > 0 ? (
                              <StUnreadCountWrap>
                                {chat.unreadCount}
                              </StUnreadCountWrap>
                            ) : null}
                          </StUnreadCount>
                        </StSecondContainer>
                      </StSecondChatWithWrap>
                    </StChatWidthWrap>
                  </StChatRoomContainer>
                );
              })}
          </StChatWrap>
          <StListEdit isOnCheck={isOnCheck} onClick={handlerCloseModal}>
            {isOnCheck ? '확인' : '채팅 목록 편집'}
          </StListEdit>
        </StChatContainer>
        <StBottomTapWrap>
          <StBottom>
            <StFirstTap
              onClick={() => {
                navigate('/main');
              }}
            >
              <StBottomImg src={Homeimg} alt='홈' />
              <StTapTitle>홈</StTapTitle>
            </StFirstTap>
            <StTap
              onClick={() => {
                navigate('/search');
              }}
            >
              <StBottomImg src={Searchimg} alt='검색' />
              <StTapTitle>검색</StTapTitle>
            </StTap>
            <StChatTap
              onClick={() => {
                navigate('/chat');
              }}
            >
              <StIconWrap>
                <StBottomImg src={ChatColorimg} alt='채팅' />
                {chatList[0] && chatList[0].totalCnt > 0 ? (
                  <StNewDiv>
                    <StNewTitle>N</StNewTitle>
                  </StNewDiv>
                ) : null}
              </StIconWrap>
              <StTapChatTitle>채팅</StTapChatTitle>
            </StChatTap>
            <StLastTap
              onClick={() => {
                navigate('/mypage');
              }}
            >
              <StBottomImg src={Myimg} alt='마이페이지' />
              <StTapTitle>MY</StTapTitle>
            </StLastTap>
          </StBottom>
        </StBottomTapWrap>
      </StContainer>
    </>
  );
};

export default ChatList;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StChatContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StImg = styled.div`
  padding: 0 3px 0 5px;
`;

const StHeadImg = styled.img`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const StChatWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  margin-top: 10px;
`;

const StNoneData = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  font-weight: 500;
  font-size: 16px;
`;

const StNoneDataImg = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${nonedataballoon});
  background-position: center;
  background-size: 100% 100%;
  margin-bottom: 10px;
`;

const StNoneText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StChatRoomContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(245, 245, 245, 1);
  align-items: center;
  justify-content: center;
  padding: 5px 0;
`;

const StListEdit = styled.div`
  width: 90%;
  height: 32px;
  border-radius: 8px;
  color: ${({ isOnCheck }) => (isOnCheck ? '#03C75A' : '#f7931e')};
  border: 1px solid ${({ isOnCheck }) => (isOnCheck ? '#03C75A' : '#f7931e')};
  position: absolute;
  bottom: 10%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
`;

const StChatWidthWrap = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 5px;
`;

const StCloseIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${xorange});
  background-size: 100% 100%;
  background-position: center;
  cursor: pointer;
  color: #bebebe;
`;

const StSecondChatWithWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StFirstContainer = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

const StFirstWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StUserName = styled.div`
  font-weight: 600;
  font-size: 17px;
`;

const StAdmission = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #bebebe;
`;

const StSecondWrap = styled.div``;

const StTimeCheck = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #bebebe;
`;

const StSecondContainer = styled.div`
  width: 97%;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2px;
`;

const StUnreadCount = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StUnreadCountWrap = styled.div`
  background-color: #f7931e;
  padding: 4px 7px;
  border-radius: 8px;
  font-size: 11px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StChatContent = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const StBottomTapWrap = styled.div`
  width: 100%;
  position: sticky;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`;

const StBottom = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

const StFirstTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
`;

const StTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StChatTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid red; */
  cursor: pointer;
  color: #f7931e;
`;

const StLastTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;
`;

const StBottomImg = styled.img`
  width: 25px;
  height: 25px;
  margin: 2px;
`;

const StIconWrap = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StNewDiv = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1px;
  position: absolute;
`;

const StNewTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: white;
`;

const StTapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #696969;
`;

const StTapChatTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #f7931e;
`;
