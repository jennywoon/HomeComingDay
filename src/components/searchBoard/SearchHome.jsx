import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import { useNavigate } from "react-router-dom"
import SearchTest from './SearchTest';
import Homeimg from "../../assets/Home.png"
import SearchColorimg from "../../assets/SearchColor.png"
import Chatimg from "../../assets/Chat.png"
import Myimg from "../../assets/My.png"
import { __getSearch, __getSearchArticle, __getSearchArticlePopular, __postSearch } from "../../redux/modules/SearchSlice";
import { __getMyPage } from "../../redux/modules/MyPageSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchHome = () => {
    const navigate = useNavigate();
    const chatList = useSelector((state) => state.chat.chatList[0]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getMyPage())
    }, [dispatch])

    return (
        <HomeContainer>
            <Search />
            <SecondWrap>
                <Bottom>
                    <Tap onClick={() => { navigate("/main") }}
                        style={{ paddingLeft: "20px" }}
                    >
                        <img src={Homeimg} alt='홈' style={{ width: '45%', margin: '2px' }} />
                        <TapTitle style={{ color: "#8E8E8E" }}>홈</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/search") }}
                        style={{ color: "#f7931e" }}
                    >
                        <img src={SearchColorimg} alt='검색' style={{ width: '45%', margin: '2px' }} />
                        <TapTitle style={{ fontWeight: "bold" }}>검색</TapTitle>
                    </Tap>
                    <Tap onClick={() => { navigate("/chat") }}>
                        <StIconWrap>
                            <img src={Chatimg} alt='채팅' style={{ width: '45%', margin: '2px' }} />
                            {chatList && chatList.totalCnt > 0 ? (
                                <StNewDiv>
                                    <StNewTitle>N</StNewTitle>
                                </StNewDiv>
                            ) : null}
                        </StIconWrap>
                        <TapTitle style={{ color: "#8E8E8E" }}>채팅</TapTitle>
                    </Tap>
                    <Tap
                        style={{ paddingRight: "20px" }}
                        onClick={() => { navigate("/mypage") }}
                    >
                        <img src={Myimg} alt='마이페이지' style={{ width: '45%', margin: '2px' }} />
                        <TapTitle style={{ color: "#8E8E8E" }}>MY</TapTitle>
                    </Tap>
                </Bottom>
            </SecondWrap>
        </HomeContainer>
    );
};

export default SearchHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const SecondWrap = styled.div`
    width: 100%;
    position: sticky;
    background-color: #ffffff;
    bottom: 0;
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`
const Bottom = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
`
const StIconWrap = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: center;
  /* align-items: start; */
  position: relative;
`

const Tap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const StNewDiv = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 12px;
  position: absolute;
`;
const StNewTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: white;
`;

const TapTitle = styled.div`
    font-size: 11px;
    font-weight: 400;
`