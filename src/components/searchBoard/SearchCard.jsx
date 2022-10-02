import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import commentgray from '../../assets/commentgray.png';
import heartgray from '../../assets/heartgray.png';

const SearchCard = ({ search, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickNavi = () => {
    if (search.articleFlag === '도움요청') {
      navigate(`/helpdetail/${id}`);
    } else if (search.articleFlag === '정보공유') {
      navigate(`/informationdetail/${id}`);
    } else if (search.articleFlag === '만남일정') {
      navigate(`/calendardetail/${id}`);
    } else if (search.articleFlag === '자유토크') {
      navigate(`/freetalkdetail/${id}`);
    }
  };

  return (
    <HelpContainer onClick={onClickNavi}>
      <CardHead>
        <HeadImg>
          <UserImg src={search.userImage}></UserImg>
        </HeadImg>
        <HeadUser>
          <HeadTop>
            <HeadName>{search.username}</HeadName>
            <BoardName>{search.articleFlag}</BoardName>
          </HeadTop>
          <HeadBottom>
            <HeadDepartment>{search.departmentName}</HeadDepartment>
            <HeadStudent>· {search.admission}</HeadStudent>
          </HeadBottom>
        </HeadUser>
      </CardHead>
      <CardBody>
        <BodyTitle>{search.title}</BodyTitle>
      </CardBody>

      <CardFooter>
        <FooterTxt>
          <Views>조회수 {search.views}</Views>
          <div>|</div>
          <HeadTime>{search.createdAt}</HeadTime>
        </FooterTxt>
        <Count>
          <CommentCount>
            <CommentImg>
              <img src={commentgray} alt='댓글이미지' />
            </CommentImg>
            {search.commentCnt}
          </CommentCount>
          <HeartCount>
            <HeartImg>
              <img src={heartgray} alt='댓글이미지' />
            </HeartImg>
            {search.heartCnt}
          </HeartCount>
        </Count>
      </CardFooter>
    </HelpContainer>
  );
};

export default SearchCard;

const HelpContainer = styled.div`
  padding: 10px;
  height: 152px;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
`;
const HeadImg = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6bd60;
  border-radius: 50%;
  margin-right: 7px;
`;
const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const HeadUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
`;
const HeadTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;
const HeadBottom = styled.div`
  display: flex;
  font-size: 12px;
  color: gray;
  gap: 5px;
`;
const HeadDepartment = styled.div``;
const HeadName = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;
const HeadStudent = styled.p``;
const CardBody = styled.div``;
const BodyTitle = styled.div`
  display: flex;
  width: 350px;
  height: 60px;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FooterTxt = styled.div`
  display: flex;
  color: gray;
  align-items: center;
  gap: 5px;
  font-size: 12px;
`;

const Views = styled.div``;

const HeadTime = styled.p``;

const BoardName = styled.div`
  width: 60px;
  height: 20px;
  background-color: #fff4cc;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #f7931e;
  align-items: center;
`;

const Count = styled.div`
  display: flex;
`;

const CommentCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
  margin-right: 10px;
`;

const CommentImg = styled.div`
  margin-right: 5px;
`;

const HeartCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
`;

const HeartImg = styled.div`
  margin-right: 5px;
`;
