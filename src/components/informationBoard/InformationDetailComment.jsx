import React from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from "../elements/Input";
import { __deleteInfoComment, __updateInfoComment, __getInformation, __getDetailInformation, __postInformation, __postInfoReplyComment } from '../../redux/modules/InformationSlice';
import { useParams } from 'react-router-dom';
import { BiDotsVerticalRounded } from "react-icons/bi";
import InfoCommentDeleteModal from './InfoCommentDeleteModal';

const InformationComment = ({ comment, informationsfind, modalRef }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { commentId } = informationsfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)

    const [showComment, setShowComment] = useState(false)
    const [showReplyComment, setShowReplyComment] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editComment, setEditComment] = useState("")

    const onChangeEdit = (e) => {
        setEditComment(e.target.value)
    }

    const onCilckShow = () => {
        setShowComment(!showComment)
    }
    const onCilckReplyShow = () => {
        setShowReplyComment(!showReplyComment)
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

    // 대댓글 구현중
    const [replyComment, setReplyComment] = useState("");
    const onChangeReplyHandler = (e) => {
        setReplyComment(e.target.value);
    }

    const onClickPostReplyComment = async (e) => {
        e.preventDefault();
        const newReplyComment = {
            content: replyComment,
            articleId: Number(id),
            commentId: commentId
        }
        await dispatch(__postInfoReplyComment(newReplyComment));
        await dispatch(__getInformation());
        setReplyComment("");
    }

    return (
        <CommentContain>
            {modalOpen && <InfoCommentDeleteModal setModalOpen={setModalOpen} comment={comment} />}
            <CommentBox>
                <CommentImg src={comment.userImage} alt="" />
                <CommentTxt>
                    <TxtName>{comment.username}</TxtName>
                    <TxtStudent>{comment.admission} · {comment.departmentName}</TxtStudent>
                    {isEdit ?
                        <EditBox>
                            <Input onChange={onChangeEdit} value={editComment} />
                            <ReviseButtonChange type="button" onClick={onClickReviceChange} >수정완료</ReviseButtonChange>
                        </EditBox>
                        :
                        <Comment>{comment.content}</Comment>
                    }
                    <TxtWrap>
                        <TxtFirstWrap>
                            <TxtCreateAt> {comment.createdAt}</TxtCreateAt>
                            <TxtCreateAt>|</TxtCreateAt>
                            <TxtCreateAt onClick={onCilckReplyShow}>답글쓰기</TxtCreateAt>
                        </TxtFirstWrap>
                        <ReplyInputContainer onSubmit={onClickPostReplyComment}>
                            {/* {showReplyComment ? */}
                                <div>
                                    <input value={replyComment} onChange={onChangeReplyHandler}/>
                                    <button>올리기</button>
                                </div>
                                {/* : null */}
                            {/* } */}
                        </ReplyInputContainer>
                    </TxtWrap>
                </CommentTxt>

                <BiDotsVerticalRounded
                    size="20px" style={{ marginLeft: "auto", marginTop: "2px", cursor: "pointer", color:"#bebebe" }}
                    onClick={onCilckShow} />
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

export default InformationComment;


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
    /* align-items: center; */
    /* padding:20px 20px 0px 20px; */
    /* margin-bottom: 10px; */
    position: relative;
    /* border: 1px solid red; */
    width: 100%;
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
    margin-left: 10px;   
`
const Revisebox = styled.div`
    border: 1px solid #f1f0f0;
    border-radius: 10px;
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    right: 0;
    top:55px;
    background-color: #fff;
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
`
const ReviseButton = styled.button`
    border:none;
    border-bottom: 1px solid #f1f0f0;
    padding:10px 15px;
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
    padding:10px 15px;
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
    background-color:white;
    font-size:13px;
    /* border:none; */
    border:1px solid gray;
    cursor:pointer;
    border-radius: 10px;
    
`
const EditBox = styled.div`
    display: flex;
    align-items: center;
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

const ReplyInputContainer = styled.form``
const Comment = styled.p`
    /* padding: 0px 20px; */
    margin: 5px 0;
    font-size:14px;
    font-weight: 500;
`