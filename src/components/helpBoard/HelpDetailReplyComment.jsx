import React from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from 'react';
import Input from "../elements/Input";
import { useDispatch } from 'react-redux';
import { __updateHelpReplyComment,__deleteHelpReplyComment, __getHelp } from '../../redux/modules/HelpSlice';
import { useParams } from 'react-router-dom';


const HelpDetailReplyComment = ({childCommentList,commentId,childComment, replyComment ,setReplyComment}) => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const [showReplyComment,setShowReplyComment] = useState(false)
    const [reviseReplyComment,setReviseReplyComment] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);

    // const {childCommentList} = helpsfind.commentList.find((commentmap)=> commentmap)
    const childCommentId = childCommentList.find((comment)=> comment.childCommentId === childComment.childCommentId)

    console.log("childCommentId",childCommentId)
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }
    const onClickRevice = () => {
        setReviseReplyComment(!reviseReplyComment)
        setShowReplyComment(!showReplyComment)
    }

    const onChangeReplyHandler = (e) =>{
        setReplyComment(e.target.value)
    }

    const onCilckShow = () => {
        setShowReplyComment(!showReplyComment)
    }

    const onClickDeleteReplyComment = async() =>{
        const deleteReplyComments = {
            articleId: Number(id),
            commentId: commentId,
            childCommentId :childCommentId.childCommentId
        }
        await dispatch(__deleteHelpReplyComment(deleteReplyComments))
        await dispatch(__getHelp())
        
    }

    const onClickUpdateReplyComment = async() =>{
        const reviseReplyComments = {
            articleId: Number(id),
            commentId: commentId,
            childCommentId :childCommentId.childCommentId, 
            content: replyComment
        }
        await dispatch(__updateHelpReplyComment(reviseReplyComments))
        await dispatch(__getHelp())
        setReviseReplyComment(!reviseReplyComment)
    }




    return (
        <div>
             <StReplyCommentBox>
                <StCommentImgDiv>
                    <StCommentImg src={childComment && childComment.userImage}></StCommentImg>
                </StCommentImgDiv>
                    <StCommentReplytxt>
                            {!reviseReplyComment ? 
                            <>
                            <div>{childComment && childComment.username}</div>
                            <div>{childComment&& childComment.content}</div>
                            </>
                            :
                            <StReviseBox>
                            <Input value={replyComment} onChange={onChangeReplyHandler} width="100%"/>
                            <StReviseButtonChange type="button" onClick={onClickUpdateReplyComment}>수정완료</StReviseButtonChange>
                            </StReviseBox>}
                    </StCommentReplytxt>
                
                <BiDotsVerticalRounded size="20px" style={{ position:"relative", cursor: "pointer", color: "#bebebe" }} onClick={onCilckShow}/>

                {showReplyComment ?
                    <StRevisebox>
                        <StReviseButton onClick={onClickRevice} type="button">수정</StReviseButton>
                        <StDeleteButton onClick={onClickDeleteReplyComment} type="button">삭제</StDeleteButton>
                    </StRevisebox>
                    : null}
            </StReplyCommentBox>
        </div>
    );
};

export default HelpDetailReplyComment;


const StReplyCommentBox = styled.div`
    display: flex;
    align-items: center;
    margin-top:6px;
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
const StCommentReplytxt = styled.div`
    font-size:13px;
    width:100%;
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
    font-size:12px;
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
    font-size:12px;
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
    width:50px;
    background-color:white;
    font-size:10px;
    /* border:none; */
    border:1px solid gray;
    cursor:pointer;
    border-radius: 10px;
    height:25px;
    color:gray;
`
const StReviseBox = styled.div`
    display: flex;
    
`