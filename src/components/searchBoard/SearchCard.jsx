import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { __getSearch } from '../../redux/modules/SearchSlice';
import { useNavigate } from 'react-router-dom';
import { BsQuestionSquare } from "react-icons/bs";

const SearchCard = ({search,id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     dispatch(__getSearch());
    // },[dispatch])

    const onClickNavi = () => {
        navigate(`/helpdetail/${id}`)
    }

    return (
        <HelpContainer onClick={onClickNavi}>
            <CardHead>
                <HeadImg>
                    <BsQuestionSquare />
                </HeadImg>
                <HeadUser>
                    <HeadTop>
                        <HeadName>{search.username}</HeadName>
                        <HeadTime>{search.createdAt}</HeadTime>
                    </HeadTop>
                    <HeadBottom>
                        <HeadDepartment>{search.departmentName}</HeadDepartment>
                        <HeadStudent>· {search.admission}</HeadStudent>
                    </HeadBottom>
                </HeadUser>
            </CardHead>
            <CardBody>
                <BodyTitle>{search.title}</BodyTitle>
                {/* <BodyContent>
                    {help.content}
                </BodyContent> */}
            </CardBody>
            <CardFooter>
                <Views>조회수 {search.views}</Views>
                <CommentCount>댓글 {search.commentCnt}</CommentCount>
            </CardFooter>
        </HelpContainer>
    );
};

export default SearchCard;

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

const HeadUser = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px 5px;
`
const HeadTop = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid red; */
`
const HeadBottom = styled.div`
    display: flex;
    font-size: 12px;
    color:gray;
    gap: 5px;
`
const HeadDepartment = styled.div``
const HeadName = styled.h2`
    font-size: 18px;
    /* margin: 0px 5px; */
`
const HeadStudent = styled.p`

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