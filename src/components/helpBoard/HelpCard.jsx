import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { __getDetailHelp, __getHelp, __postHeart, __postHelp } from '../../redux/modules/HelpSlice';
import { useNavigate } from 'react-router-dom';
import commentgray from '../../assets/commentgray.png';
import heartgray from '../../assets/heartgray.png';

const HelpCard = ({ help, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getHelp());
  }, [dispatch]);

  const onClickNavi = async() => {
    await dispatch(__getDetailHelp(id))
    await navigate(`/helpdetail/${id}`);
    
  };

  return (
    <StHelpContainer onClick={onClickNavi}>
      <StCard>
        <StCardHead>
          <StImg>
            <StHeadImg src={help.userImage}/>
          </StImg>
          <StHeadUser>
            <StHeadTop>
              <StHeadName>{help.username}</StHeadName>
              <StHeadTime>{help.createdAt}</StHeadTime>
            </StHeadTop>
            <StHeadBottom>
              <StHeadDepartment>{help.departmentName}</StHeadDepartment>
              <StHeadStudent>· {help.admission}</StHeadStudent>
            </StHeadBottom>
          </StHeadUser>
        </StCardHead>
        <StCardBody>
          <StBodyTitle>{help.title}</StBodyTitle>
        </StCardBody>
        <StCardFooter>
          <StViews>조회수 {help.views}</StViews>
          <StCount>
            <StCommentCount>
              <StCommentImg>
              <img src={commentgray} alt='댓글이미지' />
              </StCommentImg>
              {help.commentCnt}
            </StCommentCount>
            <StHeartCount>
              <StHeartImg>
              <img src={heartgray} alt='댓글이미지' />
              </StHeartImg>
              {help.heartCnt}
            </StHeartCount>
          </StCount>
        </StCardFooter>
      </StCard>
    </StHelpContainer>
  );
};

export default HelpCard;

const StHelpContainer = styled.div`
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

const StCard = styled.div`
  width: 97%;
  margin: 0 auto;
`;

const StCardHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StImg = styled.div``;

const StHeadImg = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 7px;
`;

const StHeadUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
`;

const StHeadTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const StHeadBottom = styled.div`
  display: flex;
  font-size: 12px;
  color: #8E8E8E;
  gap: 5px;
`;
const StHeadDepartment = styled.div``;

const StHeadName = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const StHeadStudent = styled.p``;

const StHeadTime = styled.p`
  font-size: 12px;
  color: #8E8E8E;
  margin-left: auto;
  font-weight: 500;
`;

const StCardBody = styled.div`
  height: 50px;
  margin-bottom: 20px;
`;

const StBodyTitle = styled.div`
  margin: 5px 0px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  word-break: break-word;
`;

const StCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StViews = styled.div`
  font-size: 12px;
  color: #8E8E8E;
`;

const StCount = styled.div`
  display: flex;
`;

const StCommentCount = styled.div`
  font-size: 12px;
  color: #8E8E8E;
  display: flex;
  margin-right: 10px;
`;

const StCommentImg = styled.div`
  margin-right: 5px;
`

const StHeartCount = styled.div`
  font-size: 12px;
  color: #8E8E8E;
  display: flex;
`;

const StHeartImg = styled.div`
  margin-right: 5px;
`