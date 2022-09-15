import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { logout } from '../../shared/cookies';
import { useDispatch, useSelector } from 'react-redux';
import { __getHelp, __deleteHelpComment } from '../../redux/modules/HelpSlice';

const HelpCommentDeleteModal = ({ setModalOpen, comment, setShowComment}) => {

  const dispatch = useDispatch();
  const closeModal = () => {
    setModalOpen(false);
  };

  const { helps } = useSelector((state) => state.helps)
  const { id } = useParams();
  const helpsfind = helps.find((help) => help.articleId === Number(id))
  const { commentId } = helpsfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)

    const onClickDelete = async () => {
        const commentDelete = {
            articleId: Number(id),
            commentId: commentId
        }
       await dispatch(__deleteHelpComment(commentDelete))
       await dispatch(__getHelp())
    }
  return (
    <Container>
      <Wrap>
        <ModalContainer>
          <FirstWrap>
            <ModalTop>
              <AiOutlineInfoCircle style={{ color: '#f7931e' }} size='28' />
              <TopTitle>해당 댓글을 삭제하시겠습니까?</TopTitle>
            </ModalTop>
            <ModalBottom onClick={closeModal}>
              <BottomTitle
            onClick={onClickDelete}
              >삭제하기</BottomTitle>
              <BottomTitle>돌아가기</BottomTitle>
            </ModalBottom>
          </FirstWrap>
        </ModalContainer>
      </Wrap>
    </Container>
  );
};

export default HelpCommentDeleteModal;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  z-index: 10;
  overflow: hidden;
  /* bottom: 0; */
  top: 0;
  
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

const Wrap = styled.div`
position: relative;
  width: 100%;
  /* width: 420px; */
  max-width: 420px;
  height: 100vh;
  /* height: 100%; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 87, 87, 0.3);
  overflow-y: hidden;
`;

const ModalContainer = styled.div`

  width: 80%;
  height: 180px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  
`;

const FirstWrap = styled.div`
  width: 100%;
  height: 100%;
  
`;
const ModalTop = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const TopTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  text-align: center;
  word-break: keep-all;
`;
const ModalBottom = styled.div`
  width: 100%;
  height: 25%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
  gap: 10px;
`;

const BottomTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  /* border: 1px solid red; */
  background-color: #f7931e;
  border-radius: 16px;
  width: 40%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;