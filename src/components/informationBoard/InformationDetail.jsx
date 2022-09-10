import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import InformationDetailComment from './InformationDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteInformation, __getInfoComment, __getInformation, __postInfoComment, __postInformation, __updateInformation } from '../../redux/modules/InformationSlice';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormPrevious ,GrFormNext} from "react-icons/gr";

const InformationDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { informations } = useSelector((state) => state.informations)
    // const { infoComments } = useSelector((state) => state.informations)
    const { id } = useParams();

    const [show, setShow] = useState(false)
    const [showChaet, setShowChaet] = useState(false)
    const [comment, setComment] = useState("")
    const modalRef = useRef(null);

    const onChangePostHandler = (e) => {
        setComment(e.target.value)
    }

    const informationsfind = informations.find((info) => info.articleId === Number(id))

    // useEffect(() => {
    //     dispatch(__getInformation());
    //     dispatch(__getInfoComment());
    // }, [dispatch])

    console.log("information", informations , "informationsfind" , informationsfind)

    const onCilckShow = () => {
        setShow(!show)
    }
    const onCilckChaetShow = () => {
        setShowChaet(!showChaet)
    }


    const onClickDelete = () => {
        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
            dispatch(__deleteInformation(informationsfind.articleId))
            navigate("/information")
        } else {
            navigate("/information")
            return 
        }
    }

    const onClickRevice = () => {
        navigate(`/informationupdate/${id}`)
    }

    const onClickPostComment = async(e) => {
        e.preventDefault();
        const newcomment = {
            content: comment,
            articleId: id
        }
      await dispatch(__postInfoComment(newcomment));
      await dispatch(__getInformation());
        setComment("");
    }
    // const closeModal = (e) => {
    //     if (!modalRef.current.contains(e.target)) {
    //         setShow(false);
    //     }
    // };

    //swiper 옵션
    SwiperCore.use(Navigation);
    const [swiper , setSwiper] = useState(null)
    const [mainImageIndex , setMainImageIndex] = useState(0);
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    
    const swiperParams = {
        navigation : {prevEl : navigationPrevRef.current , nextEl: navigationNextRef.current},
         onBeforeInit : (swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.activeIndex = setMainImageIndex;
            swiper.navigation.update();
        },
        onSwiper : setSwiper,
        onSlideChange: (e) => setMainImageIndex(e.activeIndex)
    }

    return (
        <Container>
            <Header />
            <InformationContainer>
                <InformationWrap>
                    <DetailWrap >
                        <FirstWrap>
                            <DetailHeader>
                                <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate("/information") }} />
                                <HeaderTitle>정보공유</HeaderTitle>
                                <div style={{ width: "25px", height: "25px" }}></div>
                            </DetailHeader>
                        </FirstWrap>
                        <DetailBody>
                            <Bodytop>
                                <Bodyimg src={Img} alt="" />
                                <Bodytxt>
                                    <Txtname onClick={onCilckChaetShow}>{informationsfind && informationsfind.username}</Txtname>
                                    <Txtstudent>{informationsfind && informationsfind.departmentName} <span> {informationsfind && informationsfind.admission} </span></Txtstudent>
                                    {showChaet ?
                                    <ChaetingBox>1:1채팅</ChaetingBox>
                                    : null
                                    }
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
                                <ContentTitle>{informationsfind && informationsfind.title}</ContentTitle>
                                <ContentBody>{informationsfind && informationsfind.content}</ContentBody>
                                {informationsfind && informationsfind.imageList.length > 0 ?
                                <ContentImgBox>
                                <Swiper
                                    {...swiperParams}
                                    ref={setSwiper}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                >
                                    {informationsfind && informationsfind.imageList.map((image)=> {
                                    return(
                                    <SwiperSlide key={image.imageId}>
                                        <ContentImg  src={image.imgUrl}></ContentImg>
                                    </SwiperSlide>)
                                    })}
                                    <PrevButton ref={navigationPrevRef}>
                                        <PreviousBtn />
                                    </PrevButton>
                                    <NextButton ref={navigationNextRef}>
                                        <NextBtn />
                                    </NextButton>
                                </Swiper>
                                </ContentImgBox>
                                : null}
                                <BodyTxtBox>
                                <ContentView>조회수 1000회 | 댓글 100개</ContentView>
                                <ContentTime>15분전</ContentTime>
                                </BodyTxtBox>
                            </BodyContent>
                                
                            

                            <BodyContainer>

                                <BodyCommentBox>
                                {informationsfind && informationsfind.commentList.length === 0 ?
                                    <BodyComment>작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요 </BodyComment>
                                :
                                <>
                                {informationsfind && informationsfind.commentList.map((comment) => (
                                <InformationDetailComment key={comment.commentId} comment={comment} informationsfind={informationsfind} modalRef={modalRef} />
                                    ))}
                                </>
                                }
                                </BodyCommentBox>
                            </BodyContainer>
                        </DetailBody>
                    </DetailWrap>
                </InformationWrap>
                <CommentContainer onSubmit={onClickPostComment}>
                    <CommentBox>
                        <CommentDiv>
                            <CommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></CommentPost>
                            <CommentButton type="submit" >올리기</CommentButton>
                        </CommentDiv>
                    </CommentBox>
                </CommentContainer>
            </InformationContainer>
        </Container>
    );
};

