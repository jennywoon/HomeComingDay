import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Img from "../../assets/naverIcon.png"
import { BsCalendarCheck } from "react-icons/bs";
import { __getCalendar } from '../../redux/modules/CalendarSlice';
import { __getDate } from '../../redux/modules/DateSlice';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const CalendarCard = ({ calendar, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getArrItem = useSelector((state) => state.dates.dates)
    // const getLastArrItem = getArrItem[getArrItem.length-1]
    const getLastArrItem = getArrItem.find((getArrItem) => getArrItem.id === Number(id))

    useEffect(() => {
        dispatch(__getCalendar());
        dispatch(__getDate());
    }, [dispatch])

    const onClickHandler = () => {
        navigate(`/calendardetail/${id}`)
    }

    return (
        <StCalendarCard onClick={onClickHandler} >
            <CardHead>
                <HeadImg>
                    <BsCalendarCheck/>
                </HeadImg>
                <HeadName>이름</HeadName>
                <HeadStudent>14학번</HeadStudent>
                <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
                <BodyTitle>{calendar.calendartitle}</BodyTitle>
                <BodyContent>
                {getLastArrItem && moment(getLastArrItem.calendarDate).format("YYYY년 MM월 DD일")}
                </BodyContent>
                <BodyContent>
                    {calendar.calendarcontent}
                </BodyContent>
            </CardBody>
            <CardFooter>
                <Views>조회수 1500</Views>
                <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
        </StCalendarCard>
    );
};

export default CalendarCard;

const StCalendarCard = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CardHead = styled.div`
    display: flex;
    align-items: center;
`
const HeadImg = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6bd60;
    border-radius: 50%;
`
const HeadName = styled.h2`
    font-size: 18px;
    margin: 0px 5px;
`
const HeadStudent = styled.p`
    font-size: 12px;
    color:gray;
`
const HeadTime = styled.p`
    font-size: 12px;
    color:gray;
    margin-left: auto;
`
const CardBody = styled.div`
`
const BodyTitle = styled.div`
    margin: 5px 0px;
    font-size: 16px;
`
const BodyContent = styled.div`
    font-size: 12px;
    margin: 5px 0px;
`
const CardFooter = styled.div`
    display: flex;
    justify-content: end;
`
const Views = styled.div`
    font-size: 12px;
    color:gray;
    margin-right:10px;
`
const CommentCount = styled.div`
    font-size: 12px;
    color:gray;
`