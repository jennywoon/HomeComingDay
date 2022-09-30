import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import InformationDetailComment from './InformationDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  __deleteInformation,
  __getDetailInformation,
  __getInfoComment,
  __getInformation,
  __postInfoComment,
  __postInformation,
  __postInformationHeart,
  __updateInformation,
} from '../../redux/modules/InformationSlice';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import InformationDetailModal from './InformationDetailModal';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';
import heartColorImg from '../../assets/heartColor.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
import { chatApi } from '../chatBoard/ChatApi';
import { __getNoticeCount } from '../../redux/modules/NoticeSlice';
import dots from "../../assets/dots.png"

const InformationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { informations } = useSelector((state) => state.informations);
  // const { infoComments } = useSelector((state) => state.informations)
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [showChaet, setShowChaet] = useState(false);
  const [comment, setComment] = useState('');
  const modalRef = useRef(null);

  const onChangePostHandler = (e) => {
    setComment(e.target.value);
  };

  const informationsfind = informations.find(
    (info) => info.articleId === Number(id)
  );
  const data = useSelector((state) => state.mypages.mypages);

  //모달닫기
  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (show && node.current && !node.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [show]);

  //조회수반영
  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getInformation());
    dispatch(__getDetailInformation(id));
  }, [dispatch]);

  console.log(
    'information',
    informations,
    'informationsfind',
    informationsfind
  );
  //프로필 사진 클릭
  const onCilckShow = () => {
    setShow(!show);
  };
  // 1:1 채팅버튼
  const onCilckChaetShow = () => {
    setShowChaet(!showChaet);
  };

  //수정버튼
  const onClickRevice = () => {
    navigate(`/informationupdate/${id}`);
  };

  //댓글
  const onClickPostComment = async (e) => {
    e.preventDefault();
    const newcomment = {
      content: comment,
      articleId: id,
    };
    await dispatch(__postInfoComment(newcomment));
    setComment('');
    await dispatch(__getInformation());
    await dispatch(__getNoticeCount());
  };


  //swiper 옵션
  SwiperCore.use(Navigation);
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const swiperParams = {
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      swiper.navigation.update();
    },
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  };

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  // 좋아요
  const heartClick = async () => {
    const newHeart = {
      articleId: id,
    };
    const response = await dispatch(__postInformationHeart(newHeart));
    dispatch(__getInformation());
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
      {modalOpen && <InformationDetailModal setModalOpen={setModalOpen} />}
      <Header />
      <StFirstWrap>
        <StDetailHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => {
              navigate('/information');
            }}
          />
          <StHeaderTitle>정보공유</StHeaderTitle>
          <div style={{ width: '25px', height: '25px' }}></div>
        </StDetailHeader>
      </StFirstWrap>
      <StInformationContainer>
        <StInformationWrap>
          <StDetailWrap>
            <StDetailBody>
              <StBodytop>
                <StBodyimg
                  src={informationsfind && informationsfind.userImage}
                  alt=''
                />
                <StBodytxt>
                  <StTxtname onClick={onCilckChaetShow}>
                    {informationsfind && informationsfind.username}
                  </StTxtname>
                  <StTxtstudent>
                    {informationsfind && informationsfind.departmentName}{' '}
                    <span>
                      {' '}
                      {informationsfind && informationsfind.admission}{' '}
                    </span>
                  </StTxtstudent>
                  {showChaet ?
                    <StChatWrap onClick={() => createChat(informationsfind.userId)}>
                      {informationsfind && informationsfind.username !== data.username ?
                      <StChaetingBox>
                        1:1채팅
                      </StChaetingBox>: null}
                    </StChatWrap> : null}
                </StBodytxt>

                {informationsfind && informationsfind.username === data.username ? (
                  <StDots
                    onClick={onCilckShow}
                  />
                ) : null}

                {show ? (
                  <StRevisebox ref={node}>
                    <StReviseButton onClick={onClickRevice}>수정</StReviseButton>
                    <StDeleteButton onClick={showModal}>삭제</StDeleteButton>
                  </StRevisebox>
                ) : null}
              </StBodytop>
              <StBodyContent>
                <StContentTitle>
                  {informationsfind && informationsfind.title}
                </StContentTitle>
                <StContentBody>
                  {informationsfind && informationsfind.content}
                </StContentBody>
                {informationsfind && informationsfind.imageList.length > 0 ? (
                  <StContentImgBox>
                    <Swiper
                      {...swiperParams}
                      ref={setSwiper}
                      spaceBetween={50}
                      slidesPerView={1}
                    >
                      {informationsfind &&
                        informationsfind.imageList.map((image) => {
                          return (
                            <SwiperSlide key={image.imageId}>
                              <StContentImg src={image.imgUrl}></StContentImg>
                            </SwiperSlide>
                          );
                        })}
                      
                      <StPrevButton ref={navigationPrevRef}>
                        <StPreviousBtn />
                      </StPrevButton>
                      <StNextButton ref={navigationNextRef}>
                        <StNextBtn />
                      </StNextButton>
                    </Swiper>
                  </StContentImgBox>
                ) : null}
                <StBodyTxtBox>
                  <StContentView>
                    {informationsfind && informationsfind.createdAt} | 조회수{' '}
                    {informationsfind && informationsfind.views}
                  </StContentView>
                  <StCount>
                    <StCommentCount>
                      <StCommentImg>
                        <img src={commentImg} alt='댓글이미지' />
                      </StCommentImg>
                      댓글 {informationsfind && informationsfind.commentCnt}
                    </StCommentCount>
                    <StHeartCount onClick={heartClick}>
                      {informationsfind && informationsfind.heart === true ? (
                        <StHeartImg>
                          <img src={heartColorImg} alt='좋아요이미지' />
                        </StHeartImg>
                      ) : (
                        <StHeartImg>
                          <img src={heartImg} alt='좋아요이미지' />
                        </StHeartImg>
                      )}
                      좋아요 {informationsfind && informationsfind.heartCnt}
                    </StHeartCount>
                  </StCount>
                </StBodyTxtBox>
              </StBodyContent>

              <StBodyContainer>
                <StBodyCommentBox>
                  {informationsfind &&
                    informationsfind.commentList.length === 0 ? (
                    <StBodyComment>
                      작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요{' '}
                    </StBodyComment>
                  ) : (
                    <>
                      {informationsfind &&
                        informationsfind.commentList.map((comment) => (
                          <InformationDetailComment
                            key={comment.commentId}
                            comment={comment}
                            informationsfind={informationsfind}
                            modalRef={modalRef}
                            data={data}
                          />
                        ))}
                    </>
                  )}
                </StBodyCommentBox>
              </StBodyContainer>
            </StDetailBody>
          </StDetailWrap>
        </StInformationWrap>
        <StCommentContainer onSubmit={onClickPostComment}>
          <StCommentBox>
            <StCommentDiv>
              <StCommentPost
                placeholder='댓글을 입력해주세요'
                value={comment}
                onChange={onChangePostHandler}
              ></StCommentPost>
              <StCommentButton type='submit'>올리기</StCommentButton>
            </StCommentDiv>
          </StCommentBox>
        </StCommentContainer>
      </StInformationContainer>
    </StContainer>
  );
};