export default InformationDetail;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const InformationContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
`

const InformationWrap = styled.div`
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
    z-index: 5;
    border-radius: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0;
    top:55px;
    background-color: #fff;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
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
    position:relative;
`

const Txtname = styled.h3`
    cursor:pointer;
    /* margin: 0px; */
`
const Txtstudent = styled.p`
    /* margin: 0px; */
    font-size: 12px;
    color: gray;
`
const ChaetingBox = styled.div`
    border: 1px solid #f1f0f0;
    border-radius: 16px;
    position: absolute;
    text-align: center;
    line-height: 30px;
    top:25px;
    z-index: 1;
    width:60px;
    height:30px;
    background-color: #fff;
    cursor:pointer;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`

const BodyContent = styled.div`
    padding: 0px 20px;
    /* border: 1px solid red; */
    width: 100%;
    
`
const ContentTitle = styled.h3`
    /* margin:10px 0px; */
    font-weight: 600;
    font-size: 18px;
    width:100%;
`
const ContentBody = styled.p`
/* border: 1px solid blue; */
    color:gray;
    font-size: 16px;
    font-weight: 400;
    width:100%;
    margin-bottom: 10px;
`

const ContentImgBox = styled.div`
    width:100%;
    height:250px;
    border-radius: 20px;
    position:relative;
`
const ContentImg = styled.img`
    /* border:1px solid gray; */
    width: 100%;
    height:250px;
    display:flex;
    border-radius: 20px;
    /* margin : 20px 0px; */
    /* background-repeat: no-repeat;
    background-size: cover; */
`
const PrevButton =styled.button`
    font-size: 20px;
    display: flex;
    position:absolute;
    border:none;
    border-radius: 20px;
    top:50%;
    left:0;
    z-index: 2;
    transform: translatey(-50%);
    
`
const NextButton =styled.button`
    font-size: 20px;
    display: flex;
    position:absolute;
    border:none;
    border-radius: 20px;
    top:50%;
    right:0;
    z-index: 2;
    transform: translatey(-50%);
`

const PreviousBtn = styled(GrFormPrevious)`
    
`
const NextBtn = styled(GrFormNext)`
   
`


const ContentView = styled.p`
    
    font-size: 14px;
    line-height: 40px;
    height:40px;
    /* margin:30px 0px 10px; */
    color: gray;
    /* border: 1px solid blue; */
    
`
const BodyTxtBox = styled.div`
    display: flex;
    width:100%;
    align-items: center;
`
const ContentTime = styled.div`
      color: gray;
      font-size: 14px;
      margin-left: auto;
      
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
const BodyComment = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color:#B3B3B3;
    height:100px;
    width:100%;
    text-align: center;
`
