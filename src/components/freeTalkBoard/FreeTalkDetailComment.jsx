import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  __getFreeTalk,
  __updateFreeTalkComment,
  __postFreeTalkReplyComment,
  __getDetailFreeTalk,
} from '../../redux/modules/FreeTalkSlice';
import { useParams } from 'react-router-dom';
import { GrUploadOption } from 'react-icons/gr';
import FreeTalkCommentDeleteModal from './FreeTalkCommentDeleteModal';
import FreeTalkDetailReplyComment from './FreeTalkDetailReplyComment';
import dots from '../../assets/dots.png';

const FreeTalkDetailComment = ({ comment, freetalksfind, data }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { commentId } = freetalksfind.commentList.find(
    (commentmap) => commentmap.commentId === comment.commentId
  );
  const { childCommentList } = freetalksfind.commentList.find(
    (commentmap) => commentmap
  );
  const { username } = freetalksfind.commentList.find(
    (commentmap) => commentmap.username === comment.username
  );
  const [showComment, setShowComment] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState('');
  const [replyComment, setReplyComment] = useState('');

  //모달닫기
  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (showComment && node.current && !node.current.contains(e.target)) {
        setShowComment(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showComment]);

  const onChangeEdit = (e) => {
    setEditComment(e.target.value);
  };

  const onCilckShow = () => {
    setShowComment(!showComment);
  };

  const onClickRevice = () => {
    setShowComment(!showComment);
    setIsEdit(!isEdit);
  };
  const onClickReviceChange = async () => {
    const editcomment = {
      articleId: Number(id),
      commentId: commentId,
      content: editComment,
    };
    await dispatch(__updateFreeTalkComment(editcomment));
    await dispatch(__getDetailFreeTalk(id));
    setIsEdit(!isEdit);
  };

  //대댓글 post
  const onClickPostReplyComment = async (e) => {
    e.preventDefault();
    const replyComments = {
      articleId: Number(id),
      commentId: commentId,
      content: replyComment,
    };
    await dispatch(__postFreeTalkReplyComment(replyComments));
    setReplyComment('');
    setShowReplyComment(!showReplyComment);
    await dispatch(__getDetailFreeTalk(id));
  };

  //대댓글 토글
  const [createComment, setCreateComment] = useState(false);
  const onCilckReplyShow = () => {
    if (!createComment) {
      setCreateComment(true);
    } else {
      setCreateComment(false);
    }
    setShowReplyComment(!showReplyComment);
  };

  //대댓글 텍스트핸들러
  const onChangeReplyHandler = (e) => {
    setReplyComment(e.target.value);
  };

  // 댓글 올리기 버튼 활성화
  const [isActive, setIsActive] = useState(false);
  const handleCheck = (e) => {
    setIsActive(e);
  };

  useEffect(() => {
    if (replyComment !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [replyComment]);

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <StCommentContain ref={node}>
      {modalOpen && (
        <FreeTalkCommentDeleteModal
          setModalOpen={setModalOpen}
          comment={comment}
        />
      )}
      <StCommentBox>
        <StCommentImgDiv>
          <StCommentImg src={comment && comment.userImage} alt='' />
        </StCommentImgDiv>
        <StCommentTxt>
          <StComments>
            <StCommentsBox>
              <StTxtName>{comment && comment.username}</StTxtName>
              <StTxtStudent>
                {comment && comment.admission} ·{' '}
                {comment && comment.departmentName}
              </StTxtStudent>
              {isEdit ? (
                <StEditBox>
                  <StReplyCommentInput
                    onChange={onChangeEdit}
                    value={editComment}
                    width='100%'
                  />
                  <StUploadBtn onClick={onClickReviceChange}>
                    수정완료
                  </StUploadBtn>
                </StEditBox>
              ) : (
                <StComment>{comment && comment.content}</StComment>
              )}
              <StTxtFirstWrap>
                <StTxtCreateAt> {comment && comment.createdAt}</StTxtCreateAt>
                <StTxtCreateAt>|</StTxtCreateAt>
                <StTxtCreateAt onClick={onCilckReplyShow}>
                  {createComment ? '답글닫기' : '답글쓰기'}
                </StTxtCreateAt>
              </StTxtFirstWrap>
            </StCommentsBox>
            {data.userId === data.userId ? (
              <StDots onClick={onCilckShow} />
            ) : null}
          </StComments>

          <StReplyInputContainer>
            {/* 대댓글맵돌리기 */}
            {comment &&
              comment.childCommentList.map((childComment) => (
                <FreeTalkDetailReplyComment
                  ids={childComment.childCommentId}
                  key={childComment.childCommentId}
                  childComment={childComment}
                  commentId={commentId}
                  childCommentList={childCommentList}
                  username={username}
                  data={data}
                ></FreeTalkDetailReplyComment>
              ))}
            {showReplyComment ? (
              <StReplyCommentBox>
                <StCommentImg src={data.userImage}></StCommentImg>
                <StReplyCommentInputBox>
                  <StReplyCommentInput
                    placeholder='대댓글을 입력해주세요'
                    value={replyComment}
                    onChange={onChangeReplyHandler}
                    width='100%'
                    maxLength='50'
                  />
                  <StUploadBtnBox
                    type='submit'
                    onClick={onClickPostReplyComment}
                    disabled={isActive ? false : true}
                  >
                    <StUploadBtn></StUploadBtn>
                  </StUploadBtnBox>
                </StReplyCommentInputBox>
              </StReplyCommentBox>
            ) : null}
          </StReplyInputContainer>
        </StCommentTxt>
        {showComment ? (
          <StRevisebox ref={node}>
            <StReviseButton onClick={onClickRevice} type='button'>
              수정
            </StReviseButton>
            <StDeleteButton onClick={showModal} type='button'>
              삭제
            </StDeleteButton>
          </StRevisebox>
        ) : null}
      </StCommentBox>
    </StCommentContain>
  );
};

export default FreeTalkDetailComment;

const StCommentContain = styled.form`
  margin: 15px 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StCommentBox = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const StDots = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${dots});
  background-size: 100% 100%;
  background-position: center;
  margin-left: auto;
  cursor: pointer;
  margin-top: 5px;
`;

const StCommentImgDiv = styled.div`
  width: 40px;
`;

const StCommentImg = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 2px;
  border-radius: 50%;
`;

const StReplyCommentInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 12px;
  height: 25px;
  width: 100%;
  padding: 2px 8px;
  margin-left: 5px;
`;
const StReplyCommentInput = styled.input`
  border: none;
  width: 90%;
  outline: none;
  resize: none;
  overflow-y: hidden;
`;

const StUploadBtnBox = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0;
`;
const StUploadBtn = styled(GrUploadOption)`
  font-size: 18px;
  cursor: pointer;
  opacity: 0.5;
`;

const StComments = styled.div`
  display: flex;
`;
const StCommentsBox = styled.div`
  width: 100%;
`;

const StCommentTxt = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 5px;
`;
const StRevisebox = styled.div`
  border: 1px solid #f1f0f0;
  border-radius: 16px;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 30px;
  background-color: #fff;
  width: 58px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
`;
const StReviseButton = styled.button`
  border: none;
  border-bottom: 1px solid #f1f0f0;
  width: 100%;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const StDeleteButton = styled.button`
  border: none;
  background-color: #eee;
  width: 100%;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const StEditBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  /* padding: 0px 20px; */
`;

const StTxtName = styled.h3`
  margin: 0px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
`;
const StTxtStudent = styled.p`
  margin: 0px;
  font-size: 12px;
  font-weight: 400;
  color: #bebebe;
`;

const StTxtFirstWrap = styled.div`
  display: flex;
  gap: 5px;
`;
const StTxtCreateAt = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #bebebe;
  cursor: pointer;
`;

const StReplyInputContainer = styled.div``;
const StReplyCommentBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 6px;
`;

const StComment = styled.p`
  margin: 5px 0;
  font-size: 14px;
  font-weight: 400;
  word-break: break-word;
`;
