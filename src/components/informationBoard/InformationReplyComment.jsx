import React from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from 'react';
import Input from "../elements/Input";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InformationReplyCommentDeleteModal from './InformationReplyCommentDeleteModal';
import { __deleteInfoReplyComment, __getInformation ,__updateInfoReplyComment} from '../../redux/modules/InformationSlice';

const InformationReplyComment = ({childCommentList,commentId,childComment, ids}) => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const [showReplyComment,setShowReplyComment] = useState(false)
    const [reviseReplyComment,setReviseReplyComment] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [editReplyComment , setEditReplyComment] = useState("")
    const [replyTargetId,setReplyTargetId] = useState(null);
    const childCommentId = childCommentList.find((comment)=> comment.childCommentId === childComment.childCommentId)

    // console.log("childCommentList",childCommentList)
    // console.log("childCommentId",childCommentId)

    const closeModal = () => {
        setModalOpen(false);
      };

    //모달
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }


    //대댓글수정하기 텍스트핸들러
    const onChangeReplyHandler = (e) =>{
        setEditReplyComment(e.target.value)
    }

    //수정,삭제 모달 토글
    const onCilckShow = (e) => {
        setReplyTargetId(e.target.parentElement.id)
        setShowReplyComment(!showReplyComment)
    }

    //수정하기 토글
    const onClickRevice = () => {
        setReviseReplyComment(!reviseReplyComment)
        setShowReplyComment(!showReplyComment)
    }


    const onClickDeleteReplyComment = async() =>{
        const deleteReplyComments = {
            articleId: Number(id),
            commentId: commentId,
            childCommentId : replyTargetId
        }
        await dispatch(__deleteInfoReplyComment(deleteReplyComments))
        await dispatch(__getInformation())
        
    }

    //대댓글 수정하기
    const onClickUpdateReplyComment = async() =>{
        const reviseReplyComments = {
            articleId: Number(id),
            commentId: commentId,
            childCommentId :replyTargetId,
            content: editReplyComment
        }
        await dispatch(__updateInfoReplyComment(reviseReplyComments))
        await dispatch(__getInformation())
        setReviseReplyComment(!reviseReplyComment)
    }




    return (
        <div>
             <StReplyCommentBox id={ids}>
             {modalOpen && <InformationReplyCommentDeleteModal setModalOpen={setModalOpen} onClickDeleteReplyComment={onClickDeleteReplyComment}/>}
             
                <StCommentImgDiv>
                    <StCommentImg src={childComment && childComment.userImage}></StCommentImg>
                </StCommentImgDiv>
                    <StCommentReplytxt >
                            {!reviseReplyComment ? 
                            <>
                            <StReplyUserName>{childComment && childComment.username} <StUserInfo>{childComment && childComment.admission} · {childComment && childComment.departmentName}</StUserInfo></StReplyUserName>
                            <StReplyContent>{childComment&& childComment.content}</StReplyContent>
                            <StReplyTime>{childComment&& childComment.createdAt}</StReplyTime>
                            </>
                            :
                            <StReviseBox>
                            <Input value={editReplyComment} onChange={onChangeReplyHandler} borderBottom="1px solid #ccc" width="100%"/>
                            <StReviseButtonChange type="button" onClick={onClickUpdateReplyComment}>수정완료</StReviseButtonChange>
                            </StReviseBox>}
                    </StCommentReplytxt>
                
                <BiDotsVerticalRounded size="20px" style={{ cursor: "pointer", color: "#bebebe" , position:"relative"}} onClick={onCilckShow}/>

                {showReplyComment ?
                    <StRevisebox>
                        <StReviseButton onClick={onClickRevice} type="button">수정</StReviseButton>
                        <StDeleteButton onClick={showModal} type="button">삭제</StDeleteButton>
                    </StRevisebox>
                    : null}
                

            </StReplyCommentBox>
        </div>
    );
};

export default InformationReplyComment;

const StReplyCommentBox = styled.div`
    display: flex;
    position:relative;
    align-items: flex-start;
    margin-top:6px;
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
    top:25px;
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
// const StReplyInput = styled.input`
//     border
//     border-bottom: 1px solid #ccc;
//     width:100%;
// `

const StReplyUserName = styled.div`
    font-weight: bold;
    display:flex;
    align-items: center;
    width:100%;
`
const StUserInfo = styled.div`
    font-size: 10px;
    color:#bebebe;
    margin-left:5px;
    
`
const StReplyContent = styled.div`

`
const StReplyTime = styled.div`
     font-size: 10px;
    color:#bebebe;
`
