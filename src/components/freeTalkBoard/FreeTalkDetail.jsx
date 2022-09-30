import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io'
import FreeTalkDetailComment from './FreeTalkDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getDetailFreeTalk, __getFreeTalk, __postFreeTalkComment, __postFreeTalkHeart } from '../../redux/modules/FreeTalkSlice';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import FreeTalkDeleteModal from './FreeTalkDeleteModal';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';
import heartColorImg from '../../assets/heartColor.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
import { chatApi } from '../chatBoard/ChatApi';
import { __getNoticeCount } from '../../redux/modules/NoticeSlice';
import dots from "../../assets/dots.png"

const FreeTalkDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const { freetalks } = useSelector((state) => state.freetalks)
    const {freetalksfind} = useSelector((state) => state.freetalks)
    const data = useSelector((state) => state.mypages.mypages)
    // const { freeComments } = useSelector((state) => state.freetalks)
    const { id } = useParams();
    // console.log(id)
    const [show, setShow] = useState(false)
    const [showChaet, setShowChaet] = useState(false)
    const [comment, setComment] = useState("")
    const modalRef = useRef(null);
    
    // const freetalksfind = freetalks.find((freetalk) => freetalk.articleId === Number(id))
    // console.log("freetalksfind",freetalksfind)
    // console.log("detailFreeTalks",detailFreeTalkss)
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
    dispatch(__getDetailFreeTalk(id));
    dispatch(__getMyPage())
    dispatch(__getFreeTalk())
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
            articleId: Number(id)
        }
        await dispatch(__postFreeTalkComment(newcomment));
        setComment("");
        await dispatch(__getDetailFreeTalk(id));
        await dispatch(__getNoticeCount());
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
        await dispatch(__getDetailFreeTalk(id));
    };

    // 채팅 생성
    const createChat = (userId) => {
        chatApi
            .createChat(userId)
            .then((response) => {
                navigate(`/chat/${response.data}`);
                console.log("userId", userId)
                console.log("response", response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <StContainer ref={node}>
            {modalOpen && <FreeTalkDeleteModal setModalOpen={setModalOpen} />}
            <Header />
            <StFirstWrap>
                <StDetailHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" onClick={() => { navigate("/freetalk") }} />
                    <StHeaderTitle>자유토크</StHeaderTitle>
                    <StHeaderDiv/>
                </StDetailHeader>
            </StFirstWrap>
            <StFreeTalkContainer>
                <StHelpWrap>
                    <StDetailWrap>
                        <StDetailBody>
                            <StBodytop>
                                <StBodyimg src={freetalksfind && freetalksfind.userImage} alt="" />
                                <StBodytxt>
                                    <StTxtname onClick={onCilckChaetShow}>{freetalksfind && freetalksfind.username}</StTxtname>
                                    <StTxtstudent>{freetalksfind && freetalksfind.departmentName} <span> {freetalksfind && freetalksfind.admission} </span></StTxtstudent>
                                    {showChaet ?
                                        <StChatWrap onClick={() => createChat(freetalksfind.userId)}>
                                            {freetalksfind && freetalksfind.username !== data.username ?
                                                <StChatingBox>
                                                    1:1채팅
                                                </StChatingBox> : null}
                                        </StChatWrap> : null}
                                </StBodytxt>
                                {/* <AiOutlineMenu size="20px" cursor="pointer" style={{ marginLeft: "auto", cursor: "pointer" }}
                                    onClick={onCilckShow} /> */}
                                {freetalksfind && freetalksfind.username === data.username ?
                                    <StDots
                                        onClick={onCilckShow} />
                                    : null}

                                {show ?
                                    <StRevisebox ref={node}>
                                        <ReviseButton onClick={onClickRevice}>수정</ReviseButton>
                                        <DeleteButton onClick={showModal}>삭제</DeleteButton>
                                    </StRevisebox>
                                    : null
                                }

                            </StBodytop>
                            <StBodyContent>
                                <StContentTitle>{freetalksfind && freetalksfind.title}</StContentTitle>
                                <StContentBody>{freetalksfind && freetalksfind.content}</StContentBody>
                                {freetalksfind && freetalksfind.imageList?.length !== 0 ?
                                    <StContentImgBox>
                                        <Swiper
                                            {...swiperParams}
                                            ref={setSwiper}
                                            spaceBetween={50}
                                            slidesPerView={1}
                                        >
                                            {freetalksfind && freetalksfind.imageList?.map((image) => {
                                                return (
                                                    <SwiperSlide key={image.imageId}>
                                                        <StContentImg src={image.imgUrl}></StContentImg>
                                                    </SwiperSlide>
                                                )
                                            })}
                                            <StPrevButton ref={navigationPrevRef}>
                                                <StPreviousBtn />
                                            </StPrevButton>
                                            <StNextButton ref={navigationNextRef}>
                                                <StNextBtn />
                                            </StNextButton>
                                        </Swiper>
                                    </StContentImgBox>
                                    : null}
                                <StBodyTxtBox>
                                    <StContentView>
                                        {freetalksfind && freetalksfind.createdAt} | 조회수{' '}
                                        {freetalksfind && freetalksfind.views}
                                    </StContentView>
                                    <StCount>
                                        <StCommentCount>
                                            <StCommentImg>
                                                <img src={commentImg} alt='댓글이미지' />
                                            </StCommentImg>
                                            댓글 {freetalksfind && freetalksfind.commentCnt}
                                        </StCommentCount>
                                        <StHeartCount
                                            onClick={heartClick}
                                        >
                                            {freetalksfind && freetalksfind.heart === true ? (
                                                <StHeartImg>
                                                    <img src={heartColorImg} alt='좋아요이미지' />
                                                </StHeartImg>
                                            ) : (
                                                <StHeartImg>
                                                    <img src={heartImg} alt='좋아요이미지' />
                                                </StHeartImg>
                                            )}
                                            좋아요 {freetalksfind && freetalksfind.heartCnt}
                                        </StHeartCount>
                                    </StCount>
                                </StBodyTxtBox>
                            </StBodyContent>

                            <StBodyContainer>

                                <StBodyCommentBox>
                                    {freetalksfind && freetalksfind.commentList?.length === 0 ?
                                        <StBodyComment>작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요 </StBodyComment>
                                        :
                                        <>
                                            {freetalksfind && freetalksfind.commentList?.map((comment) => (
                                                <FreeTalkDetailComment key={comment.commentId} comment={comment} freetalksfind={freetalksfind} modalRef={modalRef} data={data} />
                                            ))}
                                        </>
                                    }
                                </StBodyCommentBox>
                            </StBodyContainer>
                        </StDetailBody>
                    </StDetailWrap>
                </StHelpWrap>
                <StCommentContainer onSubmit={onClickPostComment}>
                    <StCommentBox>
                        <StCommentDiv>
                            <StCommentPost placeholder='댓글을 입력해주세요' value={comment} onChange={onChangePostHandler} ></StCommentPost>
                            <StCommentButton type="submit">올리기</StCommentButton>
                        </StCommentDiv>
                    </StCommentBox>
                </StCommentContainer>
            </StFreeTalkContainer>
        </StContainer>
    );
};

export default FreeTalkDetail;

const StContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`
const StFirstWrap = styled.div`
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: column;
    /* border:1px solid blue; */
    width: 90%;
    height: 60px;
    margin: auto;
`
const StDetailHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
`
const StFreeTalkContainer = styled.div`
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

const StHelpWrap = styled.div`
    width: 90%;
    height: 100%;
    /* border: 1px solid blue; */
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0px;
  }
`
const StDetailWrap = styled.form`
  width: 100%;
  /* height:100%; */
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const StHeaderTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const StHeaderDiv = styled.div`
  width: 25px;
  height: 25px;
`
const StRevisebox = styled.div`
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

const StDetailBody = styled.div`
    border-radius: 20px;
    width: 100%;
    height: 100%;
`

const StBodytop = styled.div`
    display:flex;
    align-items: center;
    /* padding:20px 20px 10px 20px; */
    position: relative;
    margin: 10px 0; 
`

const StBodyimg = styled.img`
    width:40px;
    height: 40px;
    border-radius: 50%;
`

const StBodytxt = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    position:relative;
`
const StDots = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${dots});
  background-size: 100% 100%;
  background-position: center;
  margin-left: auto;
  cursor: pointer;
