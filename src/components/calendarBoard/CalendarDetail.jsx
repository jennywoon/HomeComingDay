import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JustLayout from '../JustLayout';
import Layout from '../Layout';
import Header from '../Header';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import Img from '../../assets/naverIcon.png';
import CalendarDetailComment from './CalendarDetailComment'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getCalendar, __deleteCalendar, __getDetailCalendar, __postCalendarComment } from '../../redux/modules/CalendarSlice';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CalendarDeleteModal from './CalendarDeleteModal'

const CalendarDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showChaet, setShowChaet] = useState(false)
  const [comment, setComment] = useState("")
  const modalRef = useRef(null);

  const { calendars } = useSelector((state) => state.calendars);
  const calendarfind = calendars.find((calendar) => calendar.articleId === Number(id))

  useEffect(() => {
    dispatch(__getDetailCalendar(id));
  }, [dispatch])

  // 수정 삭제 모달
  const onCilckShow = () => {
    setShow(!show);
  };

  const onChangePostHandler = (e) => {
    setComment(e.target.value)
}
  
  const onCilckChaetShow = () => {
    setShowChaet(!showChaet)
  }


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
    navigate(`/calendarupdate/${id}`)
  }

  const onClickPostComment = async (e) => {
    e.preventDefault();
    const newcomment = {
      content: comment,
      articleId: id
    }
    await dispatch(__postCalendarComment(newcomment));
    await dispatch(__getCalendar());
    setComment("");
  }

  //swiper 옵션
  SwiperCore.use(Navigation);
  const [swiper, setSwiper] = useState(null)
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const swiperParams = {
    navigation: { prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current },
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      // swiper.activeIndex = setMainImageIndex;
      swiper.navigation.update();
    },
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex)
  }

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  }

  return (
    <Container>
      {modalOpen && <CalendarDeleteModal setModalOpen={setModalOpen} />}
      <Header />
      <CalendarContainer >
        <CalendarWrap>
          <DetailWrap>
            <FirstWrap>
              <DetailHeader>
                <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate("/calendar") }} />
                <HeaderTitle>만남일정</HeaderTitle>
                <div style={{ width: "25px", height: "25px" }}></div>
              </DetailHeader>
            </FirstWrap>
            <DetailBody>
              <Bodytop>
                <Bodyimg src={Img} alt="" />
                <Bodytxt>
                  <Txtname onClick={onCilckChaetShow}>{calendarfind && calendarfind.username}</Txtname>
                  <Txtstudent>{calendarfind && calendarfind.departmentName} <span> {calendarfind && calendarfind.admission} </span></Txtstudent>
                  {showChaet ?
                    <ChaetingBox>1:1채팅</ChaetingBox>
                    : null
                  }
                </Bodytxt>
                <BiDotsVerticalRounded
                  size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
                  onClick={onCilckShow} />
                {show ?
                  <Revisebox ref={modalRef}>
                    <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                    <DeleteButton onClick={showModal}>삭제</DeleteButton>
                  </Revisebox>
                  : null
                }
              </Bodytop>
              <BodyContent>
                <ContentBody>
                  <ContentTitle>{calendarfind && calendarfind.title}</ContentTitle>
                  <Contentget>
                    <ContentgetTitle>날짜 </ContentgetTitle>
                    {calendarfind && calendarfind.calendarDate}
                  </Contentget>
                  <Contentget>
                    <ContentgetTitle>시간 </ContentgetTitle>{calendarfind && calendarfind.calendarTime}
                  </Contentget>
                  <Contentget>
                    <ContentgetTitle>장소 </ContentgetTitle>{calendarfind && calendarfind.calendarLocation}
                  </Contentget>
                  <Contentget>
                    <ContentgetTitle>내용 </ContentgetTitle>{calendarfind && calendarfind.content}
                  </Contentget>
                </ContentBody>
                {/* <ContentImg src=''></ContentImg> */}
                <BodyTxtBox>
                  <ContentView>조회수 {calendarfind && calendarfind.views} | 댓글수 {calendarfind && calendarfind.commentCnt}</ContentView>
                  <ContentTime>{calendarfind && calendarfind.createdAt}</ContentTime>
                </BodyTxtBox>
              </BodyContent>



              <BodyContainer>

                <BodyCommentBox>
                  {calendarfind && calendarfind.commentList.length === 0 ?
                    <BodyComment>작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요 </BodyComment>
                    :
                    <>
                      {calendarfind && calendarfind.commentList.map((comment) => (
                        <CalendarDetailComment key={comment.commentId} comment={comment} calendarfind={calendarfind} modalRef={modalRef} />
                      ))}
                    </>
                  }
                </BodyCommentBox>
              </BodyContainer>
            </DetailBody>
          </DetailWrap>
        </CalendarWrap>
        <CommentContainer onSubmit={onClickPostComment}>
          <CommentBox>
            <CommentDiv>
              <CommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></CommentPost>
              <CommentButton type="submit" >올리기</CommentButton>
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
`
const CalendarContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
`

