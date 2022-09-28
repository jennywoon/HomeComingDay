import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { __deleteNotice, __getNotice } from '../../redux/modules/NoticeSlice';
import NoticeDeleteModal from './NoticeDeleteModal';
import bellRinging from '../../assets/bellRinging.png';

const NoticeCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOnCheck, setIsOnCheck] = useState(false);

  const { notificationId, username, title, createdAt, noticeType, articleId, articleFlag } =
    item;

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(__getNotice());
  }, [dispatch]);

  const onClickNavi = () => {
    setIsOnCheck(true)
    if (articleFlag === "help") {
        navigate(`/helpdetail/${articleId}`)
    } else if (articleFlag === "information") {
        navigate(`/informationdetail/${articleId}`)
    } else if (articleFlag === "calendar") {
        navigate(`/calendardetail/${articleId}`)
    } else if (articleFlag === "freeTalk") {
        navigate(`/freetalkdetail/${articleId}`)
    }
  };

  return (
    <StNoticeCard>
      {modalOpen && (
        <NoticeDeleteModal
          setModalOpen={setModalOpen}
          notificationId={notificationId}
        />
      )}
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
              게시글에{' '}
              <StBold>{username}</StBold>
              님이 댓글을 남겼습니다
            </StArticle>
            <StCreatAt>{createdAt}</StCreatAt>
          </StFirstContainer>
          <StSecondContainer onClick={showModal}>
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
  height: 90px;
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
  /* width: 90%; */
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
