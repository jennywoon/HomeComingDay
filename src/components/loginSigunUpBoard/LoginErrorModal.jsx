import React, { useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from "react-icons/ai";

const LoginErrorModal = ({ setModalOpen }) => {

    const modalRef = useRef(null);
    const closeModal = (e) => {
        // if (!modalRef.current.contains(e.target)) {
        setModalOpen(false);
        // }
    };

    return (
        // <Background>
            <Container>
                <Wrap>
                    <ModalContainer>
                        <FirstWrap>
                            <ModalTop>
                                <AiOutlineInfoCircle
                                    style={{ color: "#f7931e" }} size="28"
                                />
                                <TopTitle>이메일 또는 비밀번호를 다시 입력해주세요</TopTitle>
                            </ModalTop>
                            <ModalBottom onClick={closeModal}>
                                <BottomTitle>확인</BottomTitle>
                            </ModalBottom>
                        </FirstWrap>
                    </ModalContainer>
                </Wrap>
            </Container>
        // {/* </Background> */}
    );
};

export default LoginErrorModal;

const Background = styled.div`
    position: fixed;
    /* top: 0; */
    /* left: 0; */
    /* bottom: 0; */
    /* right: 0; */
    /* background-color: rgba(87,87,87,0.5); */
    z-index: 10;
    /* width: 100%; */
    height: 100%;
`
const Container = styled.div`
  /* position: relative; */
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  /* width: 100%; */
  /* height: 100%; */
  z-index: 10;
  /* background-color: #f7ede2; */
  /* border: 1px solid green; */
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 100%;
    /* max-height: 1000px; */
    max-height: 1202px;
    max-width: 420px;
    margin: auto;
    /* background-color: var(--white); */
    /* background-color: white; */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 24 px;
    @media screen and (min-width: 1024px) {
      /* position: relative; */
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
`;

const Wrap = styled.div`
    /* position: relative; */
    /* width: 100%; */
    min-width: 375px;
    width: 420px;
    max-width: 1024px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(87,87,87,0.3);
    overflow-y: hidden;
    /* border: 1px solid red; */
`
const ModalContainer = styled.div`
    width: 80%;
    /* width: 420px; */
    /* width: 100%; */
    height: 180px;
    background-color: white;
    /* background-color: rgba(87,87,87,0.3); */
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
`

const FirstWrap = styled.div`
    width: 100%;
    height: 100%;
`
const ModalTop = styled.div`
    width: 100%;
    height: 75%;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
`

const TopTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
`
const ModalBottom = styled.div`
    width: 100%;
    height: 25%;
    /* border: 1px solid blue; */
    background-color: #f7931e;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    cursor: pointer;
`

const BottomTitle = styled.div`
    font-size: 16px;
    font-weight: 700;
`