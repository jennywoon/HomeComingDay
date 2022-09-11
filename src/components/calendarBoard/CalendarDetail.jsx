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
import { __getCalendar, __deleteCalendar } from '../../redux/modules/CalendarSlice';
import moment from 'moment';
import { BiDotsVerticalRounded } from "react-icons/bi";

const CalendarDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const { calendars } = useSelector((state) => state.calendars);
  const calendarfind = calendars.find((calendar) => calendar.id === Number(id))

  useEffect(() => {
    dispatch(__getCalendar());
  }, [dispatch])

  // 수정 삭제 모달
  const onCilckShow = () => {
    setShow(!show);
  };

  // 삭제
  const onClickDelete = () => {
    const result = window.confirm("정말 삭제하시겠습니까?")
    if (result) {
      dispatch(__deleteCalendar(id))
      navigate("/calendar")
    } else {
      return null
    }
  }

  // 수정
  const onClickRevice = () => {
    navigate(`/calendarupdate/${id}`)
  }
  return (
    <Container>
      <Header />
      <DetailContainer>
        <HelpWrap>
          <DetailWrap>
            <FirstWrap>
              <DetailHeader>
                <IoIosArrowBack size='25px' cursor='pointer' onClick={() => { navigate('/calendar') }} />
                <HeaderTitle>만남일정</HeaderTitle>
                <div style={{ width: "25px", height: "25px" }}></div>
              </DetailHeader>
            </FirstWrap>
            <DetailBody>
              <Bodytop>
                <Bodyimg src={Img} alt='' />
                <Bodytxt>
                  <Txtname>조수정</Txtname>
                  <Txtstudent>
                    17학번 <span> 15분 전 </span>
                  </Txtstudent>
                </Bodytxt>
                <BiDotsVerticalRounded
                  size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
                  onClick={onCilckShow} />
                {show ? (
                  <Revisebox>
                    <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                    <DeleteButton onClick={onClickDelete}>삭제</DeleteButton>
                  </Revisebox>
                ) : null}
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
                <ContentView>조회수 1000회 | 댓글 100개</ContentView>
              </BodyContent>

              <BodyCommentBox>
                {/* 댓글맵돌리기  */}
                <CalendarDetailComment />
                <CalendarDetailComment />
              </BodyCommentBox>
            </DetailBody>
          </DetailWrap>
        </HelpWrap>
        <CommentContainer>
          <CommentBox>
            <CommentDiv>
              <CommentPost placeholder='댓글을 입력해주세요'></CommentPost>
              <CommentButton>올리기</CommentButton>
            </CommentDiv>
          </CommentBox>
        </CommentContainer>
      </DetailContainer>
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

const DetailContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const HelpWrap = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

const DetailWrap = styled.form`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const FirstWrap = styled.div`
    display: flex;
    flex-direction: column;
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
`;
const HeaderTitle = styled.div`
  font-weight: 800;
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
  border-radius: 20px;
    width: 100%;
    height:100%;
`;

const Bodytop = styled.div`
    display:flex;
    align-items: center;
    padding:20px 20px 10px 20px;
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
`;
const Txtstudent = styled.p`
  font-size: 12px;
  color: gray;
`;
const BodyContent = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ContentTitle = styled.h3`
`;
const ContentBody = styled.div`
  color:gray;
`;

const Contentget = styled.p`
`

const ContentgetTitle = styled.span`
  color: gray;
  font-weight: bold;
`
const ContentImg = styled.img`
  height: 200px;
  border-radius: 20px;
`;
const ContentView = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
`;
const BodyCommentBox = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 100%;
    width: 100%;
`;

const CommentContainer = styled.div`
  position: sticky;
    bottom: 0;
    bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
    width: 95%;
`;

const CommentDiv = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #eeeeee;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentPost = styled.input`
  width: 80%;
  background-color: #eeeeee;
  height: 30px;
  border-radius: 10px;
  border: none;
`;
const CommentButton = styled.button`
  border: none;
  cursor: pointer;
`;

