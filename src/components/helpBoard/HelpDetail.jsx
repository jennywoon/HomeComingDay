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
import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { BiDotsVerticalRounded } from "react-icons/bi";

const HelpDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { helps } = useSelector((state) => state.helps)
    // const commentList = useSelector((state) => state.helps.helps)

    const { id } = useParams();
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const modalRef = useRef(null);

    const onChangePostHandler = (e) => {
        setComment(e.target.value)
    }

    const helpsfind = helps.find((help) => help.articleId === Number(id))
    const helpscomment = helpsfind.commentList
    // console.log(commentList)
    console.log("helpsfind",helpsfind)
    console.log("helpscomment",helpscomment)
    // useEffect(() => {
    //     dispatch(__getDetailHelp(helpsfind.articleId));
    // }, [dispatch])

    // console.log("helps", helps , "helpsfind" , helpsfind)

    const onCilckShow = () => {
        setShow(!show)
    }


    const onClickDelete = () => {
        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
            dispatch(__deleteHelp(helpsfind.articleId))
            navigate("/")
        }else {
            return
        }
    }

    const onClickRevice = () => {
        navigate(`/helpupdate/${id}`)
    }

    const onClickPostComment = (e) => {
        e.preventDefault();
        const newcomment = {
            content: comment,
            articleId: id
        }
        dispatch(__postHelpComment(newcomment));
        setComment("");
    }

    const closeModal = (e) => {
        if (!modalRef.current.contains(e.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        dispatch(__getHelp());
    }, [dispatch])

    const swiperStyle ={
        border:"1px solid red;"
    }

    return (
        <Container>
            <Header />
            <HelpContainer >
                <HelpWrap>
                    <DetailWrap onClick={closeModal}>
                        <FirstWrap>
                            <DetailHeader>
                                <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate("/") }} />
                                <HeaderTitle>도움요청</HeaderTitle>
                                <div style={{ width: "25px", height: "25px" }}></div>
                            </DetailHeader>
                        </FirstWrap>
                        <DetailBody>
                            <Bodytop>
                                <Bodyimg src={Img} alt="" />
                                <Bodytxt>
                                    <Txtname>{helpsfind && helpsfind.username}</Txtname>
                                    <Txtstudent>{helpsfind && helpsfind.admission} <span> {helpsfind && helpsfind.createAt} </span></Txtstudent>
                                </Bodytxt>
                                {/* <AiOutlineMenu size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
                                    onClick={onCilckShow} /> */}
                                <BiDotsVerticalRounded
                                size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
                                onClick={onCilckShow}/>
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
                                <ContentImgBox>
                                <Swiper
                                    style={swiperStyle}
                                    className='banner'
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                >
                                    {helpsfind && helpsfind.imageList.map((image)=> {
                                    return(
                                    <SwiperSlide key={image.id}>
                                    <ContentImg  src={image.imgUrl}></ContentImg>
                                    </SwiperSlide>)
                                    })}
                                </Swiper>
                                </ContentImgBox>
                                <ContentView>조회수 1000회 | 댓글 100개</ContentView>
                            </BodyContent>
                            <BodyContainer>
                                <BodyCommentBox>
                                    {helpsfind && helpsfind.commentList.map((comment) => (
                                        // comment.commentId === helpsfind. ? 
                                        <HelpDetailComment key={comment.commentId} comment={comment} helpsfind={helpsfind} modalRef={modalRef} />
                                        //  : null
                                    ))}
                                </BodyCommentBox>
                            </BodyContainer>
                        </DetailBody>
                    </DetailWrap>
                </HelpWrap>
                <CommentContainer onSubmit={onClickPostComment}>
                    <CommentBox>
                        <CommentDiv>
                            <CommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></CommentPost>
                            <CommentButton type="submit" >올리기</CommentButton>
                        </CommentDiv>
                    </CommentBox>
                </CommentContainer>
            </HelpContainer>
        </Container>
    );
};

export default HelpDetail;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const HelpContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
`

const HelpWrap = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid blue; */
    overflow-y: scroll;
`
const DetailWrap = styled.form`
  width: 100%;
  /* height:100%; */
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const FirstWrap = styled.div`
    display: flex;
    flex-direction: column;
    /* border:1px solid blue; */
    width: 100%;
    height: 100%;
`
const DetailHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
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
    /* border: 1px solid #f1f0f0; */
    /* border: 1px solid red; */
    /* margin: 10px 20px; */
    border-radius: 20px;
    width: 100%;
    height:100%;
    /* box-sizing: border-box; */
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
    /* overflow-y: scroll; */
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
    /* margin: 0px; */
`
const Txtstudent = styled.p`
    /* margin: 0px; */
    font-size: 12px;
    color: gray;
`
const BodyContent = styled.div`
    padding: 0px 20px;
    /* border: 1px solid red; */
    width: 100%;
    height: 300px;
`
const ContentTitle = styled.h3`
    /* margin:10px 0px; */
`
const ContentBody = styled.p`
/* border: 1px solid blue; */
    color:gray;
`

const ContentImgBox = styled.div`
    width:100%;
    
`
const ContentImg = styled.img`
    /* border:1px solid gray; */
    height: 200px;
    border-radius: 20px;
    /* margin : 20px 0px; */
    /* background-repeat: no-repeat;
    background-size: cover; */
`
const ContentView = styled.p`
    font-size: 14px;
    /* margin:30px 0px 10px; */
    color: gray;
    /* border: 1px solid blue; */
    
`

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    /* overflow-y: scroll; */
`
const BodyCommentBox = styled.div`
    border-top : 1px solid rgba(0,0,0,0.1);
    /* margin:20px; */
    /* overflow-y: scroll; */
    height: 100%;
    width: 100%;
    /* position:relative; */
    /* height: 70%; */
    /* border: 1px solid orangered; */
`

const CommentContainer = styled.form`
    position: sticky;
    bottom: 0;
    bottom: 10px;
    width: 100%;
    /* height: 100%; */
    /* border: 1px solid blue; */
    /* max-width:500px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CommentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 60px; */
    width: 95%;
    /* border: 1px solid red; */
`

const CommentDiv = styled.div`
    /* width : 370px; */
    width: 100%;
    /* height: 50px; */
    padding: 10px;
    background-color: #eeeeee;
    border-radius: 16px;
    display: flex;
    align-items: center;
    /* margin-bottom: 20px; */
    justify-content: space-between;
`

const CommentPost = styled.input`
    width:80%;
    /* width: 100%; */
    /* bottom : 0; */
    background-color: #eeeeee;
    height: 30px;
    border-radius: 10px;
    border: none;
`
const CommentButton = styled.button`
    border: none;
    cursor: pointer;
`
