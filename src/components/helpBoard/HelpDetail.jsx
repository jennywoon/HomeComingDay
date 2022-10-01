import React, { useState, useEffect } from 'react';
import Header from '../Header';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import HelpDetailComment from './HelpDetailComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  __deleteHelp,
  __updateHelp,
  __getHelp,
  __getComments,
  __getHelpComment,
  __postHelpComment,
  __getDetailHelp,
  __postHelpHeart,
  __getHelpHeart,
} from '../../redux/modules/HelpSlice';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import HelpDeleteModal from './HelpDeleteModal';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';
import heartColorImg from '../../assets/heartColor.png';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
import { chatApi } from '../chatBoard/ChatApi';
import { __getNoticeCount } from '../../redux/modules/NoticeSlice';
import dots from '../../assets/dots.png';

const HelpDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { helps } = useSelector((state) => state.helps);
  const { helpsfind } = useSelector((state) => state.helps);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showChaet, setShowChaet] = useState(false);
  const [comment, setComment] = useState('');

  // const helpsfind = helps.find((help) => help.articleId === Number(id));
  // const helpsCommentList = helpsfind.commentList.find((helpfind)=>helpfind)
  // const helpsChildCommentList = helpsCommentList.childCommentList.find((helpsComment)=>helpsComment)
  const data = useSelector((state) => state.mypages.mypages);
  // console.log('helpsfind', helpsfind);
  // console.log("helpsCommentList",helpsCommentList)
  // console.log('helpsChildCommentList', helpsChildCommentList)
  // console.log('data', data);

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

  // 조회수 반영
  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getHelp());
    dispatch(__getDetailHelp(id));
  }, [dispatch]);

  // 프로필 사진 클릭
  const onCilckShow = () => {
    setShow(!show);
  };

  // 1:1 채팅버튼
  const onCilckChaetShow = () => {
    setShowChaet(!showChaet);
  };

  // 수정버튼
  const onClickRevice = () => {
    navigate(`/helpupdate/${id}`);
  };

  // 댓글
  const onChangePostHandler = (e) => {
    setComment(e.target.value);
  };

  const onClickPostComment = async (e) => {
    e.preventDefault();
    const newcomment = {
      content: comment,
      articleId: id,
    };
    await dispatch(__postHelpComment(newcomment));
    setComment('');
    await dispatch(__getDetailHelp(id))
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

  // delete, update 모달
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
    const response = await dispatch(__postHelpHeart(newHeart));
    dispatch(__getDetailHelp(id));
  };

  // 채팅 생성
  const createChat = (userId) => {
    chatApi
      .createChat(userId)
      .then((response) => {
        navigate(`/chat/${response.data}`);
        // console.log('userId', userId);
        // console.log('response', response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <StContainer ref={node}>
      {modalOpen && <HelpDeleteModal setModalOpen={setModalOpen} />}
      <Header />
      <StFirstWrap>
        <StDetailHeader>
          <IoIosArrowBack
            size='25px'
            cursor='pointer'
            onClick={() => {
              navigate('/main');
            }}
          />
          <StHeaderTitle>도움요청</StHeaderTitle>
          <StHeaderDiv />
        </StDetailHeader>
      </StFirstWrap>
      <StHelpContainer>
        <StHelpWrap>
          <StDetailWrap>
            <StDetailBody>
              <StBodytop>
                <StBodyimg src={helpsfind && helpsfind.userImage} alt='' />
                <StBodytxt>
                  <StTxtname onClick={onCilckChaetShow}>
                    {helpsfind && helpsfind.username}
                  </StTxtname>
                  <StTxtstudent>
                    {helpsfind && helpsfind.departmentName}{' '}
                    <span> {helpsfind && helpsfind.admission} </span>
                  </StTxtstudent>
                  {showChaet ? (
                    <StChatWrap onClick={() => createChat(helpsfind.userId)}>
                      {helpsfind && helpsfind.username !== data.username ? (
                        <StChaetingBox>1:1채팅</StChaetingBox>
                      ) : null}
                    </StChatWrap>
                  ) : null}
                </StBodytxt>

                {helpsfind && helpsfind.username === data.username ? (
                  <StDots onClick={onCilckShow} />
                ) : null}

                {show ? (
                  <StRevisebox ref={node}>
                    <StReviseButton onClick={onClickRevice}>
                      수정
                    </StReviseButton>
                    <StDeleteButton onClick={showModal}>삭제</StDeleteButton>
                  </StRevisebox>
                ) : null}
              </StBodytop>
              <StBodyContent>
                <StContentTitle>{helpsfind && helpsfind.title}</StContentTitle>
                <StContentBody>{helpsfind && helpsfind.content}</StContentBody>
                {helpsfind && helpsfind.imageList?.length !== 0 ? (
                  <StContentImgBox>
                    <Swiper
                      {...swiperParams}
                      ref={setSwiper}
                      spaceBetween={50}
                      slidesPerView={1}
                    >
                      {helpsfind &&
                        helpsfind.imageList?.map((image) => {
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
                    {helpsfind && helpsfind.createdAt} | 조회수{' '}
                    {helpsfind && helpsfind.views}
                  </StContentView>
                  <StCount>
                    <StCommentCount>
                      <StCommentImg>
                        <img src={commentImg} alt='댓글이미지' />
                      </StCommentImg>
                      댓글 {helpsfind && helpsfind.commentCnt}
                    </StCommentCount>
                    <StHeartCount onClick={heartClick}>
                      {helpsfind && helpsfind.heart === true ? (
                        <StHeartImg>
                          <img src={heartColorImg} alt='좋아요이미지' />
                        </StHeartImg>
                      ) : (
                        <StHeartImg>
                          <img src={heartImg} alt='좋아요이미지' />
                        </StHeartImg>
                      )}
                      좋아요 {helpsfind && helpsfind.heartCnt}
                    </StHeartCount>
                  </StCount>
                </StBodyTxtBox>
              </StBodyContent>

              <StBodyContainer>
                <StBodyCommentBox>
                  {helpsfind && helpsfind.commentList?.length === 0 ? (
                    <StBodyComment>
                      작성한 댓글이 없습니다 <br></br> 첫번째 댓글을 남겨보세요{' '}
                    </StBodyComment>
                  ) : (
                    <>
                      {helpsfind &&
                        helpsfind.commentList?.map((comment) => (
                          <HelpDetailComment
                            key={comment.commentId}
                            comment={comment}
                            helpsfind={helpsfind}
                            data={data}
                          />
                        ))}
                    </>
                  )}
                </StBodyCommentBox>
              </StBodyContainer>
            </StDetailBody>
          </StDetailWrap>
        </StHelpWrap>
        <StCommentContainer onSubmit={onClickPostComment}>
          <StCommentBox>
            <StCommentDiv>
              <StCommentPost
                placeholder='댓글을 입력해주세요'
                value={comment}
                onChange={onChangePostHandler}
                maxLength='50'
              ></StCommentPost>
              <StCommentButton type='submit'>올리기</StCommentButton>
            </StCommentDiv>
          </StCommentBox>
        </StCommentContainer>
      </StHelpContainer>
    </StContainer>
  );
};

export default HelpDetail;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 1;
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

const StHelpContainer = styled.div`
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

const StHelpWrap = styled.div`
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

const StHeaderDiv = styled.div`
  width: 25px;
  height: 25px;
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

const StDots = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${dots});
  background-size: 100% 100%;
  background-position: center;
  margin-left: auto;
  cursor: pointer;
`;

const StTxtname = styled.h3`
  cursor: pointer;
  font-weight: 600;
font-size: 16px;
`;

const StTxtstudent = styled.p`
  font-size: 12px;
  color: #bebebe;
`;

const StChatWrap = styled.div``;
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
  font-size: 14px;
  white-space: pre-wrap;
`;

const StContentTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
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
  color: #f7931e;
  font-weight: 600;
  background-color: transparent;
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
  font-size: 14px;
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
