import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { logout } from '../../shared/cookies';
import goldmedal from "../../assets/goldmedal.png"
import silvermedal from "../../assets/silvermedal.png"
import bronzemedal from "../../assets/bronzemedal.png"

const MyPageLankModal = ({ setLankModalOpen }) => {
    const closeModal = () => {
        setLankModalOpen(false);
    };

    const navigate = useNavigate();

    return (
        <Container>
            <Wrap>
                <ModalContainer>
                    <FirstWrap>
                        <StTopWrap>
                            <ModalTop>
                                <StBronzeLank />
                                <TopTitle>게시글 작성 개수 0개 이상</TopTitle>
                            </ModalTop>
                            <ModalTop>
                                <StSilverLank />
                                <TopTitle>게시글 작성 개수 5개 이상</TopTitle>
                            </ModalTop>
                            <ModalTop>
                                <StGoldLank />
                                <TopTitle>게시글 작성 개수 10개 이상</TopTitle>
                            </ModalTop>
                        </StTopWrap>
                        <ModalBottom onClick={closeModal}>
                            <BottomTitle>돌아가기</BottomTitle>
                        </ModalBottom>
                    </FirstWrap>
                </ModalContainer>
            </Wrap>
        </Container>
    );
};

export default MyPageLankModal;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  bottom: 0;
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
  width: 100%;
  max-width: 420px;
  height: 100vh;
  /* height: 100%; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 87, 87, 0.3);
  overflow-y: hidden;
`;

const ModalContainer = styled.div`
  width: 70%;
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

const StTopWrap = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
`
const ModalTop = styled.div`
  width: 70%;
  /* height: 10%; */
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
  gap: 12px;
`;
const StBronzeLank = styled.div`
    width: 20px;
    height: 20px;
    background-image: url(${bronzemedal});
    background-size: 100% 100%;
    background-position: center;
`
const StSilverLank = styled.div`
    width: 20px;
    height: 20px;
    background-image: url(${silvermedal});
    background-size: 100% 100%;
    background-position: center;
`
const StGoldLank = styled.div`
    width: 20px;
    height: 20px;
    background-image: url(${goldmedal});
    background-size: 100% 100%;
    background-position: center;
`

const TopTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 0 10px;
  /* text-align: center; */
  /* word-break: keep-all; */
  width: 100%;
`;
const ModalBottom = styled.div`
  width: 100%;
  height: 25%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
  gap: 10px;
`;

const BottomTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  /* border: 1px solid red; */
  background-color: #f7931e;
  border-radius: 16px;
  width: 40%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;