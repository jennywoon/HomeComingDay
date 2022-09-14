import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { __getMyPage, __getMyArticle } from '../../redux/modules/MyPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyPageCard = ({ myarticle,id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(__getMyArticle())
    }, [dispatch])

    const onClickNavi = () => {
        if(myarticle.articleFlag === "도움요청"){
            navigate(`/helpdetail/${id}`)
        }else if(myarticle.articleFlag === "정보공유"){
            navigate(`/informationdetail/${id}`)
        }else if(myarticle.articleFlag === "만남일정"){
            navigate(`/calendardetail/${id}`)
        }else if(myarticle.articleFlag === "자유토크"){
            navigate(`/freetalkdetail/${id}`)
        }};

    return (
        <>
            <Container onClick={onClickNavi}>
                <TotalWrap>
                    <PostTitle>{myarticle.title}</PostTitle>
                    <BottomWrap>
                        <FirstWrap>
                            <PostView>조회수 {myarticle.views}</PostView>
                            <div>|</div>
                            <CommentCount>댓글 {myarticle.commentCnt}</CommentCount>
                            <div>|</div>
                            <PostTime>{myarticle.createdAt}</PostTime>
                        </FirstWrap>
                        <BoardName>
                            <div>{myarticle.articleFlag}</div>
                        </BoardName>
                    </BottomWrap>
                </TotalWrap>
            </Container>
        </>
    );
};

export default MyPageCard;

const Container = styled.div`
    width: 100%;
    /* height: 100%; */
    height: 120px;
    border: 1px solid #ddd;
    border-radius: 16px;
    cursor: pointer;
    margin-bottom: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
`;

const TotalWrap = styled.div`
    /* border: 1px solid blue; */
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const BottomWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const FirstWrap = styled.div`
    display: flex;
    gap: 10px;
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
`
const PostTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    height:45px;
    /* margin-bottom: 40px; */
`
const PostView = styled.div`
`
const CommentCount = styled.div`
`
const PostTime = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: #bebebe;
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
`