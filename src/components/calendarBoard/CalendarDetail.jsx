import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JustLayout from '../JustLayout';
import Layout from '../Layout';
import Header from '../Header';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import Img from '../../assets/naverIcon.png';
import CalendarDetailComment from './CalendarDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  __getCalendar,
  __deleteCalendar,
  __getDetailCalendar,
  __postCalendarComment,
  __postCalendarHeart,
} from '../../redux/modules/CalendarSlice';
import { useRef } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import CalendarDeleteModal from './CalendarDeleteModal';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';
import heartColorImg from '../../assets/heartColor.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';

const CalendarDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showChaet, setShowChaet] = useState(false);
  const [comment, setComment] = useState('');
  const modalRef = useRef(null);

  const { calendars } = useSelector((state) => state.calendars);
  const calendarfind = calendars.find(
    (calendar) => calendar.articleId === Number(id)
  );
  const data = useSelector((state) => state.mypages.mypages)
  
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

   // 1:1 채팅버튼
  const onCilckChaetShow = () => {
    setShowChaet(!showChaet);
  };

  // // 삭제
  // const onClickDelete = () => {
  //   const result = window.confirm("정말 삭제하시겠습니까?")
  //   if (result) {
  //     dispatch(__deleteCalendar(id))
  //     navigate("/calendar")
  //   } else {
  //     return null
  //   }
  // }

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
    await dispatch(__getCalendar());
    setComment('');
  };


  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  // 좋아요
