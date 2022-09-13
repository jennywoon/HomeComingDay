import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { __getHelp, __postHeart, __postHelp } from '../../redux/modules/HelpSlice';
import { useNavigate } from 'react-router-dom';
import commentImg from '../../assets/commentImg.png';
import heartImg from '../../assets/heartImg.png';

const HelpCard = ({ help, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__postHelp());
    dispatch(__getHelp());
  }, [dispatch]);

  const onClickNavi = () => {
    navigate(`/helpdetail/${id}`);
  };

  return (
    <HelpContainer onClick={onClickNavi}>
      <Card>
        <CardHead>
          <StImg>
            <HeadImg src={help.userImage}/>
          </StImg>
          <HeadUser>
            <HeadTop>
              <HeadName>{help.username}</HeadName>
              <HeadTime>{help.createdAt}</HeadTime>
            </HeadTop>
            <HeadBottom>
              <HeadDepartment>{help.departmentName}</HeadDepartment>
              <HeadStudent>· {help.admission}</HeadStudent>
            </HeadBottom>
          </HeadUser>
        </CardHead>
        <CardBody>
          <BodyTitle>{help.title}</BodyTitle>
        </CardBody>
        <CardFooter>
          <Views>조회수 {help.views}</Views>
          <Count>
            <CommentCount>
              <CommentImg>
              <img src={commentImg} alt='댓글이미지' />
              </CommentImg>
              {help.commentCnt}
            </CommentCount>
            <HeartCount>
              <HeartImg>
              <img src={heartImg} alt='댓글이미지' />
              </HeartImg>
              {help.heartCnt}
            </HeartCount>
          </Count>
          {/* <Division>|</Division> */}
          {/* <CommentCount>댓글 {help.commentCnt}</CommentCount> */}
        </CardFooter>
      </Card>
    </HelpContainer>
  );
};

export default HelpCard;

const HelpContainer = styled.div`
  height: 175px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 97%;
  /* border: 1px solid red; */
  margin: 0 auto;
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StImg = styled.div`
  /* border: 1px solid red; */
`;

const HeadImg = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-size: 100% 100%; */
  border-radius: 50%;
  margin-right: 7px;
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
  /* border: 1px solid red; */
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
  /* margin: 0px 5px; */
`;

const HeadStudent = styled.p``;

const HeadTime = styled.p`
  font-size: 12px;
  color: gray;
  margin-left: auto;
  font-weight: 500;
`;

const CardBody = styled.div`
  height: 50px;
  margin-bottom: 20px;
`;

const BodyTitle = styled.div`
  margin: 5px 0px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const BodyContent = styled.div`
  font-size: 12px;
  margin: 5px 0px;
`;
const CardFooter = styled.div`
  display: flex;
  /* justify-content: start; */
  justify-content: space-between;
`;

const Views = styled.div`
  font-size: 12px;
  color: gray;
`;

const Division = styled.div`
  font-size: 12px;
  align-items: center;
  margin: 0 5px;
  color: gray;
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
`

const HeartCount = styled.div`
  font-size: 12px;
  color: gray;
  display: flex;
`;

const HeartImg = styled.div`
  margin-right: 5px;
`