`

const StTxtname = styled.h3`
    cursor:pointer;
    /* margin: 0px; */
`
const StTxtstudent = styled.p`
    /* margin: 0px; */
    font-size: 12px;
    color: #bebebe;
`
const StChatWrap = styled.div``
const StChatingBox = styled.div`
  border: 1px solid #f1f0f0;
  border-radius: 16px;
  position: absolute;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 30px;
  top: 25px;
  z-index: 1;
  width: 70px;
  height: 40px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  :hover {
    color: #000;
  }
`

const StBodyContent = styled.div`
  /* padding: 0px 20px; */
  width: 100%;
  /* height: 370px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`
const StContentTitle = styled.h3`
    /* margin:10px 0px; */
    font-weight: 600;
    font-size: 18px;
    width:100%;
    /* height: 100%; */
    /* border: 1px solid green; */
`
const StContentBody = styled.p`
/* border: 1px solid blue; */
    color: #000;
    font-size: 14px;
    font-weight: 400;
    width:100%;
    margin-top: 10px;
    margin-bottom: 20px;
    height: 100%;
`

const StContentImgBox = styled.div`
    width:100%;
    height:250px;
    border-radius: 20px;
    position: relative;
    margin-bottom: 40px;
`
const StContentImg = styled.img`
    /* border:1px solid gray; */
    width: 100%;
    height:250px;
    display:flex;
    border-radius: 20px;
    /* margin : 20px 0px; */
    /* background-repeat: no-repeat;
    background-size: cover; */
