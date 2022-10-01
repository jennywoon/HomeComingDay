import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import { IoIosArrowBack } from 'react-icons/io';
import CalendarDetailComment from './CalendarDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  __getCalendar,
  __getDetailCalendar,
  __postCalendarComment,
  __postCalendarHeart,
  __postJoin,
  __getJoin,
} from '../../redux/modules/CalendarSlice';
import { useRef } from 'react';
import { GiPunchBlast } from 'react-icons/gi';
import CalendarDeleteModal from './CalendarDeleteModal';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';
import heartColorImg from '../../assets/heartColor.png';
import joinUser from '../../assets/users.png';
import joinUserPlus from '../../assets/userPlus.png';
import joinUserMinus from '../../assets/userMinus.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
import CalendarJoiinModal from './CalendarJoiinModal';
import { chatApi } from '../chatBoard/ChatApi';
import { __getNoticeCount } from '../../redux/modules/NoticeSlice';
import dots from "../../assets/dots.png"


const CalendarDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showChaet, setShowChaet] = useState(false);
  const [comment, setComment] = useState('');
  const modalRef = useRef(null);

  const { calendars } = useSelector((state) => state.calendars);
  const { calendarfind } = useSelector((state) => state.calendars);
  // const calendarfind = calendars.find(
  //   (calendar) => calendar.articleId === Number(id)
  // );
  // console.log("calendarfind",calendarfind)
  // const { calendarJoin } = useSelector((state) => state.calendars);
  const { joinPeopleList } = useSelector((state) => state.calendars.calendarJoin);
  const joinPeopleLists = useSelector((state) => state.calendars.joinPeopleList);
  const data = useSelector((state) => state.mypages.mypages)


  const trueList = joinPeopleList && joinPeopleList.map((list) => { if (list.email === data.email) return list.joinCheck })
  const joinTrueFalse = trueList && trueList.includes(true)
  const joinPeopleListfind = joinPeopleLists && joinPeopleLists.map((list) => list.joinCheck)
  const joinBooline = joinPeopleListfind[joinPeopleListfind.length - 1]
  // console.log("joinPeopleLists", joinPeopleLists)
  // console.log("calendars", calendars)
  // console.log("calendarJoin", calendarJoin)
  // console.log("joinPeopleList", joinPeopleList)
  // console.log("joinPeopleLists", joinPeopleLists)

  //모달닫기
  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (show && node.current && !node.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [show]);

  // 조회수 반영
  useEffect(() => {
    dispatch(__getMyPage())
    dispatch(__getCalendar());
    dispatch(__getJoin(id));
    dispatch(__getDetailCalendar(id));
  }, [dispatch]);

  // 수정 삭제 모달
  const onCilckShow = () => {
    setShow(!show);
  };

  // 댓글
  const onChangePostHandler = (e) => {
    setComment(e.target.value);
  };

  // 댓글 올리기 버튼 활성화 
  const [isActive, setIsActive] = useState(false);
  const handleCheck = (e) => {
    setIsActive(e);
  };

  useEffect(() => {
    if (comment !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [comment])

  // 1:1 채팅버튼
  const onCilckChaetShow = () => {
    setShowChaet(!showChaet);
  };

  // 수정
  const onClickRevice = () => {
    navigate(`/calendarupdate/${id}`);
  };

  const onClickPostComment = async (e) => {
    e.preventDefault();
    const newcomment = {
      content: comment,
      articleId: id,
    };
    await dispatch(__postCalendarComment(newcomment));
    setComment('');
    await dispatch(__getDetailCalendar(id));
    await dispatch(__getNoticeCount());
  };

  const onClickJoin = async (e) => {
    e.preventDefault();
    const newJoin = {
      articleId: id,
      email: data.email
    };
    await dispatch(__postJoin(newJoin))
    await dispatch(__getJoin(id));
  }

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const showJoinModal = (e) => {
    e.preventDefault();
    setJoinModalOpen(true);
  };

  // 좋아요
  const heartClick = async () => {
    const newHeart = {
      articleId: id,
    };
    const response = await dispatch(__postCalendarHeart(newHeart));
    // console.log(response.payload);
    dispatch(__getDetailCalendar(id));
  };

  // 채팅 생성
  const createChat = (userId) => {
    chatApi
      .createChat(userId)
      .then((response) => {
        navigate(`/chat/${response.data}`);
        // console.log("userId", userId)
        // console.log("response", response.data)
      })
      .catch((error) => {
        // console.log(error);
      })
  }
  return (
    <StContainer ref={node}>
      {modalOpen && <CalendarDeleteModal setModalOpen={setModalOpen} />}
      {joinModalOpen && <CalendarJoiinModal setJoinModalOpen={setJoinModalOpen} joinPeopleList={joinPeopleList} id={id} />}
      <div>
      <Header />
      </div>
      <StFirstWrap>
        <StDetailHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => {
              navigate('/calendar');
            }}
          />
          <StHeaderTitle>만남일정</StHeaderTitle>
          <StHeaderDiv/>
        </StDetailHeader>
      </StFirstWrap>
      <StCalendarContainer>
        <StCalendarWrap>
          <StDetailWrap>
            <StDetailBody>
              <StBodytop>
                <StBodyimg src={calendarfind && calendarfind.userImage} alt='' />
                <StBodytxt>
                  <StTxtname onClick={onCilckChaetShow}>
                    {calendarfind && calendarfind.username}
                  </StTxtname>
                  <StTxtstudent>
                    {calendarfind && calendarfind.departmentName}{' '}
                    <span> {calendarfind && calendarfind.admission} </span>
                  </StTxtstudent>
                  {showChaet ?
                    <StChatWrap onClick={() => createChat(calendarfind.userId)}>
                      {calendarfind && calendarfind.username !== data.username ?
                        <StChatingBox>
                          1:1채팅
                        </StChatingBox> : null}
                    </StChatWrap> : null}
                </StBodytxt>
                {calendarfind && calendarfind.username === data.username ?
                  <StDots
                    onClick={onCilckShow}
                  /> : null}

                {show ? (
                  <StRevisebox ref={node}>
                    <StReviseButton onClick={onClickRevice}>수정</StReviseButton>
                    <StDeleteButton onClick={showModal}>삭제</StDeleteButton>
                  </StRevisebox>
                ) : null}
              </StBodytop>
              <StBodyContent>
                <StContentBody>
                  <StContentTitle>
                    {calendarfind && calendarfind.title}
                  </StContentTitle>
                  <StContentget>
                    <StContentgetTitle>날짜 </StContentgetTitle>
                    <StContentgetContent>
                      {calendarfind && calendarfind.calendarDate}
                    </StContentgetContent>
                  </StContentget>
                  <StContentget>
                    <StContentgetTitle>시간 </StContentgetTitle>
                    <StContentgetContent>
                      {calendarfind && calendarfind.calendarTime}
                    </StContentgetContent>
                  </StContentget>
                  <StContentget>
                    <StContentgetTitle>초대 </StContentgetTitle>
                    <StContentgetContent>
                      {calendarfind && calendarfind.maxPeople} 명
                    </StContentgetContent>
                  </StContentget>
                  <StContentget>
                    <StContentgetTitle>장소 </StContentgetTitle>
                    <StContentgetContent>
                      {calendarfind && calendarfind.calendarLocation}
                    </StContentgetContent>
                  </StContentget>
                  <StContentget>
                    <StContentgetTitle>내용 </StContentgetTitle>
                    <StContentgetContent>
                      {calendarfind && calendarfind.content}
                    </StContentgetContent>
                  </StContentget>
                </StContentBody>
                {/* <ContentImg src=''></ContentImg> */}

                <StJoinContain>
                  <StJoinPart className="look" type="button" onClick={showJoinModal}>
                    <img src={joinUser} alt="참여자조회" />
                    참여자보기
                  </StJoinPart>

                  {(joinPeopleList && joinPeopleList.length) === (calendarfind && calendarfind.maxPeople) && joinTrueFalse === false ?
                    <StJoinPart className="last" type="button">
                      <GiPunchBlast size="20px" />
                      참여마감
                    </StJoinPart>
                    :
                    (calendarfind && calendarfind.username) !== data.username ? (
                      ((joinBooline && joinBooline === false) || (joinTrueFalse === false) ?
                        <StJoinPart type="button" onClick={onClickJoin}>
                          <img src={joinUserPlus} alt="참여하기" />
                          참여하기
                        </StJoinPart>
                        :
                        <StJoinPart className="cancel" type="button" onClick={onClickJoin}>
                          <img src={joinUserMinus} alt="참여불가" />
                          참여취소
                        </StJoinPart>
                      ))
                      : null
                  }

                  {/* : null}  */}

                </StJoinContain>

                <StBodyTxtBox>
                  <StContentView>
                    {calendarfind && calendarfind.createdAt} | 조회수{' '}
                    {calendarfind && calendarfind.views}
                  </StContentView>
                  <StCount>
                    <StCommentCount>
                      <StCommentImg>
                        <img src={commentImg} alt='댓글이미지' />
                      </StCommentImg>
                      댓글 {calendarfind && calendarfind.commentCnt}
                    </StCommentCount>
                    <StHeartCount onClick={heartClick}>
                      {calendarfind && calendarfind.heart === true ? (
                        <StHeartImg>
                          <img src={heartColorImg} alt='좋아요이미지' />
                        </StHeartImg>
                      ) : (
                        <StHeartImg>
                          <img src={heartImg} alt='좋아요이미지' />
                        </StHeartImg>
                      )}
                      좋아요 {calendarfind && calendarfind.heartCnt}
                    </StHeartCount>
                  </StCount>
                </StBodyTxtBox>
              </StBodyContent>

              <StBodyContainer>
                <StBodyCommentBox>
                  {calendarfind && calendarfind.commentList?.length === 0 ? (
                    <StBodyComment>
                      작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요{' '}
                    </StBodyComment>
                  ) : (
                    <>
                      {calendarfind &&
                        calendarfind.commentList?.map((comment) => (
                          <CalendarDetailComment
                            key={comment.commentId}
                            comment={comment}
                            calendarfind={calendarfind}
                            modalRef={modalRef}
                            data={data}
                          />
                        ))}
                    </>
                  )}
                </StBodyCommentBox>
              </StBodyContainer>
            </StDetailBody>
          </StDetailWrap>
        </StCalendarWrap>
        <StCommentContainer onSubmit={onClickPostComment}>
          <StCommentBox>
            <StCommentDiv>
              <StCommentPost
                placeholder='댓글을 입력해주세요'
                value={comment}
                onChange={onChangePostHandler}
                maxLength='50'
              ></StCommentPost>
              <StCommentButton type='submit' disabled={isActive ? false : true}>올리기</StCommentButton>
            </StCommentDiv>
          </StCommentBox>
        </StCommentContainer>
      </StCalendarContainer>
    </StContainer>
  );
};

