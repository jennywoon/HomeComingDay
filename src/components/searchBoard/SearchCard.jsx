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
    if(search.articleFlag === "도움요청"){
        navigate(`/helpdetail/${id}`)
    }else if(search.articleFlag === "정보공유"){
        navigate(`/informationdetail/${id}`)
    }else if(search.articleFlag === "만남일정"){
        navigate(`/calendardetail/${id}`)
    }else if(search.articleFlag === "자유토크"){
        navigate(`/freetalkdetail/${id}`)
    }};


    return (
        <HelpContainer onClick={onClickNavi}>
            <CardHead>
                <HeadImg>
                    <UserImg src={search.userImage}></UserImg>
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
                <FooterTxt>
                    <Views>조회수 {search.views}</Views>
                    <CommentCount>댓글 {search.commentCnt}</CommentCount>
                </FooterTxt>
                <BoardName>
                    <div>{search.articleFlag}</div>
                </BoardName>
            </CardFooter>
        </HelpContainer>
    );
};

export default SearchCard;

const HelpContainer = styled.div`
  padding: 10px;
  height:152px;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
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
    margin-right: 7px;
`
const UserImg =styled.img`
    width: 30px;
    height: 30px;
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
    font-size: 14px;
    font-weight: 600;
    color: #000;
    /* margin: 0px 5px; */
`
const HeadStudent = styled.p`

`
const HeadTime = styled.p`
    font-size: 12px;
    color:gray;
    margin-left: auto;
    font-weight: 500;
`
const CardBody = styled.div`
`
const BodyTitle = styled.div`
    display:flex;
    width:350px;
    height:60px;
    font-weight: 600;
    font-size: 16px;
    align-items:center;
`
const BodyContent = styled.div`
    font-size: 12px;
    margin: 5px 0px;
`
const CardFooter = styled.div`
    display: flex;
    height: 20px;
    
`
const FooterTxt =styled.div`
    display: flex;
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
const BoardName = styled.div`
    width: 60px;
    background-color: #f7931e;
    color: white;
    font-size: 12px;
    font-weight: 500;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
`