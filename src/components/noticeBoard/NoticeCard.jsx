import React from 'react';
import styled from 'styled-components';
import { TbBellRinging } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';

const NoticeCard = () => {
  return (
      <StNoticeCard>
      <StChatCardContainer style={{ cursor: 'pointer' }}>
        <StHeadImg>
          <TbBellRinging size='32' color='white' />
        </StHeadImg>
        <StChatContainer>
          {/* map 돌릴 예정, 맵 돌리고 게시글 없을때 이미지 추가 */}
          <StFirstContainer>
            <StUserName>
              [마케팅 신입인데 뭘 해야...]게시글에 댓글(2)이 달렸습니다
            </StUserName>
            <StChatContent>15분 전</StChatContent>
          </StFirstContainer>
          <StSecondContainer>
            <IoMdClose size='22' color='#8E8E8E' />
          </StSecondContainer>
        </StChatContainer>
      </StChatCardContainer>
      </StNoticeCard>
  );
};

export default NoticeCard;

const StNoticeCard = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-bottom: 1px solid #F5F5F5;
/* border: 1px solid red; */
`

const StChatCardContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #F5F5F5;
  /* border: 1px solid green; */
  width: 90%;
  height: 80px;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const StChatContainer = styled.div`
  width: 90%;
  /* height: 80px; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
  gap: 4px;
`;

const StHeadImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f7931e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StFirstContainer = styled.div`
  /* width: 80%; */
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;
const StUserName = styled.div`
  font-weight: 600;
  font-size: 16px;
  width: 90%;
`;
const StSecondContainer = styled.div`
  padding: 0 10px;
`;
const StChatContent = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #8e8e8e;
  margin-top: 5px;
`;
