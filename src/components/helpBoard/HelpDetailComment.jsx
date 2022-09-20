import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { __deleteHelpComment, __updateHelpComment, __getHelp, __getDetailHelp, __postHelpComment, __postHelpReplyComment } from '../../redux/modules/HelpSlice';
import Input from "../elements/Input";
import { useParams } from 'react-router-dom';
import { BiDotsVerticalRounded } from "react-icons/bi";
import HelpCommentDeleteModal from './HelpCommentDeleteModal';
import HelpDetailReplyComment from './HelpDetailReplyComment';


const DetailComment = ({ comment, modalRef, helpsfind ,data}) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    console.log(comment)

    const { commentId } = helpsfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)
    const {childCommentList} = helpsfind.commentList.find((commentmap)=> commentmap)
    const {username} = helpsfind.commentList.find((commentmap)=>commentmap.username === comment.username)
    console.log("childCommentList",childCommentList)
    // console.log("commentId", commentId)
    // console.log("username", username)

    const [showComment, setShowComment] = useState(false)
    const [showReplyComment,setShowReplyComment] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editComment, setEditComment] = useState("")
    const [replyComment,setReplyComment] = useState("")

    // useEffect(() => {
    //     dispatch(__postHelpComment());
    //     dispatch(__getDetailHelp(id))
    // }, [dispatch])

    const onChangeEdit = (e) => {
        setEditComment(e.target.value)
    }

    const onCilckReplyShow = () => {
        setShowReplyComment(!showReplyComment)
    }

    const onChangeReplyHandler = (e) =>{
        setReplyComment(e.target.value)
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
    //         await dispatch(__deleteHelpComment(commentDelete))
    //         await dispatch(__getHelp());
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
        await dispatch(__updateHelpComment(editcomment))
        await dispatch(__getHelp());
        setIsEdit(!isEdit)
    }

    const onClickPostReplyComment = async(e)=>{
        e.preventDefault();
        const replyComments = {
            articleId: Number(id),
            commentId: commentId,
            content: replyComment
        }
        await dispatch(__postHelpReplyComment(replyComments))
        setReplyComment("")
        setShowReplyComment(!showReplyComment)
        await dispatch(__getHelp())
        
        
    }

    //모달
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    return (

        <StCommentContain >
            {modalOpen && <HelpCommentDeleteModal setModalOpen={setModalOpen} comment={comment} />}
            <StCommentBox >
                <StCommentImgDiv>
                    <StCommentImg src={comment && comment.userImage} alt="" />
                </StCommentImgDiv>
                <StCommentTxt>
                    <StTxtName>{comment &&comment.username}</StTxtName>
                    <StTxtStudent>{comment &&comment.admission} · {comment &&comment.departmentName}</StTxtStudent>
                    {isEdit ?
                        <StEditBox>
                            <Input onChange={onChangeEdit} value={editComment} width="100%"/>
                            <StReviseButtonChange type="button" onClick={onClickReviceChange} >수정완료</StReviseButtonChange>
                        </StEditBox>
                        :
                        <StComment>{comment &&comment.content}</StComment>

                    }
                   
                        <StTxtFirstWrap>
                            <StTxtCreateAt> {comment &&comment.createdAt}</StTxtCreateAt>
                            <StTxtCreateAt>|</StTxtCreateAt>
                            <StTxtCreateAt 
                            onClick={onCilckReplyShow}
                            >답글쓰기</StTxtCreateAt>
                        </StTxtFirstWrap>
                        {/* 대댓글 해보는 중 */}
                        <StReplyInputContainer 
                        >
                            {showReplyComment ?
                            <StReplyCommentBox>
                                <StCommentImg src={comment &&comment.userImage}></StCommentImg>
                                <Input 
                                value={replyComment} onChange={onChangeReplyHandler}
                                 />
                                <StReviseButtonChange type="button" onClick={onClickPostReplyComment}>댓글달기</StReviseButtonChange>
                            </StReplyCommentBox>
                            : null 
                            }
                            {/* 대댓글맵돌리기 */}
                            {/* HelpDetailReplyComment */}
                            {comment && comment.childCommentList.map((childComment) =>
                            <HelpDetailReplyComment key={childComment.childCommentId} childComment={childComment} replyComment={replyComment} setReplyComment={setReplyComment} commentId={commentId} childCommentList={childCommentList}></HelpDetailReplyComment>
                            )}
                        </StReplyInputContainer>
                    
                </StCommentTxt>
                {/* <AiOutlineMenu size="18px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={onCilckShow}/> */}

                {username === data.username ? (
                <BiDotsVerticalRounded
                    size="20px" style={{ marginLeft: "auto", marginTop: "2px", cursor: "pointer", color: "#bebebe" }}
                    onClick={onCilckShow} />
                ) : null
                }

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

export default DetailComment;


const StCommentContain = styled.div`
    margin: 10px 0px;
    /* border: 1px solid blue; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const StCommentBox = styled.div`
    display:flex;
    position: relative;
    width: 100%;
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

const StCommentTxt = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    
    /* margin-left: 10px;  */
`
const StRevisebox = styled.div`
    border: 1px solid #f1f0f0;
    border-radius: 16px;
    position: absolute;
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
    margin-left : auto; 
    width:70px;
    background-color:white;
    font-size:12px;
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
    /* padding: 0px 20px; */
`

const StTxtName = styled.h3`
    margin: 0px;
    font-size:14px;
    font-weight: 700;
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
    /* margin-left:30px; */
`
const StReplyCommentBox = styled.div`
    display: flex;
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
