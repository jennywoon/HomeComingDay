import React, { useEffect ,useRef} from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { __deleteInfoComment, __updateInfoComment, __getInformation, __getDetailInformation, __postInformation, __postInfoReplyComment } from '../../redux/modules/InformationSlice';
import { useParams } from 'react-router-dom';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrUploadOption } from "react-icons/gr";
import InfoCommentDeleteModal from './InfoCommentDeleteModal';
import InformationReplyComment from './InformationReplyComment';

const InformationComment = ({ comment, informationsfind, modalRef ,data}) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { commentId } = informationsfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)
    const {childCommentList} = informationsfind.commentList.find((commentmap)=> commentmap)
    const {username} = informationsfind.commentList.find((commentmap)=>commentmap.username === comment.username)

    const [showComment, setShowComment] = useState(false)
    const [showReplyComment, setShowReplyComment] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editComment, setEditComment] = useState("")
    const [replyComment,setReplyComment] = useState("")

  //모달닫기
  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (showComment && node.current && !node.current.contains(e.target)) {
        setShowComment(false);
      }
  };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showComment]);


    const onChangeEdit = (e) => {
        setEditComment(e.target.value)
    }

    const onCilckShow = () => {
        setShowComment(!showComment)
    }


    const onClickRevice = () => {
        setShowComment(!showComment)
        setIsEdit(!isEdit)
    }
    const onClickReviceChange = async () => {
        const editcomment = {
            articleId: Number(id),
            commentId: commentId,
            content: editComment
        }
        await dispatch(__updateInfoComment(editcomment))
        await dispatch(__getInformation());
        setIsEdit(!isEdit)
    }

    //모달
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }


   //대댓글 토글
    const onCilckReplyShow = () => {
        setShowReplyComment(!showReplyComment)
    }
    
    //대댓글 텍스트핸들러
    const onChangeReplyHandler = (e) =>{
        setReplyComment(e.target.value)
    }

     //대댓글 post
    const onClickPostReplyComment = async (e) => {
        e.preventDefault();
        const replyComments = {
            content: replyComment,
            articleId: Number(id),
            commentId: commentId
        }
        await dispatch(__postInfoReplyComment(replyComments));
        setReplyComment("");
        setShowReplyComment(!showReplyComment)
        await dispatch(__getInformation());
    }

    return (
        <StCommentContain ref={node}>
            {modalOpen && <InfoCommentDeleteModal setModalOpen={setModalOpen} comment={comment} />}
            <StCommentBox >
                <StCommentImgDiv>
                    <StCommentImg src={comment && comment.userImage} alt="" />
                </StCommentImgDiv>
                <StCommentTxt>
                    <StComments>
                        <StCommentsBox>
                    <StTxtName>{comment &&comment.username}</StTxtName>
                    <StTxtStudent>{comment &&comment.admission} · {comment &&comment.departmentName}</StTxtStudent>
                    {isEdit ?
                        <StEditBox>
                            <StReplyCommentInput onChange={onChangeEdit} value={editComment} width="100%" />
                            <StUploadBtn onClick={onClickReviceChange}>수정완료</StUploadBtn>

                        </StEditBox>
                        :
                        <StComment>{comment &&comment.content}</StComment>}
                        <StTxtFirstWrap>
                            <StTxtCreateAt> {comment &&comment.createdAt}</StTxtCreateAt>
                            <StTxtCreateAt>|</StTxtCreateAt>
                            <StTxtCreateAt 
                            onClick={onCilckReplyShow}
                            >답글쓰기</StTxtCreateAt>
                        </StTxtFirstWrap>
                        </StCommentsBox>
                        {username === data.username ? (
                        <BiDotsVerticalRounded
                            size="17px" style={{ marginLeft: "auto", marginTop: "5px", cursor: "pointer", color: "#bebebe" }}
                            onClick={onCilckShow} />
                        ) : null
                        }
                       </StComments>
                    
                        <StReplyInputContainer>
                            
                            {comment && comment.childCommentList.map((childComment) =>
                            <InformationReplyComment ids={childComment.childCommentId} key={childComment.childCommentId} childComment={childComment} commentId={commentId} childCommentList={childCommentList} username={username} data={data}></InformationReplyComment>
                            )}
                            
                            {showReplyComment ?
                            <StReplyCommentBox>
                                <StCommentImg src={data.userImage}></StCommentImg>
                                <StReplyCommentInput value={replyComment} onChange={onChangeReplyHandler} width="100%"/>
                                <StUploadBtn onClick={onClickPostReplyComment}></StUploadBtn>
                            </StReplyCommentBox>
                            : null 
                            }
                        </StReplyInputContainer>


                </StCommentTxt>
                {showComment ?
                    <StRevisebox ref={node}>
                        <StReviseButton onClick={onClickRevice} type="button">수정</StReviseButton>
                        <StDeleteButton onClick={showModal} type="button">삭제</StDeleteButton>
                    </StRevisebox>
                    : null}

            </StCommentBox>
        </StCommentContain>
    );
};

export default InformationComment;


const StCommentContain = styled.div`
    margin: 15px 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const StCommentBox = styled.div`
    display:flex;
    width: 100%;
    position:relative;
`

const StCommentImgDiv = styled.div`
    width:40px;
    
`

const StCommentImg = styled.img`
    width:30px;
    height: 30px;
    margin-top: 2px;
    border-radius: 50%;
`
const StReplyCommentInput = styled.textarea`
    width:100%;
    height:24px;
    line-height: 24px;
    border-radius: 30px;
    border:1px solid #D9D9D9;
    background-color: #fff;
    margin-left:5px;
    outline:none;
    resize:none;
    overflow-y: hidden;
`
const StUploadBtn = styled(GrUploadOption)`
    position:absolute;
    right:8px;    
    font-size: 18px;
    cursor:pointer;
    opacity: 0.5;
    color:red;
`

const StComments =styled.div`
    display: flex;
`
const StCommentsBox = styled.div`
    width:100%;
`

const StCommentTxt = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
`
const StRevisebox = styled.div`
    border: 1px solid #f1f0f0;
    border-radius: 16px;
    position:absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    right: 0;
    top:30px;
    background-color: #fff;
    width:58px;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);

`
const StReviseButton = styled.button`
    border:none;
    border-bottom: 1px solid #f1f0f0;
    width:100%;
    padding:10px;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`

const StDeleteButton = styled.button`
    border:none;
    background-color: #eee;
    width:100%;
    padding:10px;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`
const StReviseButtonChange = styled.button`
    width:50px;
    background-color:white;
    position:absolute;
    right:0;
    font-size:10px;
    border:1px solid gray;
    cursor:pointer;
    border-radius: 10px;
    height:25px;
    color:gray;
    
`
const StEditBox = styled.div`
    display: flex;
    align-items: center;
    width:100%;
    position:relative;
`

const StTxtName = styled.h3`
    margin: 0px;
    font-size:14px;
    font-weight: 700;
    width:100%;
`
const StTxtStudent = styled.p`
    margin: 0px;
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
`
const StTxtWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const StTxtFirstWrap = styled.div`
    display: flex;
    gap: 5px;
`
const StTxtCreateAt = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
    cursor: pointer;
`

const StReplyInputContainer = styled.div`
`
const StReplyCommentBox = styled.div`
    display: flex;
    position:relative;
    align-items: center;
    margin-top:6px;
`
const StComment = styled.p`
    margin: 5px 0;
    font-size:14px;
    font-weight: 500;
`
