import React from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from "../elements/Input";
import { __deleteFreeTalkComment, __getFreeTalk, __updateFreeTalkComment , __postFreeTalkReplyComment } from '../../redux/modules/FreeTalkSlice';
import { useParams } from 'react-router-dom';
import { GrUploadOption } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import FreeTalkCommentDeleteModal from './FreeTalkCommentDeleteModal';
import FreeTalkDetailReplyComment from './FreeTalkDetailReplyComment';

const FreeTalkDetailComment = ({ comment, freetalksfind, modalRef ,data}) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { commentId } = freetalksfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)
    const {childCommentList} = freetalksfind.commentList.find((commentmap)=> commentmap)
    const {username} = freetalksfind.commentList.find((commentmap)=>commentmap.username === comment.username)
    const [showComment, setShowComment] = useState(false)
    const [showReplyComment,setShowReplyComment] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editComment, setEditComment] = useState("")
    const [replyComment,setReplyComment] = useState("")

    const onChangeEdit = (e) => {
        setEditComment(e.target.value)
    }

    const onCilckShow = () => {
        setShowComment(!showComment)
    }

    // const onClickDelete = async () => {
    //     const commentDelete = {
    //         articleId: Number(id),
    //         commentId: commentId
    //     }
    //     const result = window.confirm("정말 삭제하시겠습니까?")
    //     if (result) {
    //         await dispatch(__deleteFreeTalkComment(commentDelete))
    //         await dispatch(__getFreeTalk());
    //         setShowComment(false)
    //     } else {
    //         return
    //     }
    // }

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
        await dispatch(__updateFreeTalkComment(editcomment))
        await dispatch(__getFreeTalk());
        setIsEdit(!isEdit)
    }

    //대댓글 post
    const onClickPostReplyComment = async(e)=>{
        e.preventDefault();
        const replyComments = {
            articleId: Number(id),
            commentId: commentId,
            content: replyComment
        }
        await dispatch(__postFreeTalkReplyComment(replyComments))
        setReplyComment("")
        setShowReplyComment(!showReplyComment)
        await dispatch(__getFreeTalk())
        
        
    }

        //대댓글 토글
        const onCilckReplyShow = () => {
            setShowReplyComment(!showReplyComment)
        }
        
        //대댓글 텍스트핸들러
        const onChangeReplyHandler = (e) =>{
            setReplyComment(e.target.value)
        }

    //모달
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    return (
        <StCommentContain >
            {modalOpen && <FreeTalkCommentDeleteModal setModalOpen={setModalOpen} comment={comment} />}
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

                            {/* // <StReplyCommentInput value={replyComment} onChange={onChangeReplyHandler} width="100%"/>
                            //     <StUploadBtn onClick={onClickPostReplyComment}></StUploadBtn> */}
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
                            {/* 대댓글맵돌리기 */}
                            {comment && comment.childCommentList.map((childComment) =>
                            <FreeTalkDetailReplyComment ids={childComment.childCommentId} key={childComment.childCommentId} childComment={childComment} commentId={commentId} childCommentList={childCommentList} username={username} data={data}></FreeTalkDetailReplyComment>
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
                    
                
                {/* <AiOutlineMenu size="18px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={onCilckShow}/> */}


                </StCommentTxt>
                {showComment ?
                    <StRevisebox ref={modalRef}>
                        <StReviseButton onClick={onClickRevice} type="button">수정</StReviseButton>
                        <StDeleteButton onClick={showModal} type="button">삭제</StDeleteButton>
                    </StRevisebox>
                    : null}

            </StCommentBox>
        </StCommentContain>
    );
};

export default FreeTalkDetailComment;


const StCommentContain = styled.div`
    margin: 15px 0px;
    /* border: 1px solid blue; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const StCommentBox = styled.div`
    display:flex;
    /* position: relative; */
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
    height:28px;
    border-radius: 30px;
    border:1px solid #D9D9D9;
    background-color: #fff;
    margin-left:5px;
    padding:2px 30px 0px 8px;
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
    /* margin-left: 10px;  */
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
    /* border:none; */
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
    /* padding: 0px 20px; */
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
const StCommentReplytxt = styled.div`
    font-size:13px;
    width:100%;
`

const StReplyCommentImg = styled.img`
    width:30px;
    border-radius: 30px;
`

const StComment = styled.p`
    margin: 5px 0;
    font-size:14px;
    font-weight: 500;
`