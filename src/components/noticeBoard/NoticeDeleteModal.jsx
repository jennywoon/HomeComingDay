import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
// import { __deleteHelp, __getHelp } from '../../redux/modules/HelpSlice';
import { __deleteNotice, __getNotice } from '../../redux/modules/NoticeSlice';

const NoticeDeleteModal = ({ setModalOpen, notificationId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 삭제하기
  const deleteHandler = async () => {
    await dispatch(__deleteNotice(notificationId));
    await dispatch(__getNotice());
    navigate('/notice');
  };

  return (
    <StContainer>
      <StWrap>
        <StModalContainer>
          <StFirstWrap>
            <StModalTop>
              <AiOutlineInfoCircle color='#f7931e' size='28' />
              <StTopTitle>해당 알림을 삭제하시겠습니까?</StTopTitle>
            </StModalTop>
            <StModalBottom onClick={closeModal}>
              <StBottomTitle onClick={deleteHandler}>삭제하기</StBottomTitle>
              <StBottomCancelTitle>돌아가기</StBottomCancelTitle>
            </StModalBottom>
          </StFirstWrap>
        </StModalContainer>
      </StWrap>
    </StContainer>
  );
};

export default NoticeDeleteModal;

const StContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  bottom: 0;
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 100%;
    max-height: 1202px;
    max-width: 420px;
    margin: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 24 px;
    @media screen and (min-width: 1024px) {
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
`;

const StWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 87, 87, 0.3);
  overflow-y: hidden;
`;

const StModalContainer = styled.div`
  width: 80%;
  height: 180px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;

const StFirstWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const StModalTop = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const StTopTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  text-align: center;
  word-break: keep-all;
`;

const StModalBottom = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
  gap: 10px;
`;

const StBottomTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  background-color: #f7931e;
  border-radius: 16px;
  width: 40%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: white;
`;

const StBottomCancelTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  /* background-color: #f7931e; */
  border: 1px solid #f7931e;
  border-radius: 16px;
  width: 40%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: #f7931e;
`