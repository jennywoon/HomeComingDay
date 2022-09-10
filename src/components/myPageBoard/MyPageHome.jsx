import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import MyPageUser from './MyPageUser';
import MyPageCard from './MyPageCard';
import { __getMyArticle } from '../../redux/modules/MyPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import nonedatasquare from "../../assets/nonedatasquare.png"
import { useInView } from 'react-intersection-observer';
import { useCallback } from 'react';
import axios from 'axios';

const MyPageHome = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const myarticles = useSelector((state) => state.mypages.myarticles)
    console.log(myarticles)

    useEffect(() => {
        dispatch(__getMyArticle())
    }, [dispatch])

    // 무한 스크롤

    return (
        <HomeContainer>
            <MyPageTop>
                <MyPageUser />
            </MyPageTop>
            <MyPageBottom>
                <BottomWrap>
                    <TitleWrap>
                        <MyPostTitle>내가 쓴 게시글</MyPostTitle>
                        <PostCount>
                            {myarticles && myarticles.length}
                        </PostCount>
                    </TitleWrap>
                    <ArticleWrap>
                        { myarticles && myarticles.length > 0 ? (
                            <div>
                                {myarticles && myarticles.slice(0).reverse().map((myarticle) => (
                                    <MyPageCard key={myarticle.articleId} id={myarticle.articleId} myarticle={myarticle} />
                                ))}
                            </div>
                        ) : (
                            <NoneData>
                                <NoneDataImg/>
                                <p>내가 쓴 게시글이 없습니다</p>
                            </NoneData>
                        )}
                    </ArticleWrap>
                </BottomWrap>
            </MyPageBottom>
            <SecondWrap>
                <Bottom>
                    <Tap onClick={() => { navigate("/") }}
                        style={{ paddingLeft: "20px" }}
                    >
                        <AiOutlineHome size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>HOME</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/search") }}>
                        <BiSearch size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>SEARCH</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/chat") }}>
                        <HiOutlineChatAlt2 size="23" color="#696969" />
                        <TapTitle style={{ color: "#696969" }}>CHAT</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: "20px", color: "#f7931e" }}
                        onClick={() => { navigate("/mypage") }}
                    >
                        <FiUser size="23" />
                        <TapTitle style={{ fontWeight: "bold" }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
        </HomeContainer>
    );
};

export default MyPageHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const MyPageTop = styled.div`
    width: 100%;
    /* height: 200px; */
    height: 22%;
    display: flex;
    justify-content: center; 
    align-items: center;
    background-color: #f7931e;
    /* border: 1px solid red; */
`

const MyPageBottom = styled.div`
    width: 100%;
    /* height: 100%; */
    height: 78%;
    display: flex;
    justify-content: center;
    /* border: 1px solid blue; */
`
const ArticleWrap = styled.div`
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`
const BottomWrap = styled.div`
    width: 90%;
    height: 100%;
`
const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin: 20px 0 15px 0;
    gap: 10px;
`
const NoneData = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #b3b3b3;
    font-weight: 500;
    font-size: 16px;
`

const NoneDataImg = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${nonedatasquare});
    background-position: center;
    background-size: 100% 100%;
`

const MyPostTitle = styled.div`
    color: #bebebe;
`

const PostCount = styled.div`
    color: #f7931e;
`
const SecondWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #ffffff;
    bottom:0;
`
const Bottom = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Tap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const TapTitle = styled.div`
    font-size: 12px;
`