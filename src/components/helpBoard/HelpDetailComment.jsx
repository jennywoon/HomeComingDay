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


const DetailComment = ({ comment, modalRef, helpsfind }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { commentId } = helpsfind.commentList.find((commentmap) => commentmap.commentId === comment.commentId)

    console.log("commentId", commentId)


    const [showComment, setShowComment] = useState(false)
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

    const onClickDelete = async () => {
        const commentDelete = {
            articleId: Number(id),
            commentId: commentId
        }
        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
            await dispatch(__deleteHelpComment(commentDelete))
            await dispatch(__getHelp());
            setShowComment(false)
        } else {
            return
        }
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
        await dispatch(__updateHelpComment(editcomment))
        await dispatch(__getHelp());
        setIsEdit(!isEdit)
    }




    return (

        <CommentContain >
            <CommentBox >
                <CommentImg src={Img} alt="" />
                <CommentTxt>
                    <TxtName>{comment.username}</TxtName>
                    <TxtStudent>{comment.admission} <span> {comment.createdAt}</span></TxtStudent>
                </CommentTxt>
                {/* <AiOutlineMenu size="18px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={onCilckShow}/> */}
                <BiDotsVerticalRounded
                    size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
                    onClick={onCilckShow} />
                {showComment ?
                    <Revisebox ref={modalRef}>
                        <ReviseButton onClick={onClickRevice} type="button">수정</ReviseButton>
                        <DeleteButton onClick={onClickDelete} type="button">삭제</DeleteButton>
                    </Revisebox>
                    : null}

            </CommentBox>

            {isEdit ?
                <EditBox>
                    <Input onChange={onChangeEdit} value={editComment} />
                    <ReviseButtonChange type="button" onClick={onClickReviceChange} >수정완료</ReviseButtonChange>
                </EditBox>
                :
                <Comment>{comment.content}</Comment>

            }
        </CommentContain>
    );
};

export default DetailComment;


const CommentContain = styled.div`
    margin: 5px 0px;

`

const CommentBox = styled.div`
    display:flex;
    align-items: center;
    padding:20px 20px 0px 20px;
    margin-bottom: 10px;
    position: relative;
`

const CommentImg = styled.img`
    width:30px;
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
    padding: 0px 20px;
`

const TxtName = styled.h3`
    margin: 0px;
    font-size:14px;
`
const TxtStudent = styled.p`
    margin: 0px;
    font-size: 10px;
    color: gray;
`

const Comment = styled.p`
    padding: 0px 20px;
    font-size:14px;
`