export default InformationDetail;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const StFirstWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  height: 60px;
  margin: auto;
`;
const StDetailHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
`;

const StInformationContainer = styled.div`
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
`;

const StInformationWrap = styled.div`
  width: 90%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const StDetailWrap = styled.form`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const StHeaderTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
`;
const StRevisebox = styled.div`
  border: 1px solid #f1f0f0;
  z-index: 5;
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 40px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  width: 58px;
`;

const StReviseButton = styled.button`
  border: none;
  border-bottom: 1px solid #f1f0f0;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const StDeleteButton = styled.button`
  border: none;
  background-color: #eee;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;

const StDetailBody = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const StBodytop = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0;
`;

const StBodyimg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StBodytxt = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  position: relative;
`;

const StTxtname = styled.h3`
  cursor: pointer;
`;
const StTxtstudent = styled.p`
  font-size: 12px;
  color: #bebebe;
`;

const StChatWrap = styled.div`
`

const StChaetingBox = styled.div`
  border: 1px solid #f1f0f0;
  border-radius: 16px;
  position: absolute;
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
`;

const StBodyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const StContentTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  width: 100%;
`;
const StContentBody = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 100%;
`;

const StContentImgBox = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 20px;
  position: relative;
  margin-bottom: 40px;
`;
const StContentImg = styled.img`
  width: 100%;
  height: 250px;
  display: flex;
  border-radius: 20px;
`;
const StPrevButton = styled.div``;
const StNextButton = styled.div``;

const StPreviousBtn = styled(MdOutlineArrowBackIos)`
  color: #fff;
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

const StDots = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${dots});
  background-size: 100% 100%;
  background-position: center;
  margin-left: auto;
  cursor: pointer;
`;


const StContentView = styled.p`
  font-size: 12px;
  line-height: 40px;
  height: 40px;
  color: #8e8e8e;
`;

const StBodyTxtBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const StContentTime = styled.div`
  color: gray;
  font-size: 14px;
  margin-left: auto;
`;

const StBodyContainer = styled.div`
  width: 100%;
  height: 100%;

`;
const StBodyCommentBox = styled.div`
  height: 100%;
  width: 100%;
`;

const StCommentContainer = styled.form`
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StCommentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const StCommentDiv = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #eeeeee;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StCommentPost = styled.input`
  width: 80%;
  background-color: #eeeeee;
  height: 30px;
  border-radius: 10px;
  border: none;
  outline: none;
`;
const StCommentButton = styled.button`
  border: none;
  cursor: pointer;
  color: #F7931E;
  font-weight: 600;
`;
const StBodyComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #b3b3b3;
  height: 100px;
  width: 100%;
  text-align: center;
`;
const StCount = styled.div`
  display: flex;
  align-items: center;
  color: black;
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
