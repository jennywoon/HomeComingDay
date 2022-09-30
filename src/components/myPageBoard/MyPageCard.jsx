import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { __getMyPage, __getMyArticle } from '../../redux/modules/MyPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commentgray from "../../assets/commentgray.png"
import heartgray from '../../assets/heartgray.png';

const MyPageCard = ({ myarticle, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickNavi = () => {
        if (myarticle.articleFlag === "도움요청") {
            navigate(`/helpdetail/${id}`)
        } else if (myarticle.articleFlag === "정보공유") {
            navigate(`/informationdetail/${id}`)
        } else if (myarticle.articleFlag === "만남일정") {
            navigate(`/calendardetail/${id}`)
        } else if (myarticle.articleFlag === "자유토크") {
            navigate(`/freetalkdetail/${id}`)
        }
    };

    return (
        <>
            <StContainer onClick={onClickNavi}>
                <StTotalWrap>
                    <StCardHead>
                        <StFlagWrap>{myarticle && myarticle.articleFlag}</StFlagWrap>
                    </StCardHead>
                    <StCardBody>
                        <StBodyTitle>{myarticle && myarticle.title}</StBodyTitle>
                    </StCardBody>
                    <StCardFooter>
                        <StCardFooterLeft>
                            <StViews>조회수 {myarticle && myarticle.views}</StViews>
                            <div>|</div>
                            <StHeadTime>{myarticle && myarticle.createdAt}</StHeadTime>
                        </StCardFooterLeft>
                        <StCount>
                            <StCommentCount>
                                <StCommentImg>
                                    <img src={commentgray} alt='댓글이미지' />
                                </StCommentImg>
                                {myarticle && myarticle.commentCnt}
                            </StCommentCount>
                            <StHeartCount>
                                <StHeartImg>
                                    <img src={heartgray} alt='댓글이미지' />
                                </StHeartImg>
                                {myarticle && myarticle.heartCnt}
                            </StHeartCount>
                        </StCount>
                    </StCardFooter>
                </StTotalWrap>
            </StContainer>
        </>
    );
};

export default MyPageCard;

const StContainer = styled.div`
  height: 120px;
  /* padding: 10px; */
  border: 1px solid #eee;
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StTotalWrap = styled.div`
    width: 90%;
    /* height: 100%; */
`

const StCardHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StFlagWrap = styled.div`
    width: 60px;
    height: 20px;
    background-color: #fff4cc;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #f7931e
`

const StCardBody = styled.div`
  /* height: 50px; */
  /* margin-bottom: 20px; */
`;

const StBodyTitle = styled.div`
  height: 45px;
  margin: 5px 0px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const StCardFooter = styled.div`
  display: flex;
  /* justify-content: start; */
  justify-content: space-between;
`;

const StCardFooterLeft = styled.div`
    display: flex;
    gap: 10px;
    color: gray;
    align-items: center;
`

const StHeadTime = styled.p`
  font-size: 12px;
  margin-left: auto;
  font-weight: 500;
`;
const StViews = styled.div`
  font-size: 12px;
`;

const StCount = styled.div`
  display: flex;
`;

const StCommentCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
  margin-right: 10px;
`;

const StCommentImg = styled.div`
  margin-right: 5px;
`

const StHeartCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
`;

const StHeartImg = styled.div`
  margin-right: 5px;
`