import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import HelpDetailComment from './HelpDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteHelp, __updateHelp, __getHelp, __getComments, __getHelpComment, __postHelpComment } from '../../redux/modules/HelpSlice';
import Layout from '../Layout';
import SearchLayout from '../SearchLayout';
import { useRef } from 'react';

const HelpDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { helps } = useSelector((state) => state.helps)
    const { helpcomments } = useSelector((state) => state.helps)
    
    const { id } = useParams();
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const modalRef = useRef(null);
    
    const onChangePostHandler = (e) => {
        setComment(e.target.value)
    }

    const helpsfind = helps.find((help) => help.id === Number(id))

    console.log(helpcomments)
    console.log(helpsfind)
    useEffect(() => {
        dispatch(__getHelp());
        dispatch(__getHelpComment())
    }, [dispatch])

    // console.log("helps", helps , "helpsfind" , helpsfind)

    const onCilckShow = () => {
        setShow(!show)
    }


    const onClickDelete = () => {
        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
            dispatch(__deleteHelp(id))
            navigate("/")
        } else {
            return null
        }
    }

    const onClickRevice = () => {
        navigate(`/helpupdate/${id}`)
    }

    const onClickPostComment = (e) => {
        const newcomment = {
            comment: comment,
            articleid: id
        }
        dispatch(__postHelpComment(newcomment));
        setComment("");
    }

    

    const closeModal = (e) => {
        if (!modalRef.current.contains(e.target)) {
            setShow(false);
        }
    };


    return (
        <SearchLayout >
            <DetailWrap onClick={closeModal}>
                <FirstWrap>
                    <DetailHeader>
                        <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate(-1) }} />
                        <HeaderTitle>도움요청</HeaderTitle>
                        <div></div>
                    </DetailHeader>
                </FirstWrap>
                <DetailBody>
                    <Bodytop>
                        <Bodyimg src={Img} alt="" />
                        <Bodytxt>
                            <Txtname>최형용</Txtname>
                            <Txtstudent>14학번 <span> 15분 전 </span></Txtstudent>
                        </Bodytxt>
                        <AiOutlineMenu size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
                            onClick={onCilckShow} />

                        {show ?
                            <Revisebox ref={modalRef}>
                                <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                                <DeleteButton onClick={onClickDelete}>삭제</DeleteButton>
                            </Revisebox>
                            : null
                        }

                    </Bodytop>
                    <BodyContent>
                        <ContentTitle>{helpsfind && helpsfind.title}</ContentTitle>
                        <ContentBody>{helpsfind && helpsfind.content}</ContentBody>
                        <ContentImg src={helpsfind && helpsfind.imageList[0]}></ContentImg>
                        <ContentView>조회수 1000회 | 댓글 100개</ContentView>
                    </BodyContent>

                    <BodyCommentBox>

                        
                        {helpcomments && helpcomments.map((comment) => (
                           Number(comment.articleid) === helpsfind.id ? <HelpDetailComment key={comment.id} comment={comment} helpsfind={helpsfind} modalRef={modalRef} /> : null
                        ))}

                        <CommentContainer>
                            <CommentBox>
                                <CommentDiv>
                                    <CommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></CommentPost>
                                    <CommentButton type="button" onClick={onClickPostComment}>올리기</CommentButton>
                                </CommentDiv>
                            </CommentBox>
                        </CommentContainer>
                    </BodyCommentBox>
                </DetailBody>
            </DetailWrap>
        </SearchLayout>
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

const StLayout = styled.div`
    height: 100%;
    border: 1px solid green;
`
const DetailWrap = styled.form`
  /* width: 500px; */
  width: 100%;
  /* height:100%; */
  /* overflow-y: scroll; */
  background-color: white;
  display: flex;
  flex-direction: column;
  /* position: sticky; */
`;

const FirstWrap = styled.div`
    display: flex;
    flex-direction: column;
    border:1px solid blue;
    height: 100%;
`
const DetailHeader = styled.div`
    /* width: 100%; */
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HeaderTitle = styled.div`
  font-weight: 800;
  /* margin:10px auto; */
`;
const Revisebox = styled.div`
    border: 1px solid #f1f0f0;
    border-radius: 10px;
    position: absolute;
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


const DetailBody = styled.div`
    border: 1px solid #f1f0f0;
    border: 1px solid red;
    /* margin: 10px 20px; */
    border-radius: 20px;
    /* height:100vh; */
    box-sizing: border-box;
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
    /* overflow: scroll; */
    width: 100%;
`

const Bodytop = styled.div`
    display:flex;
    align-items: center;
    padding:20px 20px 10px 20px;
    position: relative;

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
const BodyContent = styled.div`
    padding: 0px 20px;
`
const ContentTitle = styled.h3`
    margin:10px 0px;
`
const ContentBody = styled.p`
    color:gray;
`
const ContentImg = styled.img`
    /* border:1px solid gray; */
    height: 200px;
    border-radius: 20px;
    margin : 20px 0px;
    /* background-repeat: no-repeat;
    background-size: cover; */
`
const ContentView = styled.p`
    font-size: 14px;
    margin:30px 0px 10px;
    color: gray;
`
const BodyCommentBox = styled.div`
    border-top : 1px solid rgba(0,0,0,0.1);
    margin:20px;
    /* overflow-y: scroll; */
    /* height: 100%; */
    /* position:relative; */
    height: 70%;
`

const CommentContainer = styled.div`
    position: fixed;
    bottom: 0;
    /* bottom: 10px; */
    width:100%;
    max-width:500px;
    display: flex;
`

const CommentBox = styled.div`
    display: flex;
    align-items: center;
    height:40px;
`

const CommentDiv = styled.div`
    width : 400px;
    padding: 10px;
    background-color: #eeeeee;
    border-radius: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
`

const CommentPost = styled.input`
    width:80%;
    bottom : 0;
    background-color: #eeeeee;
    height: 30px;
    border-radius: 10px;
    border: none;
`
const CommentButton = styled.button`
    border: none;
    cursor: pointer;
`
