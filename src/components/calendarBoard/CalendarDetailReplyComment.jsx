import React , { useRef ,useEffect }from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from 'react';
import Input from "../elements/Input";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GrUploadOption } from "react-icons/gr";
import { __getCalendar ,__deleteCalendarReplyComment, __updateCalendarReplyComment, __getDetailCalendar} from '../../redux/modules/CalendarSlice';
import CalendarReplyCommentDeleteModal from './CalendarReplyCommentDeleteModal';
import dots from "../../assets/dots.png"

const CalendarDetailReplyComment = ({childCommentList,commentId,childComment, ids ,data}) => {
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

    //모달닫기
    const node = useRef();

    useEffect(() => {
        const clickOutside = (e) => {
        // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
        if (showReplyComment && node.current && !node.current.contains(e.target)) {
            setShowReplyComment(false);
        }
    };
        document.addEventListener("mousedown", clickOutside);
        return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", clickOutside);
        };
    }, [showReplyComment]);

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
        await dispatch(__deleteCalendarReplyComment(deleteReplyComments))
        await dispatch(__getDetailCalendar(id))
        
    }

    //대댓글 수정하기
    const onClickUpdateReplyComment = async() =>{
        const reviseReplyComments = {
            articleId: Number(id),
            commentId: commentId,
            childCommentId :replyTargetId,
            content: editReplyComment
        }
        await dispatch(__updateCalendarReplyComment(reviseReplyComments))
        setReviseReplyComment(!reviseReplyComment)
        await dispatch(__getDetailCalendar(id))
    }

    return (
        <div>
             <StReplyCommentBox id={ids} ref={node}>
             {modalOpen && <CalendarReplyCommentDeleteModal setModalOpen={setModalOpen} onClickDeleteReplyComment={onClickDeleteReplyComment}/>}
             
                <StCommentImgDiv>
                    <StCommentImg src={childComment && childComment.userImage}></StCommentImg>
                </StCommentImgDiv>
                    <StCommentReplytxt >
                            {!reviseReplyComment ? 
                            <>
                            <StReplyUserName>{childComment && childComment.username} </StReplyUserName>
                            <StUserInfo>{childComment && childComment.admission} · {childComment && childComment.departmentName}</StUserInfo>
                            <StReplyContent>{childComment&& childComment.content}</StReplyContent>
                            <StReplyTime>{childComment&& childComment.createdAt}</StReplyTime>
                            </>
                            :
                            <StReviseBox>
                            <StReplyCommentInput value={editReplyComment} onChange={onChangeReplyHandler} borderBottom="1px solid #ccc" width="100%"/>
                            <StUploadBtn onClick={onClickUpdateReplyComment}></StUploadBtn>
                            </StReviseBox>}
                    </StCommentReplytxt>
                {childComment.username === data.username ?
                <StDots onClick={onCilckShow}/>
                : null}

                {showReplyComment ?
                    <StRevisebox ref={node}>
                        <StReviseButton onClick={onClickRevice} type="button">수정</StReviseButton>
                        <StDeleteButton onClick={showModal} type="button">삭제</StDeleteButton>
                    </StRevisebox>
                    : null}
                

            </StReplyCommentBox>
        </div>
    );
};

export default CalendarDetailReplyComment;

const StReplyCommentBox = styled.div`
    display: flex;
    position:relative;
    align-items: flex-start;
    margin-top:6px;
    width:100%;
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
    padding-left:5px;
`
const StReplyCommentInput = styled.textarea`
    width:100%;
    height: 25px;
  line-height: 25px;
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
    right:20px;    
    font-size: 18px;
    cursor:pointer;
    opacity: 0.5;
`

const StDots = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${dots});
  background-size: 100% 100%;
  background-position: center;
  margin-left: auto;
  cursor: pointer;
  position: relative;
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

const StReviseBox = styled.div`
    display: flex;
    align-items: center;
`

const StReplyUserName = styled.div`
    /* font-weight: bold; */
    display:flex;
    align-items: center;
    font-size:14px;
    width:100%;
    font-weight: 600;
`
const StUserInfo = styled.div`
    font-size: 12px;
    width:100%;
    color:#bebebe;
    
`
const StReplyContent = styled.div`
    font-size:14px;
    width:100%;
    word-break:break-all;
    margin: 5px 0;
    font-weight: 400;
`
const StReplyTime = styled.div`
     font-size: 12px;
    color:#bebebe;
`
