import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 모듈
import { __getCalendar, __getDetailCalendar } from '../../redux/modules/CalendarSlice';
// 아이콘 이미지
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

  const onClickNavi = async() => {
    await dispatch(__getDetailCalendar(id))
    await navigate(`/calendardetail/${id}`)
  }

  return (
    <StCalendarCard onClick={onClickNavi}>
      <StCard>
        <StCardHead>
              <StImg>
                <StHeadImg src={calendar.userImage} />
              </StImg>
              <StHeadUser>
              <StHeadTop>
                <StHeadName>{calendar.username}</StHeadName>
                <StHeadTime>{calendar.createdAt}</StHeadTime>
                </StHeadTop>
                <StHeadBottom>
                  <StHeadDepartment>{calendar.departmentName}</StHeadDepartment>
                  <StHeadStudent>· {calendar.admission}</StHeadStudent>
                </StHeadBottom>
              </StHeadUser>
              </StCardHead>
        <StCardBody>
          <StBodyTitleBox>
            {calendar.joinCheck === false ?
            <StRecruit>모집중</StRecruit> 
          :
          <StRecruit className='end'>모집마감</StRecruit>
          }
            <StBodyTitle>{calendar.title}</StBodyTitle>
            <StBodyDiv></StBodyDiv>
          </StBodyTitleBox>
          <StBodyContent>
            <StCheckLeft>
              <CalendarCheck />
              {calendar.calendarDate}
            </StCheckLeft>
            <StCheckLeft>
              <Clock/>
              {calendar.calendarTime}
            </StCheckLeft>
          </StBodyContent>
        </StCardBody>
        <StCardFooter>
          <StViews>조회수 {calendar.views}</StViews>
          <StCount>
            <StCommentCount>
              <StCommentImg>
                <img src={commentgray} alt='댓글이미지' />
              </StCommentImg>
              {calendar.commentCnt}
            </StCommentCount>
            <StHeartCount>
              <StHeartImg>
                <img src={heartgray} alt='댓글이미지' />
              </StHeartImg>
              {calendar.heartCnt}
            </StHeartCount>
          </StCount>
        </StCardFooter>
      </StCard>
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

const StCard = styled.div`
  width: 97%;
  margin: 0 auto;
`;

const StCardHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StImg = styled.div`
`;

const StHeadImg = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 7px;
`;

const StHeadUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
`;

const StHeadTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;
const StHeadStudent = styled.p``;

const StHeadName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const StHeadBottom = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
  gap: 5px;
`;

const StHeadDepartment = styled.div``;

const StHeadTime = styled.p`
  font-size: 12px;
  color: gray;
  margin-left: auto;
  font-weight: 500;
`;

const StCardBody = styled.div`
  height: 70px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StBodyTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  height: 100%;
`

const StRecruit = styled.div`
  width:25%;
  font-weight: 700;
font-size: 14px;
color:#03C75A;

text-align: end;
&&.end{
  color:#B3B3B3;
}
`

const StBodyTitle = styled.div`
  margin: 5px 0px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  box-sizing: border-box;
  padding:0px 10px;
  width: 60%;
  text-align: center;
  word-break: break-word;
`;

const StBodyDiv = styled.div`
width:25%;
`

const StBodyContent = styled.div`
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

const StCheckLeft = styled.div`
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

const StCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StViews = styled.div`
  font-size: 12px;
  color: gray;
`;

const StCount = styled.div`
  display: flex;
`;

const StCommentCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
  margin-right: 10px;
`;

const StCommentImg = styled.div`
  margin-right: 5px;
`

const StHeartCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
`;

const StHeartImg = styled.div`
  margin-right: 5px;
`