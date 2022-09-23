import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import Img from "../../assets/naverIcon.png"
import FreeTalkDetailComment from './FreeTalkDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteFreeTalk, __getDetailFreeTalk, __getFreeTalk, __getFreeTalkComment, __postFreeTalkComment, __postFreeTalkHeart } from '../../redux/modules/FreeTalkSlice';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import FreeTalkDeleteModal from './FreeTalkDeleteModal';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';
import heartColorImg from '../../assets/heartColor.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';

const FreeTalkDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { freetalks } = useSelector((state) => state.freetalks)
    const data = useSelector((state) => state.mypages.mypages)
    // const { freeComments } = useSelector((state) => state.freetalks)
    const { id } = useParams();
    // console.log(id)
    const [show, setShow] = useState(false)
    const [showChaet, setShowChaet] = useState(false)
    const [comment, setComment] = useState("")
    const modalRef = useRef(null);

    const freetalksfind = freetalks.find((freetalk) => freetalk.articleId === Number(id))

    //모달닫기
  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (show && node.current && !node.current.contains(e.target)) {
        setShow(false);
      }
  };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [show]);


    // 댓글
    const onChangePostHandler = (e) => {
        setComment(e.target.value)
    }

    //조회수반영
    useEffect(() => {
        dispatch(__getMyPage())
        dispatch(__getFreeTalk())
        dispatch(__getDetailFreeTalk(id));
    }, [dispatch])


    const onCilckShow = () => {
        setShow(!show)
    }
    // 1:1 채팅버튼
    const onCilckChaetShow = () => {
        setShowChaet(!showChaet)
    }
    // 수정버튼
    const onClickRevice = () => {
        navigate(`/freetalkupdate/${id}`)
    }

    // const onClickDelete = () => {
    //     const result = window.confirm("정말 삭제하시겠습니까?")
    //     if (result) {
    //         dispatch(__deleteFreeTalk(freetalksfind.articleId))
    //         navigate("/freetalk")
    //     } else {
    //         navigate("/freetalk")
    //         return
    //     }
    // }

    const onClickPostComment = async (e) => {
        e.preventDefault();
        const newcomment = {
            content: comment,
            articleId: id
        }
        await dispatch(__postFreeTalkComment(newcomment));
        await dispatch(__getFreeTalk());
        setComment("");
    }
    // const closeModal = (e) => {
    //     if (!modalRef.current.contains(e.target)) {
    //         setShow(false);
    //     }
    // };

    //swiper 옵션
    SwiperCore.use(Navigation);
    const [swiper, setSwiper] = useState(null)
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const swiperParams = {
        navigation: { prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            // swiper.activeIndex = setMainImageIndex;
            swiper.navigation.update();
        },
        onSwiper: setSwiper,
        onSlideChange: (e) => setMainImageIndex(e.activeIndex)
    }

    //모달
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

  // 좋아요
  const heartClick = async () => {
    const newHeart = {
      articleId: id,
    };
    const response = await dispatch(__postFreeTalkHeart(newHeart));
    // console.log(response.payload);
    dispatch(__getFreeTalk());
  };

    return (
        <Container ref={node}>
            {modalOpen && <FreeTalkDeleteModal setModalOpen={setModalOpen} />}
            <Header />
            <FirstWrap>
                <DetailHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate("/freetalk") }} />
                    <HeaderTitle>자유토크</HeaderTitle>
                    <div style={{ width: "25px", height: "25px" }}></div>
                </DetailHeader>
            </FirstWrap>
            <FreeTalkContainer>
                <HelpWrap>
                    <DetailWrap>
                        <DetailBody>
                            <Bodytop>
                                <Bodyimg src={freetalksfind && freetalksfind.userImage} alt="" />
                                <Bodytxt>
                                    <Txtname onClick={onCilckChaetShow}>{freetalksfind && freetalksfind.username}</Txtname>
                                    <Txtstudent>{freetalksfind && freetalksfind.departmentName} <span> {freetalksfind && freetalksfind.admission} </span></Txtstudent>
                                    {showChaet ?
                                        <ChaetingBox>1:1채팅</ChaetingBox>
                                        : null
                                    }
                                </Bodytxt>
                                {/* <AiOutlineMenu size="20px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }}
                                    onClick={onCilckShow} /> */}
                                {freetalksfind&&freetalksfind.username === data.username ?
                                <BiDotsVerticalRounded
                                    size="20px" style={{ marginLeft: "auto", cursor: "pointer", color: "#bebebe" }}
                                    onClick={onCilckShow} /> 
                                    : null}

                                {show ?
                                    <Revisebox ref={node}>
                                        <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                                        <DeleteButton onClick={showModal}>삭제</DeleteButton>
                                    </Revisebox>
                                    : null
                                }

                            </Bodytop>
                            <BodyContent>
                                <ContentTitle>{freetalksfind && freetalksfind.title}</ContentTitle>
                                <ContentBody>{freetalksfind && freetalksfind.content}</ContentBody>
                                {freetalksfind && freetalksfind.imageList.length > 0 ?
                                    <ContentImgBox>
                                        <Swiper
                                            {...swiperParams}
                                            ref={setSwiper}
                                            spaceBetween={50}
                                            slidesPerView={1}
                                        >
                                            {freetalksfind && freetalksfind.imageList.map((image) => {
                                                return (
                                                    <SwiperSlide key={image.imageId}>
                                                        <ContentImg src={image.imgUrl}></ContentImg>
                                                    </SwiperSlide>
                                                )
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
                                    <ContentView>
                                        {freetalksfind && freetalksfind.createdAt} | 조회수{' '}
                                        {freetalksfind && freetalksfind.views}
                                    </ContentView>
                                    <Count>
                                        <CommentCount>
                                            <CommentImg>
                                                <img src={commentImg} alt='댓글이미지' />
                                            </CommentImg>
                                            댓글 {freetalksfind && freetalksfind.commentCnt}
                                        </CommentCount>
                                        <HeartCount
                                            onClick={heartClick}
                                        >
                                            {freetalksfind &&freetalksfind.heart === true ? (
                                                <HeartImg>
                                                    <img src={heartColorImg} alt='좋아요이미지' />
                                                </HeartImg>
                                            ) : (
                                                <HeartImg>
                                                    <img src={heartImg} alt='좋아요이미지' />
                                                </HeartImg>
                                            )}
                                        좋아요 {freetalksfind && freetalksfind.heartCnt}
                                        </HeartCount>
                                    </Count>
                                </BodyTxtBox>
                            </BodyContent>

                            <BodyContainer>

                                <BodyCommentBox>
                                    {freetalksfind && freetalksfind.commentList.length === 0 ?
                                        <BodyComment>작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요 </BodyComment>
                                        :
                                        <>
                                            {freetalksfind && freetalksfind.commentList.map((comment) => (
                                                <FreeTalkDetailComment key={comment.commentId} comment={comment} freetalksfind={freetalksfind} modalRef={modalRef} data={data}/>
                                            ))}
                                        </>
                                    }
                                </BodyCommentBox>
                            </BodyContainer>
                        </DetailBody>
                    </DetailWrap>
                </HelpWrap>
                <CommentContainer onSubmit={onClickPostComment}>
                    <CommentBox>
                        <CommentDiv>
                            <CommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></CommentPost>
                            <CommentButton type="submit">올리기</CommentButton>
                        </CommentDiv>
                    </CommentBox>
                </CommentContainer>
            </FreeTalkContainer>
        </Container>
    );
};

export default FreeTalkDetail;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`
const FirstWrap = styled.div`
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: column;
    /* border:1px solid blue; */
    width: 90%;
    height: 60px;
    margin: auto;
`
const DetailHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
`
const FreeTalkContainer = styled.div`
    width: 90%;
    height: 86%;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
    padding: 5px;
    align-items: center;
    margin: auto;
`

const HelpWrap = styled.div`
    width: 90%;
    height: 100%;
    /* border: 1px solid blue; */
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0px;
  }
`
const DetailWrap = styled.form`
  width: 100%;
  /* height:100%; */
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;
const Revisebox = styled.div`
    border: 1px solid #f1f0f0;
    z-index: 5;
    border-radius: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 0;
    top:40px;
    background-color: #fff;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    width:58px;
    /* box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.05); */
`
const ReviseButton = styled.button`
    border:none;
    border-bottom: 1px solid #f1f0f0;
    padding:10px;
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
    padding:10px;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
    color:gray;
    cursor:pointer;
    :hover {
        color: #000;
    }
`

const DetailBody = styled.div`
    border-radius: 20px;
    width: 100%;
    height: 100%;
`

const Bodytop = styled.div`
    display:flex;
    align-items: center;
    /* padding:20px 20px 10px 20px; */
    position: relative;
    margin: 10px 0; 
`

const Bodyimg = styled.img`
    width:40px;
    height: 40px;
    border-radius: 50%;
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
    color: #bebebe;
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
  /* padding: 0px 20px; */
  width: 100%;
  /* height: 370px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`
const ContentTitle = styled.h3`
    /* margin:10px 0px; */
    font-weight: 600;
    font-size: 18px;
    width:100%;
    /* height: 100%; */
    /* border: 1px solid green; */
`
const ContentBody = styled.p`
/* border: 1px solid blue; */
    color: #000;
    font-size: 14px;
    font-weight: 400;
    width:100%;
    margin-top: 10px;
    margin-bottom: 20px;
    height: 100%;
`

const ContentImgBox = styled.div`
    width:100%;
    height:250px;
    border-radius: 20px;
    position: relative;
    margin-bottom: 40px;
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
const PrevButton = styled.button`
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
const NextButton = styled.button`
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
    font-size: 12px;
    line-height: 40px;
    height:40px;
    /* margin:30px 0px 10px; */
    color: #bebebe;
    /* border: 1px solid blue; */
    
`
const BodyTxtBox = styled.div`
    display: flex;
    width:100%;
    align-items: center;
    justify-content: space-between;
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
    /* border-top : 1px solid rgba(0,0,0,0.1); */
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
    width: 100%;
    /* height: 100%; */
    /* border: 1px solid blue; */
    /* max-width:500px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
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
    outline: none;
`
const CommentButton = styled.button`
    border: none;
    cursor: pointer;
    color: black;
    font-weight: 600;
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
const Count = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  align-items: center;
`;

const CommentCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  display: flex;
  margin-right: 15px;
`;

const CommentImg = styled.div`
  margin-right: 5px;
`;

const HeartCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  display: flex;
  cursor: pointer;
`;

const HeartImg = styled.div`
  margin-right: 5px;
`;
