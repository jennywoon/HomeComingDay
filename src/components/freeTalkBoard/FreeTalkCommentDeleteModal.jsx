import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteFreeTalkComment, __getFreeTalk ,__getDetailFreeTalk} from '../../redux/modules/FreeTalkSlice';
import exclamation from "../../assets/exclamation.png"

const FreeTalkCommentDeleteModal = ({ setModalOpen, comment, setShowComment }) => {

  const dispatch = useDispatch();
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  // const { freetalks } = useSelector((state) => state.freetalks)
  const { id } = useParams();
  // const freetalksfind = freetalks.find((freetalk) => freetalk.articleId === Number(id))
  const {freetalksfind} = useSelector((state) => state.freetalks)
  const { commentId } = freetalksfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)
  // console.log("commentId", commentId)
  // console.log(comment)

  //   const onClickDelete = async () => {
  //     const commentDelete = {
  //         articleId: Number(id),
  //         commentId: commentId
  //     }
  //     // const result = window.confirm("정말 삭제하시겠습니까?")
  //         await dispatch(__deleteHelpComment(commentDelete))
  //         await dispatch(__getHelp());
  //         setShowComment(false)
  // }

  const onClickDelete = async () => {
    const commentDelete = {
      articleId: Number(id),
      commentId: commentId
    }
    await dispatch(__deleteFreeTalkComment(commentDelete))
    await dispatch(__getDetailFreeTalk(id))
    // setShowComment(false)
  }
  return (
    <StContainer>
      <StWrap>
        <StModalContainer>
          <StFirstWrap>
            <StModalTop>
              <StExclamation />
              <StTopTitle>해당 댓글을 삭제하시겠습니까?</StTopTitle>
            </StModalTop>
            <StModalBottom onClick={closeModal}>
              <StBottomTitle
                //   onClick={() => {
                //     dispatch(__deleteHelp(helpsfind.articleId))
                //     navigate("/main")
                //   }}
                onClick={onClickDelete}
              >삭제하기</StBottomTitle>
              <StBottomCancelTitle>돌아가기</StBottomCancelTitle>
            </StModalBottom>
          </StFirstWrap>
        </StModalContainer>
      </StWrap>
    </StContainer>
  );
};

export default FreeTalkCommentDeleteModal;

const StContainer = styled.div`
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

const StWrap = styled.div`
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

const StExclamation = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${exclamation});
  background-position: center;
  background-size: 100% 100%;
`

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
  color: white;
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