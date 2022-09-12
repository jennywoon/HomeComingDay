import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const SignupModal = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <Wrap>
        <ModalContainer>
          <FirstWrap>
            <ModalTop>
              <AiOutlineCheckCircle style={{ color: '#f7931e' }} size='28' />
              <TopTitle>인증번호가 발송되었습니다<br/>이메일을 확인하세요</TopTitle>
            </ModalTop>
            <ModalBottom onClick={closeModal}>
              <BottomTitle>확인</BottomTitle>
            </ModalBottom>
          </FirstWrap>
        </ModalContainer>
      </Wrap>
    </Container>
  );
};

export default SignupModal;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 80%;
    max-height: 1202px;
    max-width: 420px;
    margin: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 24 px;
    @media screen and (min-width: 1024px) {
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
`;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 87, 87, 0.3);
  overflow-y: hidden;
`;
const ModalContainer = styled.div`
  width: 80%;
  height: 180px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;

const FirstWrap = styled.div`
  width: 100%;
  height: 100%;
`;
const ModalTop = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const TopTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  text-align: center;
  word-break: keep-all;
`;
const ModalBottom = styled.div`
  width: 100%;
  height: 25%;
  background-color: #f7931e;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
`;

const BottomTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;