export default CalendarDetail;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;
const StFirstWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 60px;
  margin: auto;
`;
const StDetailHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
`;
const StCalendarContainer = styled.div`
  width: 90%;
  height: 86%;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  padding: 5px;
  align-items: center;
  margin: auto;
`;

const StCalendarWrap = styled.div`
  width: 90%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const StDetailWrap = styled.form`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const StHeaderTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const StHeaderDiv = styled.div`
  width: 25px;
  height: 25px;
`
const StRevisebox = styled.div`
  border: 1px solid #f1f0f0;
  z-index: 5;
  border-radius: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 40px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  width:58px;
`;
const StReviseButton = styled.button`
  border: none;
  border-bottom: 1px solid #f1f0f0;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
    font-weight: 600;
  }
`;

const StDeleteButton = styled.button`
  border: none;
  background-color: #eee;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
    font-weight: 600;
  }
`;

const StDetailBody = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const StBodytop = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0;
`;

const StBodyimg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StBodytxt = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  position: relative;
`;

const StDots = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${dots});
  background-size: 100% 100%;
  background-position: center;
  margin-left: auto;
  cursor: pointer;
`
const StTxtname = styled.h3`
  cursor: pointer;
  font-weight: 600;
font-size: 16px;
`;
const StTxtstudent = styled.p`
  font-size: 12px;
  color: #bebebe;
