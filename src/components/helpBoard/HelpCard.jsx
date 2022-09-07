import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsQuestionSquare } from "react-icons/bs";
import { __getHelp } from '../../redux/modules/HelpSlice';
import { useNavigate } from 'react-router-dom';

const HelpCard = ({ help , id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        dispatch(__getHelp());
    }, [dispatch])

    const onClickNavi = () =>{
        navigate(`/helpdetail/${id}`)
    }
   
    return (
        <HelpContainer onClick={onClickNavi}>
            <CardHead>
                <HeadImg>
                    <BsQuestionSquare />
                </HeadImg>
                <HeadName>{help.username}</HeadName>
                <HeadStudent>{help.admission}</HeadStudent>
                <HeadTime>{help.createdAt}</HeadTime>
            </CardHead>
            <CardBody>
                <BodyTitle>{help.title}</BodyTitle>
                {/* <BodyContent>
                    {help.content}
                </BodyContent> */}
            </CardBody>
            <CardFooter>
                <Views>조회수 {help.views}</Views>
                <CommentCount>댓글 {help.commentCnt}</CommentCount>
            </CardFooter>
        </HelpContainer>
    );
};

export default HelpCard;

const HelpContainer = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CardHead = styled.div`
    display: flex;
    align-items: center;
`
const HeadImg = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6bd60;
    border-radius: 50%;
`
const HeadName = styled.h2`
    font-size: 18px;
    margin: 0px 5px;
`
const HeadStudent = styled.p`
    font-size: 12px;
    color:gray;
`
const HeadTime = styled.p`
    font-size: 12px;
    color:gray;
    margin-left: auto;
`
const CardBody = styled.div`
`
const BodyTitle = styled.div`
    margin: 5px 0px;
    font-size: 16px;
`
const BodyContent = styled.div`
    font-size: 12px;
    margin: 5px 0px;
`
const CardFooter = styled.div`
    display: flex;
    justify-content: end;
`
const Views = styled.div`
    font-size: 12px;
    color:gray;
    margin-right:10px;
`
const CommentCount = styled.div`
    font-size: 12px;
    color:gray;
`