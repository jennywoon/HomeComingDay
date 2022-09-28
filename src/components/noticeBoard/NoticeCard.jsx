import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbBellRinging } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { __deleteNotice, __getNotice } from '../../redux/modules/NoticeSlice';
import { useEffect } from 'react';

const NoticeCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notificationId, username, title, createdAt, noticeType, articlesId } = item;

  const deleteHandler = () => {
    dispatch(__deleteNotice(notificationId))
  }
  
  // useEffect(()=>{
  //   dispatch(__getNotice());
  // },[dispatch])

  const onClickNavi = () => {
    // if (item.articleFlag === "도움요청") {
    //     navigate(`/helpdetail/${articlesId}`)
    // } else if (item.articleFlag === "정보공유") {
    //     navigate(`/informationdetail/${articlesId}`)
    // } else if (item.articleFlag === "만남일정") {
    //     navigate(`/calendardetail/${articlesId}`)
    // } else if (item.articleFlag === "자유토크") {
    //     navigate(`/freetalkdetail/${articlesId}`)
    // }
};

  return (
    <StNoticeCard onClick={onClickNavi}>
      <StNoticeCardContainer style={{ cursor: 'pointer' }}>
        <StHeadImg>
          <TbBellRinging size='32' color='white' />
        </StHeadImg>
        <StNoticeContainer>
          <StFirstContainer>
            <StArticle>
              <StTitle>[{title}]</StTitle> 게시글에 {noticeType}이 달렸습니다
            </StArticle>
            <StCreatAt>{createdAt}</StCreatAt>
          </StFirstContainer>
          <StSecondContainer onClick={deleteHandler}>
            <IoMdClose size='22' color='#8E8E8E' />
          </StSecondContainer>
        </StNoticeContainer>
      </StNoticeCardContainer>
    </StNoticeCard>
  );
};

export default NoticeCard;

const StNoticeCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  /* border: 1px solid red; */
`;

const StNoticeCardContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  /* border: 1px solid green; */
  width: 90%;
  height: 80px;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const StNoticeContainer = styled.div`
  width: 90%;
  /* height: 80px; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
  gap: 4px;
`;

const StHeadImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f7931e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StFirstContainer = styled.div`
  /* width: 80%; */
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;
const StArticle = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 90%;
`;

const StTitle = styled.span`
  font-weight: 700;
`

const StSecondContainer = styled.div`
  padding: 0 10px;
`;
const StCreatAt = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #8e8e8e;
  margin-top: 5px;
`;