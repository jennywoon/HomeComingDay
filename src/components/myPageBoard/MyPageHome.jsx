import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageUser from './MyPageUser';
import MyPageCard from './MyPageCard';
import MyPageLankModal from './MyPageLankModa';
import ContactModal from './ContactModal';
// 모듈
import { __getMyArticle } from '../../redux/modules/MyPageSlice';
// 아이콘 이미지
import nonedatasquare from '../../assets/nonedatasquare.png';
import Homeimg from '../../assets/Home.png';
import Searchimg from '../../assets/Search.png';
import Chatimg from '../../assets/Chat.png';
import MyColorimg from '../../assets/MyColor.png';
import refresh from '../../assets/refresh.png';

const MyPageHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chatList[0]);
  const { myarticles, totalCount } = useSelector((state) => state.mypages);
  const { error } = useSelector((state) => state.mypages.myarticles);

  useEffect(() => {
    if (totalCount === 0) {
      dispatch(__getMyArticle());
    }
  }, []);

  //무한 스크롤
  const targetRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);

  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        dispatch(__getMyArticle(page));
        observer.unobserve(entry.target);
        setPage((prev) => prev + 1);
      }
    },
    [dispatch, isLoaded, page]
  );

  useEffect(() => {
    let observer;
    if (targetRef && myarticles.length !== totalCount) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
  }, [myarticles]);

  const refreshPage = () => {
    window.location.reload();
  };

  // 마이페이지 등급안내 모달
  const [lankModalOpen, setLankModalOpen] = useState(false);
  const showLankModal = (e) => {
    e.preventDefault();
    setLankModalOpen(true);
  };

  // 문의사항 모달
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const showContactModal = (e) => {
    e.preventDefault();
    setContactModalOpen(true);
  };
  
  return (
    <StHomeContainer>
      {lankModalOpen && <MyPageLankModal setLankModalOpen={setLankModalOpen} />}
      {contactModalOpen && (
        <ContactModal setContactModalOpen={setContactModalOpen} />
      )}
      <StMyPageTop>
        <MyPageUser />
        <StContact onClick={showContactModal}>
          궁금한 사항이 있으신가요?
        </StContact>
      </StMyPageTop>
      <StMyPageBottom>
        <StBottomWrap>
          <StTitleWrap>
            <StMyPosTitletWrap>
              <StMyPostTitle>내가 쓴 게시글</StMyPostTitle>
              <StPostCount>{totalCount && totalCount}</StPostCount>
              <StRefresh onClick={refreshPage} />
            </StMyPosTitletWrap>
            <StLankWrap onClick={showLankModal}>
              <StLank>등급안내</StLank>
            </StLankWrap>
          </StTitleWrap>
          <StArticleWrap>
            {myarticles && myarticles.length > 0 ? (
              <div>
                {myarticles &&
                  myarticles.map((myarticle) => (
                    <MyPageCard
                      key={myarticle.articleId}
                      id={myarticle.articleId}
                      myarticle={myarticle}
                    />
                  ))}
              </div>
            ) : (
              <StNoneData>
                <StNoneDataImg />
                <p>내가 쓴 게시글이 없습니다</p>
              </StNoneData>
            )}
            <div ref={targetRef}>{error}</div>
          </StArticleWrap>
        </StBottomWrap>
      </StMyPageBottom>
      <SecondWrap>
        <StBottom>
          <StFirstTap
            onClick={() => {
              navigate('/main');
            }}
          >
            <StImg src={Homeimg} alt='홈' />
            <StTapTitle>홈</StTapTitle>
          </StFirstTap>
          <StTap
            onClick={() => {
              navigate('/search');
            }}
          >
            <StImg src={Searchimg} alt='검색' />
            <StTapTitle>검색</StTapTitle>
          </StTap>
          <StTap
            onClick={() => {
              navigate('/chat');
            }}
          >
            <StIconWrap>
              <StImg src={Chatimg} alt='채팅' />
              {chatList && chatList.totalCnt > 0 ? (
                <StNewDiv>
                  <StNewTitle>N</StNewTitle>
                </StNewDiv>
              ) : null}
            </StIconWrap>
            <StTapTitle>채팅</StTapTitle>
          </StTap>
          <StLastTap
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <StImg src={MyColorimg} alt='마이페이지' />
            <StLastTapTitle>MY</StLastTapTitle>
          </StLastTap>
        </StBottom>
      </SecondWrap>
    </StHomeContainer>
  );
};

export default MyPageHome;

const StHomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StMyPageTop = styled.div`
  width: 100%;
  height: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  flex-direction: column;
`;

const StContact = styled.div`
  width: 95%;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  color: #fff4cc;
  cursor: pointer;
`;

const StMyPageBottom = styled.div`
  width: 100%;
  height: 76%;
  display: flex;
  justify-content: center;
`;

const StArticleWrap = styled.div`
  height: 85%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const StBottomWrap = styled.div`
  width: 90%;
  height: 100%;
`;

const StTitleWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0 15px 0;
  gap: 10px;
  justify-content: space-between;
`;

const StNoneData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  font-weight: 500;
  font-size: 16px;
`;

const StNoneDataImg = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${nonedatasquare});
  background-position: center;
  background-size: 100% 100%;
  margin-bottom: 10px;
`;

const StMyPosTitletWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StMyPostTitle = styled.div`
  color: #bebebe;
`;

const StPostCount = styled.div`
  color: #f7931e;
  margin: 0 5px 0 10px;
`;

const StRefresh = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${refresh});
  background-position: center;
  background-size: 100% 100%;
  cursor: pointer;
`;

const StLankWrap = styled.div`
  border: 1px solid #b3b3b3;
  border-radius: 20px;
  width: 60px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StLank = styled.div`
  color: #bebebe;
  font-size: 12px;
  font-weight: 500;
`;

const SecondWrap = styled.div`
  width: 100%;
  position: sticky;
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.2);
`;

const StBottom = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StFirstTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;
`;

const StTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const StIconWrap = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StNewDiv = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1px;
  position: absolute;
`;

const StNewTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: white;
`;

const StLastTap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;
`;

const StImg = styled.img`
  width: 25px;
  height: 25px;
  margin: 2px;
`;

const StTapTitle = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #696969;
`;

const StLastTapTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #f7931e;
`;