const CalendarWrap = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid blue; */
    overflow-y: scroll;
`
const DetailWrap = styled.form`
  width: 100%;
  /* height:100%; */
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const FirstWrap = styled.div`
    display: flex;
    flex-direction: column;
    /* border:1px solid blue; */
    width: 100%;
    height: 100%;
`
const DetailHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
`
const HeaderTitle = styled.div`
  font-weight: 800;
  /* margin:10px auto; */
`;
const Revisebox = styled.div`
    border: 1px solid #f1f0f0;
    z-index: 5;
    border-radius: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0;
    top:55px;
    background-color: #fff;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
`
const ReviseButton = styled.button`
    border:none;
    border-bottom: 1px solid #f1f0f0;
    padding:10px 15px;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`

const DeleteButton = styled.button`
    border:none;
    background-color: #eee;
    padding:10px 15px;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`

const DetailBody = styled.div`
    /* border: 1px solid #f1f0f0; */
    /* border: 1px solid red; */
    /* margin: 10px 20px; */
    border-radius: 20px;
    width: 100%;
    height:100%;
    /* box-sizing: border-box; */
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
    /* overflow-y: scroll; */
`

const Bodytop = styled.div`
    display:flex;
    align-items: center;
    padding:20px 20px 10px 20px;
    position: relative;
`

const Bodyimg = styled.img`
    width:40px;
`

const Bodytxt = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    position:relative;
`

const Txtname = styled.h3`
    cursor:pointer;
    /* margin: 0px; */
`
const Txtstudent = styled.p`
    /* margin: 0px; */
    font-size: 12px;
    color: gray;
`
const ChaetingBox = styled.div`
    border: 1px solid #f1f0f0;
    border-radius: 16px;
    position: absolute;
    text-align: center;
    line-height: 30px;
    top:25px;
    z-index: 1;
    width:60px;
    height:30px;
    background-color: #fff;
    cursor:pointer;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`

const BodyContent = styled.div`
    padding: 0px 20px;
    /* border: 1px solid red; */
    width: 100%;
    /* height: 350px; */
    display: flex;
     flex-direction: column;
    justify-content: space-between;
`
const ContentTitle = styled.h3`
    /* margin:10px 0px; */
    font-weight: 600;
    font-size: 18px;
    width:100%;
`
const ContentBody = styled.p`
/* border: 1px solid blue; */
    color:gray;
    font-size: 16px;
    font-weight: 400;
    width:100%;
    margin-bottom: 10px;
`
const Contentget = styled.p`
`

const ContentgetTitle = styled.span`
  color: gray;
  font-weight: bold;
`

const ContentImgBox = styled.div`
    width:100%;
    height:250px;
    border-radius: 20px;
    position:relative;
`
const ContentImg = styled.img`
    /* border:1px solid gray; */
    width: 100%;
    height:250px;
    display:flex;
    border-radius: 20px;
    /* margin : 20px 0px; */
    /* background-repeat: no-repeat;
    background-size: cover; */
`
const PrevButton = styled.button`
    font-size: 20px;
    display: flex;
    position:absolute;
    border:none;
    border-radius: 20px;
    top:50%;
    left:0;
    z-index: 2;
    transform: translatey(-50%);
    
`
const NextButton = styled.button`
    font-size: 20px;
    display: flex;
    position:absolute;
    border:none;
    border-radius: 20px;
    top:50%;
    right:0;
    z-index: 2;
    transform: translatey(-50%);
`

const PreviousBtn = styled(GrFormPrevious)`
    
`
const NextBtn = styled(GrFormNext)`
   
`


const ContentView = styled.p`
    
    font-size: 14px;
    line-height: 40px;
    height:40px;
    /* margin:30px 0px 10px; */
    color: gray;
    /* border: 1px solid blue; */
    
`
const BodyTxtBox = styled.div`
    display: flex;
    width:100%;
    align-items: center;
`
const ContentTime = styled.div`
      color: gray;
      font-size: 14px;
      margin-left: auto;
      
`

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    /* overflow-y: scroll; */
`
const BodyCommentBox = styled.div`
    border-top : 1px solid rgba(0,0,0,0.1);
    /* margin:20px; */
    /* overflow-y: scroll; */
    height: 100%;
    width: 100%;
    /* position:relative; */
    /* height: 70%; */
    /* border: 1px solid orangered; */
`

const CommentContainer = styled.form`
    position: sticky;
    bottom: 0;
    bottom: 10px;
    width: 100%;
    /* height: 100%; */
    /* border: 1px solid blue; */
    /* max-width:500px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CommentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 60px; */
    width: 95%;
    /* border: 1px solid red; */
`

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
`

const CommentPost = styled.input`
    width:80%;
    /* width: 100%; */
    /* bottom : 0; */
    background-color: #eeeeee;
    height: 30px;
    border-radius: 10px;
    border: none;
`
const CommentButton = styled.button`
    border: none;
    cursor: pointer;
`
const BodyComment = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color:#B3B3B3;
    height:100px;
    width:100%;
    text-align: center;
`

