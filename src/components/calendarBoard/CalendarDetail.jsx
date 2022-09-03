import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JustLayout from '../JustLayout';
import Layout from '../Layout';
import Header from '../Header';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import Img from '../../assets/naverIcon.png';
import CalendarDetailComment from '../calendarBoard/CalendatDetailComment'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {__getCalendar, __deleteCalendar} from '../../redux/modules/CalendarSlice';
import moment from 'moment';

const CalendarDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [show, setShow] = useState(false);
  
  const { calendars } = useSelector((state) => state.calendars);
  const calendarfind = calendars.find((calendar) => calendar.id === Number(id))

  const getArrItem = useSelector((state) => state.dates.dates)
  // const getLastArrItem =getArrItem.find((getArrItem) => getArrItem.id === Number(id))
  const getLastArrItem = getArrItem[getArrItem.length-1]
  
  useEffect(()=> {
    dispatch(__getCalendar());
  }, [dispatch])
  
  // 수정 삭제 모달
  const onCilckShow = () => {
    setShow(!show);
  };

  // 삭제
  const onClickDelete = () => {
    const result = window.confirm("정말 삭제하시겠습니까?")
    if(result){
        dispatch(__deleteCalendar(id))
        navigate("/calendar")
    }else{
        return null
    }
}

// 수정
const onClickRevice = () => {
  navigate(`/calendarupdate/${id}`)
}
  return (
    <DetailContainer>
      <DetailWrap>
        <Header />
        <DetailHeader>
          <IoIosArrowBack size='25px' cursor='pointer' onClick={()=> {navigate('/calendar')}} />
          <HeaderTitle>만남일정</HeaderTitle>
          <div></div>
        </DetailHeader>
        <DetailBody>
          <Bodytop>
            <Bodyimg src={Img} alt='' />
            <Bodytxt>
              <Txtname>조수정</Txtname>
              <Txtstudent>
                17학번 <span> 15분 전 </span>
              </Txtstudent>
            </Bodytxt>
            <AiOutlineMenu
              size='20px'
              cursor='pointer'
              style={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={onCilckShow}
            />

            {show ? (
              <Revisebox>
                <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                <DeleteButton onClick={onClickDelete}>삭제</DeleteButton>
              </Revisebox>
            ) : null}
          </Bodytop>
          <BodyContent>
            <ContentTitle>{calendarfind&&calendarfind.calendartitle}</ContentTitle>
            <ContentBody>
              <Contentget>
                <ContentgetTitle>날짜 </ContentgetTitle>
                {moment(getLastArrItem.calendar).format("YYYY년 MM월 DD일")}
              </Contentget>
              <Contentget>
                <ContentgetTitle>시간 </ContentgetTitle>오후 8:00
              </Contentget>
              <Contentget>
                <ContentgetTitle>장소 </ContentgetTitle>{calendarfind&&calendarfind.calendarlocation}
              </Contentget>
              <Contentget>
                <ContentgetTitle>내용 </ContentgetTitle>{calendarfind&&calendarfind.calendarcontent}
              </Contentget>
            </ContentBody>
            <ContentImg src=''></ContentImg>
            <ContentView>조회수 1000회 | 댓글 100개</ContentView>
          </BodyContent>

          <BodyCommentBox>
            {/* 댓글맵돌리기  */}
            <CalendarDetailComment />
            <CalendarDetailComment />

            <CommentContainer>
              <CommentBox>
                <CommentDiv>
                  <CommentPost placeholder='댓글을 입력해주세요'></CommentPost>
                  <CommentButton>올리기</CommentButton>
                </CommentDiv>
              </CommentBox>
            </CommentContainer>
          </BodyCommentBox>
        </DetailBody>
      </DetailWrap>
    </DetailContainer>
  );
};

export default CalendarDetail;

const DetailContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const DetailWrap = styled.form`
  width: 500px;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const DetailHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  font-weight: 800;
  /* margin:10px auto; */
`;
const Revisebox = styled.div`
  border: 1px solid #f1f0f0;
  border-radius: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 55px;
  background-color: #fff;
  /* box-shadow: 5px 5px 5px -2px rgba(0, 0, 0, 0.05); */
`;
const ReviseButton = styled.button`
  border: none;
  border-bottom: 1px solid #f1f0f0;
  padding: 10px 15px;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background-color: #eee;
  padding: 10px 15px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const DetailBody = styled.div`
  border: 1px solid #f1f0f0;
  margin: 10px 20px;
  border-radius: 20px;
  height: 100vh;
  box-sizing: border-box;
  /* box-shadow: 5px 5px 5px -2px rgba(0, 0, 0, 0.05); */
  /* overflow: scroll; */
`;

const Bodytop = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 10px 20px;
  position: relative;
`;

const Bodyimg = styled.img`
  width: 40px;
`;

const Bodytxt = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Txtname = styled.h3`
  margin: 0px;
`;
const Txtstudent = styled.p`
  margin: 0px;
  font-size: 12px;
  color: gray;
  word-wrap: wrap;
`;
const BodyContent = styled.div`
  padding: 0px 20px;
`;
const ContentTitle = styled.h3`
  margin: 20px 0 35px 0;
`;
const ContentBody = styled.div``;

const Contentget = styled.p`
  margin-bottom: 15px;
`

const ContentgetTitle=styled.span`
  color: gray;
  font-weight: bold;
`
const ContentImg = styled.img`
  /* border:1px solid gray; */
  height: 200px;
  border-radius: 20px;
  margin: 20px 0px;
  /* background-repeat: no-repeat;
    background-size: cover; */
`;
const ContentView = styled.p`
  font-size: 14px;
  margin: 30px 0px 10px;
  color: gray;
`;
const BodyCommentBox = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px;
  position: relative;
`;

const CommentContainer = styled.div`
  position: fixed;
  bottom: 0;
  bottom: 10px;
  width: 100%;
  max-width: 500px;
  display: flex;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

const CommentDiv = styled.div`
  width: 400px;
  padding: 10px;
  background-color: #eeeeee;
  border-radius: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const CommentPost = styled.input`
  width: 80%;
  bottom: 0;
  background-color: #eeeeee;
  height: 30px;
  border: none;
`;
const CommentButton = styled.button`
  border: none;
  cursor: pointer;
`;

