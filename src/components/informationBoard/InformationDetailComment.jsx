import React from 'react';
import styled from 'styled-components';
import {AiOutlineMenu} from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"

const InformationComment = () => {
    return (
        <CommentContain>
        <CommentBox>
            <CommentImg src={Img} alt="" />
            <CommentTxt>
                <TxtName>최형용</TxtName>
                <TxtStudent>14학번 <span> 15분 전 </span></TxtStudent>
            </CommentTxt>
            <AiOutlineMenu size="18px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }} />
        </CommentBox>
        <Comment>취업할수있겟냐</Comment>
        </CommentContain>
    );
};

export default InformationComment;


const CommentContain = styled.div`
    margin: 5px 0px;
`

const CommentBox = styled.div`
    display:flex;
    align-items: center;
    padding:20px 20px 0px 20px;
    margin-bottom: 10px;
`

const CommentImg = styled.img`
    width:30px;
`

const CommentTxt = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    
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