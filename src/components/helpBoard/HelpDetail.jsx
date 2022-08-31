import React from 'react';
import Header from '../Header';
import styled from 'styled-components';
import {IoIosArrowBack} from 'react-icons/io'
import {AiOutlineMenu} from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import Help from "../../assets/help.png"
import Button from '../elements/Button';
import DetailComment from './DetailComment';

const HelpDetail = () => {
    return (
        <DetailContainer>
            <DetailWrap>
                <Header />
                <DetailHeader>
                    <IoIosArrowBack size="25px" cursor="pointer"/>
                    <HeaderTitle>도움요청</HeaderTitle>
                </DetailHeader>
                <DetailBody>
                    <Bodytop>
                        <Bodyimg src={Img} alt="" />
                        <Bodytxt>
                            <Txtname>최형용</Txtname>
                            <Txtstudent>14학번 <span> 15분 전 </span></Txtstudent>
                        </Bodytxt>
                        <AiOutlineMenu size="20px" cursor="pointer" style={{marginLeft : "auto" , cursor : "pointer"}}  />
                    </Bodytop>
                    <BodyContent>
                        <ContentTitle>선배님 항해99나와서 취업할수 있을까요?</ContentTitle>
                        <ContentBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, odit consectetur architecto cupiditate illum maxime et, quis delectus repudiandae atque nesciunt earum dolor numquam facere harum dolorum totam quas neque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, odit consectetur architecto cupiditate illum maxime et, quis delectus repudiandae atque nesciunt earum dolor numquam facere harum dolorum totam quas neque?</ContentBody>
                        <ContentImg></ContentImg>
                        <ContentView>조회수 1000회 | 댓글 100개</ContentView>
                    </BodyContent>
                    <BodyCommentBox>
                        <DetailComment /> {/* 댓글맵돌리기  */}
                        <DetailComment />
                        <CommentContail>
                            <CommentBox>
                                <CommentPost placeholder='댓글을 입력해주세요'></CommentPost>
                                <CommentButton backgroundColor="white">올리기</CommentButton>
                            </CommentBox>
                        </CommentContail>
                    </BodyCommentBox>
                    
                </DetailBody>
            </DetailWrap>
        </DetailContainer>
    );
};

export default HelpDetail;


const DetailContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const DetailWrap = styled.form`
  width: 500px;
  height:100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const DetailHeader = styled.div`
    display: flex;
    align-items: center;
    padding:10px;
    
`
const HeaderTitle = styled.h3`
    margin:10px auto;
`

const DetailBody = styled.div`
    border: 1px solid #f1f0f0;
    margin: 10px 20px;
    border-radius: 20px;
    height:100vh;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05);
    overflow: scroll;
`

const Bodytop = styled.div`
    display:flex;
    align-items: center;
    padding:20px 20px 10px 20px;
`

const Bodyimg = styled.img`
    width:40px;
`

const Bodytxt = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    
`   
const Txtname = styled.h3`
    margin: 0px;
`
const Txtstudent = styled.p`
    margin: 0px;
    font-size: 12px;
    color: gray;
`
const BodyContent =styled.div`
    padding: 0px 20px;
`
const ContentTitle = styled.h3`
    
`
const ContentBody = styled.p`
    color:gray;
`
const ContentImg = styled.div`
    /* border:1px solid gray; */
    height: 200px;
    border-radius: 20px;
    margin : 20px 0px;
    background-image: url(${Help});
    background-repeat: no-repeat;
    background-size: cover;
`
const ContentView = styled.p`
    font-size: 14px;
    margin:30px 0px 10px;
    color: gray;
`
const BodyCommentBox = styled.div`
    border-top : 1px solid rgba(0,0,0,0.1);
    margin:20px;
    position:relative;
`

const CommentContail = styled.div`
    position: fixed;
    bottom: 10px;
    width:100%;
    max-width:500px;
    
`

const CommentBox = styled.div`
    display: flex;
    align-items: center;
    height:40px;
    width:100%;
`

const CommentPost = styled.input`
    /* position: fixed; */
    width:100%;
    /* height:30px; */
    /* margin:20px; */
    bottom : 0;
    padding:10px;
    background-color: #eeeeee;
    border-radius: 10px;
    border : 1px solid rgba(0,0,0,0.1);

`
const CommentButton = styled.button`
    
`