`
const StPrevButton = styled.div``;
const StNextButton = styled.div``;

const StPreviousBtn = styled(MdOutlineArrowBackIos)`
  color: #fff;
  /* font-size: 20px; */
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  border: none;
  top: 50%;
  left: 10px;
  z-index: 2;
  transform: translatey(-50%);
`;
const StNextBtn = styled(MdOutlineArrowForwardIos)`
  color: #fff;
  /* font-size: 20px; */
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  border: none;
  border-radius: 20px;
  top: 50%;
  right: 10px;
  z-index: 2;
  transform: translatey(-50%);
`;


const StContentView = styled.p`
    font-size: 12px;
    line-height: 40px;
    height:40px;
    /* margin:30px 0px 10px; */
    color: #bebebe;
    /* border: 1px solid blue; */
    
`
const StBodyTxtBox = styled.div`
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

const StBodyContainer = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    /* overflow-y: scroll; */
`
const StBodyCommentBox = styled.div`
    /* border-top : 1px solid rgba(0,0,0,0.1); */
    /* margin:20px; */
    /* overflow-y: scroll; */
    height: 100%;
    width: 100%;
    /* position:relative; */
    /* height: 70%; */
    /* border: 1px solid orangered; */
`

const StCommentContainer = styled.form`
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

const StCommentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 60px; */
    width: 95%;
    /* border: 1px solid red; */
`

const StCommentDiv = styled.div`
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

const StCommentPost = styled.input`
    width:80%;
    /* width: 100%; */
    /* bottom : 0; */
    background-color: #eeeeee;
    height: 30px;
    border-radius: 10px;
    border: none;
    outline: none;
`
const StCommentButton = styled.button`
    border: none;
    cursor: pointer;
    color: #F7931E;
    font-weight: 600;
`
const StBodyComment = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color:#B3B3B3;
    height:100px;
    width:100%;
    text-align: center;
`
const StCount = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  align-items: center;
`;

const StCommentCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  display: flex;
  margin-right: 15px;
`;

const StCommentImg = styled.div`
  margin-right: 5px;
`;

const StHeartCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  display: flex;
  cursor: pointer;
`;

const StHeartImg = styled.div`
  margin-right: 5px;
`;
