import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 모듈
import { __deleteNotice, __getNotice } from '../../redux/modules/NoticeSlice';
import bellRinging from '../../assets/bellRinging.png';
import { __getDetailHelp } from '../../redux/modules/HelpSlice';
import { __getDetailInformation } from '../../redux/modules/InformationSlice';
import { __getDetailCalendar } from '../../redux/modules/CalendarSlice';
import { __getDetailFreeTalk } from '../../redux/modules/FreeTalkSlice';
// 이미지 아이콘
import { IoMdClose } from 'react-icons/io';


const NoticeCard = ({ item }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOnCheck, setIsOnCheck] = useState(false);

  const {
    notificationId,
    username,
    title,
    createdAt,
    noticeType,
    articleId,
    articleFlag,
  } = item;

  useEffect(() => {
    dispatch(__getNotice());
  }, [dispatch]);

  // 상세페이지 연결
  const onClickNavi = async() => {
    setIsOnCheck(true);
    if (articleFlag === '도움요청') {
      await dispatch(__getDetailHelp(articleId))
      await navigate(`/helpdetail/${articleId}`);
    } else if (articleFlag === '정보공유') {
      await dispatch(__getDetailInformation(articleId))
      await navigate(`/informationdetail/${articleId}`);
    } else if (articleFlag === '만남일정') {
      await dispatch(__getDetailCalendar(articleId))
      await navigate(`/calendardetail/${articleId}`);
    } else if (articleFlag === '자유토크') {
      await dispatch(__getDetailFreeTalk(articleId))
      await navigate(`/freetalkdetail/${articleId}`);
    }
  };

  // 삭제하기
  const deleteHandler = async () => {
    await dispatch(__deleteNotice(notificationId));
    await dispatch(__getNotice());
    navigate('/notice');
  };

  return (
    <StNoticeCard>
      <StNoticeCardContainer>
        <StHeadImg>
          <img src={bellRinging} alt='알림 아이콘' />
        </StHeadImg>
        <StNoticeContainer>
          <StFirstContainer onClick={onClickNavi}>
            <StArticle>
              <StBold>
                [{title.length < 12 ? title : title.slice(0, 12) + '...'}]
              </StBold>{' '}
              게시글에 <StBold>{username}</StBold>
              님이 <StBold>{noticeType}</StBold>
              {noticeType === '댓글' ? '을' : '를'} 남겼습니다
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
  background-color: ${({ isOnCheck }) => (isOnCheck ? '#f9f9f9' : '#fff')};
`;

const StNoticeCardContainer = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const StNoticeContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const StArticle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const StBold = styled.span`
  font-weight: 700;
`;

const StSecondContainer = styled.div`
  padding: 0 10px;
`;

const StCreatAt = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #8e8e8e;
  margin-top: 5px;
`;
