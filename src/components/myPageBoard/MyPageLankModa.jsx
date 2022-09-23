import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { logout } from '../../shared/cookies';
import goldtitle from "../../assets/goldtitle.png"
import silvertitle from "../../assets/silvertitle.png"
import bronzetitle from "../../assets/bronzetitle.png"
import xcircle from "../../assets/xcircle.png"

const MyPageLankModal = ({ setLankModalOpen }) => {
    const closeModal = () => {
        setLankModalOpen(false);
    };

    const navigate = useNavigate();

    return (
        <Container>
            <Wrap>
                <ModalContainer>
                    <StModalTop>
                      <StClose/>등급안내
                      <StCloseX onClick={closeModal}/>
                    </StModalTop>
                    <FirstWrap>
                        <StTopWrap>
                            <ModalTop>
                                <StBronzeLank />
                                <TopTitle>게시글 작성 개수</TopTitle>
                                <StTotTotileSecond>0개 이상</StTotTotileSecond>
                            </ModalTop>
                            <ModalTop>
                                <StSilverLank />
                                <TopTitle>게시글 작성 개수</TopTitle>
                                <StTotTotileSecond>5개 이상</StTotTotileSecond>
                            </ModalTop>
                            <ModalTop>
                                <StGoldLank />
                                <TopTitle>게시글 작성 개수</TopTitle>
                                <StTotTotileSecond>10개 이상</StTotTotileSecond>
                            </ModalTop>
                        </StTopWrap>
                        {/* <ModalBottom onClick={closeModal}>
                            <BottomTitle>돌아가기</BottomTitle>
                        </ModalBottom> */}
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
  width: 80%;
  height: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;

const StModalTop = styled.div`
  width: 90%;
  height: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`
const StClose = styled.div`
  width: 30px;
  heighT: 30px;
`
const StCloseX = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${xcircle});
  background-size: 100% 100%;
  background-position: center;
  cursor: pointer;
`

const FirstWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d9d9d9;
`;

const StTopWrap = styled.div`
    width: 95%;
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
`
const ModalTop = styled.div`
  width: 70%;
  /* height: 10%; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  color: #bebebe;
`;
const StBronzeLank = styled.div`
    width: 60px;
    height: 75px;
    background-image: url(${bronzetitle});
    background-size: 100% 100%;
    background-position: center;
    margin-bottom: 8px;
`

const StSilverLank = styled.div`
    width: 50px;
    height: 75px;
    background-image: url(${silvertitle});
    background-size: 100% 100%;
    background-position: center;
    margin-bottom: 8px;
`
const StGoldLank = styled.div`
    width: 43px;
    height: 75px;
    background-image: url(${goldtitle});
    background-size: 100% 100%;
    background-position: center;
    margin-bottom: 8px;
`

const TopTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  /* width: 100px; */
  /* padding: 0 10px; */
  text-align: center;
  /* word-break: keep-all; */
  /* width: 100%; */
`;

const StTotTotileSecond = styled.div`
  font-weight: 600;
  font-size: 15px;
`
