import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { __deleteHelpComment, __updateHelpComment, __getHelp, __getDetailHelp, __postHelpComment } from '../../redux/modules/HelpSlice';
import Input from "../elements/Input";
import { useParams } from 'react-router-dom';
import { BiDotsVerticalRounded } from "react-icons/bi";
import HelpCommentDeleteModal from './HelpCommentDeleteModal';


const DetailComment = ({ comment, modalRef, helpsfind ,data}) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { commentId } = helpsfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)
    const {username} = helpsfind.commentList.find((commentmap)=>commentmap.username === comment.username)
    console.log("commentId", commentId)
    console.log("username", username)

    const [showComment, setShowComment] = useState(false)
    const [showReplyComment,setShowReplyComment] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editComment, setEditComment] = useState("")

    // useEffect(() => {
    //     dispatch(__postHelpComment());
    //     dispatch(__getDetailHelp(id))
    // }, [dispatch])

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

    const onCilckReplyShow = () => {
        setShowReplyComment(!showReplyComment)
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

    const onClickPostReplyComment = (e)=>{
        e.preventDefault();
    }

    //모달
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    return (

        <CommentContain >
            {modalOpen && <HelpCommentDeleteModal setModalOpen={setModalOpen} comment={comment} />}
            <CommentBox >
                <CommentImgDiv>
                    <CommentImg src={comment.userImage} alt="" />
                </CommentImgDiv>
                <CommentTxt>
                    <TxtName>{comment.username}</TxtName>
                    <TxtStudent>{comment.admission} · {comment.departmentName}</TxtStudent>
                    {isEdit ?
                        <EditBox>
                            <Input onChange={onChangeEdit} value={editComment} width="100%"/>
                            <ReviseButtonChange type="button" onClick={onClickReviceChange} >수정완료</ReviseButtonChange>
                        </EditBox>
                        :
                        <Comment>{comment.content}</Comment>

                    }
                   
                        <TxtFirstWrap>
                            <TxtCreateAt> {comment.createdAt}</TxtCreateAt>
                            <TxtCreateAt>|</TxtCreateAt>
                            <TxtCreateAt 
                            onClick={onCilckReplyShow}
                            >답글쓰기</TxtCreateAt>
                        </TxtFirstWrap>
                        {/* 대댓글 해보는 중 */}
                        <ReplyInputContainer 
                        onSubmit={onClickPostReplyComment}
                        >
                            {showReplyComment ?
                            <ReplyCommentBox>
                                <CommentImg src={comment.userImage}></CommentImg>
                                <Input 
                                // value={replyComment} onChange={onChangeReplyHandler}
                                 />
                                <ReviseButtonChange type="submit">댓글달기</ReviseButtonChange>
                            </ReplyCommentBox>
                            : null 
                            }
                            <ReplyCommentBox>
                            <CommentImgDiv>
                                <CommentImg src={comment.userImage}></CommentImg>
                            </CommentImgDiv>
                                <CommentReplytxt>
                                    <div>{comment.username}</div>
                                    <div>대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글</div>
                                </CommentReplytxt>
                                <BiDotsVerticalRounded size="20px" style={{  cursor: "pointer", color: "#bebebe" }}
                                />
                            </ReplyCommentBox>
                        </ReplyInputContainer>
                    
                </CommentTxt>
                {/* <AiOutlineMenu size="18px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={onCilckShow}/> */}

                {username === data.username ? (
                <BiDotsVerticalRounded
                    size="20px" style={{ marginLeft: "auto", marginTop: "2px", cursor: "pointer", color: "#bebebe" }}
                    onClick={onCilckShow} />
                ) : null
                }

                {showComment ?
                    <Revisebox ref={modalRef}>
                        <ReviseButton onClick={onClickRevice} type="button">수정</ReviseButton>
                        <DeleteButton onClick={showModal} type="button">삭제</DeleteButton>
                    </Revisebox>
                    : null}

            </CommentBox>
        </CommentContain>
    );
};

export default DetailComment;


const CommentContain = styled.div`
    margin: 10px 0px;
    /* border: 1px solid blue; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const CommentBox = styled.div`
    display:flex;
    position: relative;
    width: 100%;
`

const CommentImgDiv = styled.div`
    width:40px;
`

const CommentImg = styled.img`
    width:30px;
    height: 30px;
    margin-top: 2px;
    border-radius: 50%;
`

const CommentTxt = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    
    /* margin-left: 10px;  */
`
const Revisebox = styled.div`
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
const ReviseButton = styled.button`
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

const DeleteButton = styled.button`
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
const ReviseButtonChange = styled.button`
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
const EditBox = styled.div`
    display: flex;
    align-items: center;
    width:100%;
    /* padding: 0px 20px; */
`

const TxtName = styled.h3`
    margin: 0px;
    font-size:14px;
    font-weight: 700;
`
const TxtStudent = styled.p`
    margin: 0px;
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
`
const TxtWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const TxtFirstWrap = styled.div`
    display: flex;
    gap: 5px;
`
const TxtCreateAt = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
    cursor: pointer;
`

const ReplyInputContainer = styled.form`
    /* margin-left:30px; */
`
const ReplyCommentBox = styled.div`
    display: flex;
    align-items: center;
    margin-top:6px;
`
const CommentReplytxt = styled.div`
    font-size:13px;
    width:100%;
`

const ReplyCommentImg = styled.img`
    width:30px;
    border-radius: 30px;
`

const Comment = styled.p`
    margin: 5px 0;
    font-size:14px;
    font-weight: 500;
`
