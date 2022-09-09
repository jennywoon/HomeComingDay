import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { __getMyPage, __getMyArticle } from '../../redux/modules/MyPageSlice';
import { useDispatch, useSelector } from 'react-redux';

const MyPageCard = ({ myarticle }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(__getMyArticle())
    }, [dispatch])

    return (
        <>
            <BoardName>
                <div>{myarticle.articleFlag}</div>
            </BoardName>
            <Container>
                <TotalWrap>
                    <PostTitle>{myarticle.title}</PostTitle>
                    <BottomWrap>
                        <FirstWrap>
                            <PostView>조회수 {myarticle.views}</PostView>
                            <div>|</div>
                            <CommentCount>댓글 {myarticle.commentCnt}</CommentCount>
                        </FirstWrap>
                        {/* <BoardName>
                        <div>{myarticle.articleFlag}</div>
                    </BoardName> */}
                        <PostTime>{myarticle.createdAt}</PostTime>
                    </BottomWrap>
                </TotalWrap>
            </Container>
        </>
    );
};

export default MyPageCard;

const Container = styled.div`
    width: 100%;
    /* height: 120px; */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
`;

const TotalWrap = styled.div`
    /* border: 1px solid red; */
    width: 95%;
    height: 100%;
`

const BottomWrap = styled.div`
    display: flex;
    justify-content: space-between;
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
    margin-bottom: 10px;
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