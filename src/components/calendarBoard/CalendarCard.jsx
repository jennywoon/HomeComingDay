import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Img from '../../assets/naverIcon.png';
import { BsCalendarCheck } from 'react-icons/bs';
import { __getCalendar } from '../../redux/modules/CalendarSlice';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import commentgray from '../../assets/commentgray.png';
import heartgray from '../../assets/heartgray.png';
import calendarCheck from "../../assets/calendarCheck.png"
import clock from "../../assets/clock.png"

const CalendarCard = ({ calendar, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getCalendar());
  }, [dispatch]);

  const onClickNavi = () => {
    navigate(`/calendardetail/${id}`)
  }

  return (
    <StCalendarCard onClick={onClickNavi}>
      <Card>
        <CardHead>
              <StImg>
                <HeadImg src={calendar.userImage} />
              </StImg>
              <HeadUser>
              <HeadTop>
                <HeadName>{calendar.username}</HeadName>
                <HeadTime>{calendar.createdAt}</HeadTime>
                </HeadTop>
                <HeadBottom>
                  <HeadDepartment>{calendar.departmentName}</HeadDepartment>
                  <HeadStudent>· {calendar.admission}</HeadStudent>
                </HeadBottom>
              </HeadUser>
              </CardHead>
        <CardBody>
          <BodyTitle>{calendar.title}</BodyTitle>
          <BodyContent>
            <CheckLeft>
              <CalendarCheck />
              {calendar.calendarDate}
            </CheckLeft>
            <CheckLeft>
              <Clock/>
              {calendar.calendarTime}
            </CheckLeft>
          </BodyContent>
        </CardBody>
        <CardFooter>
          <Views>조회수 {calendar.views}</Views>
          <Count>
            <CommentCount>
              <CommentImg>
                <img src={commentgray} alt='댓글이미지' />
              </CommentImg>
              {calendar.commentCnt}
            </CommentCount>
            <HeartCount>
              <HeartImg>
                <img src={heartgray} alt='댓글이미지' />
              </HeartImg>
              {calendar.heartCnt}
            </HeartCount>
          </Count>
        </CardFooter>
      </Card>
    </StCalendarCard >
  );
};

export default CalendarCard;

const StCalendarCard = styled.div`
  height: 195px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 97%;
  margin: 0 auto;
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StImg = styled.div`
  /* margin-top: 3px; */
`;

const HeadImg = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 7px;
`;

const HeadUser = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
`;

const HeadTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
`;
const HeadStudent = styled.p``;

const HeadName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  /* border: 1px solid red; */
`;

const HeadBottom = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
  gap: 5px;
  /* border: 1px solid blue; */
`;

const HeadDepartment = styled.div``;

const HeadTime = styled.p`
  font-size: 12px;
  color: gray;
  margin-left: auto;
  font-weight: 500;
`;

const CardBody = styled.div`
  height: 70px;
  /* height: 100%; */
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

const BodyTitle = styled.div`
  margin: 5px 0px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  /* border: 1px solid red; */
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BodyContent = styled.div`
  width: 80%;
  height: 100%;
  font-size: 12px;
  margin: 5px 0px;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const CheckLeft = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const CalendarCheck = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${calendarCheck});
  background-size: 100% 100%;
  background-position: center;
`

const Clock = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${clock});
  background-size: 100% 100%;
  background-position: center;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Views = styled.div`
  font-size: 12px;
  color: gray;
  /* margin-right:10px; */
`;

const Division = styled.div`
  font-size: 12px;
  align-items: center;
  margin: 0 5px;
  color: gray;
`;

const Count = styled.div`
  display: flex;
`;

const CommentCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
  margin-right: 10px;
`;

const CommentImg = styled.div`
  margin-right: 5px;
`

const HeartCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
`;

const HeartImg = styled.div`
  margin-right: 5px;
`