const heartClick = async () => {
    const newHeart = {
      articleId: id,
    };
    const response = await dispatch(__postCalendarHeart(newHeart));
    // console.log(response.payload);
    dispatch(__getCalendar());
  };

  return (
    <Container ref={node}>
      {modalOpen && <CalendarDeleteModal setModalOpen={setModalOpen} />}
      <Header />
      <FirstWrap>
        <DetailHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => {
              navigate('/calendar');
            }}
          />
          <HeaderTitle>만남일정</HeaderTitle>
          <div style={{ width: '25px', height: '25px' }}></div>
        </DetailHeader>
      </FirstWrap>
      <CalendarContainer>
        <CalendarWrap>
          <DetailWrap>
            <DetailBody>
              <Bodytop>
                <Bodyimg src={calendarfind && calendarfind.userImage} alt='' />
                <Bodytxt>
                  <Txtname onClick={onCilckChaetShow}>
                    {calendarfind && calendarfind.username}
                  </Txtname>
                  <Txtstudent>
                    {calendarfind && calendarfind.departmentName}{' '}
                    <span> {calendarfind && calendarfind.admission} </span>
                  </Txtstudent>
                  {showChaet ? <ChaetingBox>1:1채팅</ChaetingBox> : null}
                </Bodytxt>
                {calendarfind&&calendarfind.username === data.username ? 
                <BiDotsVerticalRounded
                  size='20px'
                  style={{
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    color: '#bebebe',
                  }}
                  onClick={onCilckShow}
                /> : null}

                {show ? (
                  <Revisebox ref={node}>
                    <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                    <DeleteButton onClick={showModal}>삭제</DeleteButton>
                  </Revisebox>
                ) : null}
              </Bodytop>
              <BodyContent>
                <ContentBody>
                  <ContentTitle>
                    {calendarfind && calendarfind.title}
                  </ContentTitle>
                  <Contentget>
                    <ContentgetTitle>날짜 </ContentgetTitle>
                    <ContentgetContent>
                    {calendarfind && calendarfind.calendarDate}
                    </ContentgetContent>
                  </Contentget>
                  <Contentget>
                    <ContentgetTitle>시간 </ContentgetTitle>
                    <ContentgetContent>
                    {calendarfind && calendarfind.calendarTime}
                    </ContentgetContent>
                  </Contentget>
                  <Contentget>
                    <ContentgetTitle>장소 </ContentgetTitle>
                    <ContentgetContent>
                    {calendarfind && calendarfind.calendarLocation}
                    </ContentgetContent>
                  </Contentget>
                  <Contentget>
                    <ContentgetTitle>내용 </ContentgetTitle>
                    <ContentgetContent>
                    {calendarfind && calendarfind.content}
                    </ContentgetContent>
                  </Contentget>
                </ContentBody>
                {/* <ContentImg src=''></ContentImg> */}
                <BodyTxtBox>
                  <ContentView>
                    {calendarfind && calendarfind.createdAt} | 조회수{' '}
                    {calendarfind && calendarfind.views}
                  </ContentView>
                  <Count>
                    <CommentCount>
                      <CommentImg>
                        <img src={commentImg} alt='댓글이미지' />
                      </CommentImg>
                      댓글 {calendarfind && calendarfind.commentCnt}
                    </CommentCount>
                    <HeartCount onClick={heartClick}>
                      {calendarfind &&calendarfind.heart === true ? (
                        <HeartImg>
                          <img src={heartColorImg} alt='좋아요이미지' />
                        </HeartImg>
                      ) : (
                        <HeartImg>
                          <img src={heartImg} alt='좋아요이미지' />
                        </HeartImg>
                      )}
                      좋아요 {calendarfind && calendarfind.heartCnt}
                    </HeartCount>
                  </Count>
                </BodyTxtBox>
              </BodyContent>

              <BodyContainer>
                <BodyCommentBox>
                  {calendarfind && calendarfind.commentList.length === 0 ? (
                    <BodyComment>
                      작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요{' '}
                    </BodyComment>
                  ) : (
                    <>
                      {calendarfind &&
                        calendarfind.commentList.map((comment) => (
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
                </BodyCommentBox>
              </BodyContainer>
            </DetailBody>
          </DetailWrap>
        </CalendarWrap>
        <CommentContainer onSubmit={onClickPostComment}>
          <CommentBox>
            <CommentDiv>
              <CommentPost
                placeholder='댓글을 입력해주세요'
                value={comment}
                onChange={onChangePostHandler}
              ></CommentPost>
              <CommentButton type='submit'>올리기</CommentButton>
            </CommentDiv>
          </CommentBox>
        </CommentContainer>
      </CalendarContainer>
    </Container>
  );
};

export default CalendarDetail;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const FirstWrap = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  /* border:1px solid blue; */
  width: 90%;
  height: 60px;
  margin: auto;
`;
const DetailHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
`;
const CalendarContainer = styled.div`
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

const CalendarWrap = styled.div`
  width: 90%;
  height: 100%;
  /* border: 1px solid blue; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const DetailWrap = styled.form`
  width: 100%;
  /* height:100%; */
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;
const Revisebox = styled.div`
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
const ReviseButton = styled.button`
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

const DeleteButton = styled.button`
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

const DetailBody = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const Bodytop = styled.div`
  display: flex;
  align-items: center;
  /* padding:20px 20px 10px 20px; */
  position: relative;
  margin: 10px 0;
`;

const Bodyimg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Bodytxt = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  position: relative;
`;

const Txtname = styled.h3`
  cursor: pointer;
  /* margin: 0px; */
`;
const Txtstudent = styled.p`
  /* margin: 0px; */
  font-size: 12px;
  color: #bebebe;
`;
const ChaetingBox = styled.div`
  border: 1px solid #f1f0f0;
  border-radius: 16px;
  position: absolute;
  text-align: center;
  line-height: 30px;
  top: 25px;
  z-index: 1;
  width: 60px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const BodyContent = styled.div`
  /* padding: 0px 20px; */
  width: 100%;
  /* height: 370px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const ContentTitle = styled.h3`
  /* margin:10px 0px; */
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  /* height: 100%; */
  /* border: 1px solid green; */
`;
const ContentBody = styled.div`
  /* border: 1px solid blue; */
  color: #000;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 100%;
`;
const Contentget = styled.div`
  color: #000;
  /* height: 30px; */
  display: flex;
  align-items: center;
`;

const ContentgetTitle = styled.span`
  color: #f7931e;
  font-weight: 600;
  width:10%;
`;

const ContentgetContent = styled.div`
  width:80%;
`

const ContentImgBox = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 20px;
  position: relative;
`;
const ContentImg = styled.img`
  /* border:1px solid gray; */
  width: 100%;
  height: 250px;
  display: flex;
  border-radius: 20px;
  /* margin : 20px 0px; */
  /* background-repeat: no-repeat;
    background-size: cover; */
`;
const PrevButton = styled.button`
  font-size: 20px;
  display: flex;
  position: absolute;
  border: none;
  border-radius: 20px;
  top: 50%;
  left: 0;
  z-index: 2;
  transform: translatey(-50%);
`;
const NextButton = styled.button`
  font-size: 20px;
  display: flex;
  position: absolute;
  border: none;
  border-radius: 20px;
  top: 50%;
  right: 0;
  z-index: 2;
  transform: translatey(-50%);
`;

const PreviousBtn = styled(GrFormPrevious)``;
const NextBtn = styled(GrFormNext)``;

const ContentView = styled.p`
  font-size: 12px;
  line-height: 40px;
  height: 40px;
  /* margin:30px 0px 10px; */
  color: #bebebe;
  /* border: 1px solid blue; */
`;
const BodyTxtBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const ContentTime = styled.div`
  color: gray;
  font-size: 14px;
  margin-left: auto;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid green; */
  /* overflow-y: scroll; */
`;
const BodyCommentBox = styled.div`
  /* border-top : 1px solid rgba(0,0,0,0.1); */
  /* margin:20px; */
  /* overflow-y: scroll; */
  height: 100%;
  width: 100%;
  /* position:relative; */
  /* height: 70%; */
  /* border: 1px solid orangered; */
`;

const CommentContainer = styled.form`
  position: sticky;
  /* bottom: 0;
    bottom: 10px; */
  width: 100%;
  /* height: 100%; */
  /* border: 1px solid blue; */
  /* max-width:500px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 60px; */
  width: 95%;
  /* border: 1px solid red; */
`;

const CommentDiv = styled.div`
  /* width : 370px; */
  width: 100%;
  /* height: 50px; */
  padding: 10px;
  background-color: #eeeeee;
  border-radius: 16px;
  display: flex;
  align-items: center;
  /* margin-bottom: 20px; */
  justify-content: space-between;
`;

const CommentPost = styled.input`
  width: 80%;
  /* width: 100%; */
  /* bottom : 0; */
  background-color: #eeeeee;
  height: 30px;
  border-radius: 10px;
  border: none;
  outline: none;
`;
const CommentButton = styled.button`
  border: none;
  cursor: pointer;
  color: black;
  font-weight: 600;
`;
const BodyComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #b3b3b3;
  height: 100px;
  width: 100%;
  text-align: center;
`;

const Count = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  align-items: center;
`;

const CommentCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  display: flex;
  margin-right: 15px;
`;

const CommentImg = styled.div`
  margin-right: 5px;
`;

const HeartCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  display: flex;
  cursor: pointer;
`;

const HeartImg = styled.div`
  margin-right: 5px;
`;