`;

const StChatWrap = styled.div``
const StChatingBox = styled.div`
  border: 1px solid #f1f0f0;
  border-radius: 16px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 30px;
  top: 25px;
  z-index: 1;
  width: 70px;
  height: 40px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const StBodyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;
const StContentTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  word-break: break-word;
`;
const StContentBody = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 100%;
`;
const StContentget = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  margin: 8px 0;
  font-size: 14px;
`;

const StContentgetTitle = styled.span`
  color: #f7931e;
  font-weight: 600;
  width:15%;
`;

const StContentgetContent = styled.div`
  width:100%;
  word-break: break-word;
`
const StContentView = styled.p`
  font-size: 12px;
  line-height: 40px;
  /* height: 40px; */
  color: #bebebe;
`;
const StBodyTxtBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StBodyContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const StBodyCommentBox = styled.div`
  height: 100%;
  width: 100%;
`;

const StCommentContainer = styled.form`
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StCommentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const StCommentDiv = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #eeeeee;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StCommentPost = styled.input`
  width: 77%;
  background-color: #eeeeee;
  height: 30px;
  border-radius: 10px;
  border: none;
  outline: none;
`;
const StCommentButton = styled.button`
  border: none;
  cursor: pointer;
  color: #f7931e;
  font-weight: 600;
  background-color: transparent;
`;
const StBodyComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #b3b3b3;
  height: 100px;
  width: 100%;
  text-align: center;
  font-size: 14px;
`;

const StCount = styled.div`
  display: flex;
  align-items: center;
`;

const StCommentCount = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: black;
  display: flex;
  margin-right: 10px;
`;

const StCommentImg = styled.div`
  margin-right: 3px;
`;

const StHeartCount = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: black;
  display: flex;
  cursor: pointer;
`;

const StHeartImg = styled.div`
  margin-right: 3px;
`;

//참여하기
const StJoinContain = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
`

const StJoinPart = styled.button`
  background: #F7931E;
  width: 136px;
  height: 32px;
  border: 1px solid #F7931E;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
font-size: 12px;
cursor:pointer;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
&.cancel {
    background: #9c9c9c;
    border: 1px solid #9c9c9c;
    color:#fff
  }
 &.look{
  background: #FFFFFF;
  color: #8E8E8E;
  border: 1px solid #8E8E8E;
 } 
 &.last{
  cursor:default;
  background: #FFFFFF;
  color: #8E8E8E;
  border: 1px solid #8E8E8E;
  display:flex;
  justify-content: center;
  align-items: center;
 }
`