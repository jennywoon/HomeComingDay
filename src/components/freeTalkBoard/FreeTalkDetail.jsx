import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import FreeTalkDetailComment from './FreeTalkDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteFreeTalk, __getFreeTalk, __getFreeComment, __postFreeComment } from '../../redux/modules/FreeTalkSlice';
import { useRef } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";

const FreeTalkDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { freetalks } = useSelector((state) => state.freetalks)
    const { freeComments } = useSelector((state) => state.freetalks)
    const { id } = useParams();
    // console.log(id)
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const modalRef = useRef(null);

    const onChangePostHandler = (e) => {
        setComment(e.target.value)
    }

    const freetalksfind = freetalks.find((freetalk) => freetalk.id === Number(id))

    useEffect(() => {
        dispatch(__getFreeTalk());
        dispatch(__getFreeComment());
    }, [dispatch])

    console.log("freetalks", freetalks, "freetalksfind", freetalksfind)

    const onCilckShow = () => {
        setShow(!show)
    }


    const onClickDelete = () => {
        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
            dispatch(__deleteFreeTalk(id))
            navigate("/")
        } else {
            return null
        }
    }

    const onClickRevice = () => {
        navigate(`/freetalkupdate/${id}`)
    }

    const onClickPostComment = (e) => {
        const newcomment = {
            comment: comment,
            articleid: id
        }
        dispatch(__postFreeComment(newcomment));
        setComment("");
    }
    const closeModal = (e) => {
        if (!modalRef.current.contains(e.target)) {
            setShow(false);
        }
    };


    return (
        <Container>
            <Header />
            <DetailContainer>
                <HelpWrap>
                    <DetailWrap onClick={closeModal}>
                        <FirstWrap>
                            <DetailHeader>
                                <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate("/freetalk") }} />
                                <HeaderTitle>자유토크</HeaderTitle>
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
                                {/* <AiOutlineMenu size="20px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }}
                                    onClick={onCilckShow} /> */}
                                <BiDotsVerticalRounded
                                    size="20px" style={{ marginLeft: "auto", cursor: "pointer" }}
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
                                <ContentTitle>{freetalksfind && freetalksfind.title}</ContentTitle>
                                <ContentBody>{freetalksfind && freetalksfind.content}</ContentBody>
                                <ContentImg src={freetalksfind && freetalksfind.imageList[0]}></ContentImg>
                                <ContentView>조회수 1000회 | 댓글 100개</ContentView>
                            </BodyContent>

                            <BodyCommentBox>
                                {/* 댓글맵돌리기  */}
                                {freeComments && freeComments.map((comment) => (
                                    Number(comment.articleid) === freetalksfind.id ? <FreeTalkDetailComment key={comment.id} comment={comment} freetalksfind={freetalksfind} modalRef={modalRef} /> : null
                                ))}

                            </BodyCommentBox>

                        </DetailBody>
                    </DetailWrap>
                </HelpWrap>
                <CommentContainer>
                    <CommentBox>
                        <CommentDiv>
                            <CommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></CommentPost>
                            <CommentButton type="button" onClick={onClickPostComment}>올리기</CommentButton>
                        </CommentDiv>
                    </CommentBox>
                </CommentContainer>
            </DetailContainer>
        </Container>
    );
};

export default FreeTalkDetail;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const DetailContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
`;

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
    /* border: 1px solid #f1f0f0;
    margin: 10px 20px;
    border-radius: 20px;
    height:100vh;
    box-sizing: border-box; */
    border-radius: 20px;
    width: 100%;
    height:100%;
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
    /* overflow: scroll; */
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
    width: 100%;
    height: 300px;
`
const ContentTitle = styled.h3`
    /* margin:10px 0px; */
`
const ContentBody = styled.p`
    color:gray;
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
`
const BodyCommentBox = styled.div`
    border-top : 1px solid rgba(0,0,0,0.1);
    /* margin:20px;
    position:relative; */
    height: 100%;
    width: 100%;
`

const CommentContainer = styled.div`
    /* position: fixed;
    bottom: 0;
    width:100%;
    max-width:500px;
    display: flex; */
    position: sticky;
    bottom: 0;
    bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CommentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
`

const CommentDiv = styled.div`
    /* width : 400px; */
    width: 100%;
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
