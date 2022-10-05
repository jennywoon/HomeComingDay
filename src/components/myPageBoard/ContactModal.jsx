import React from 'react';
import styled from 'styled-components';
// 아이콘 이미지
import xcircle from "../../assets/xcircle.png"
import github from "../../assets/github.png"
import notion from "../../assets/notion.png"

const MyPageLankModal = ({ setContactModalOpen }) => {
    const closeModal = () => {
        setContactModalOpen(false);
    };

    return (
        <StContainer>
            <StWrap>
                <StModalContainer>
                    <StFirstModalTop>
                      <StClose/>CONTACT
                      <StCloseX onClick={closeModal}/>
                    </StFirstModalTop>
                    <StFirstWrap>
                        <StInfo>
                            FrontEnd : 나청운, 조수정, 최형용<br/>
                            BackEnd : 서솔, 신지영, 정우창<br/>
                            Designer : 김미래
                        </StInfo>
                        <StIcon>
                            <a href="https://github.com/jennywoon/HomeComingDay.git" target="_black"><img src={github} alt="githubicon"/></a>
                            <a href="https://github.com/251643/HomecomingDay.git" target="_black"><img src={github} alt="githubicon"/></a>
                            <a href="https://www.notion.so/Homecoming-Day-ef7d1c50568e4adc9ae05af11159197d" target="_black"><img src={notion} alt="notionicon"/></a>
                        </StIcon>
                        <StContent>project 내용이 궁금하시다면 GitHub 아이콘을, 사이트 사용의 문의사항이 있으실 경우 Notion 아이콘을 클릭하여 문의주시길 바랍니다.</StContent>
                    </StFirstWrap>
                </StModalContainer>
            </StWrap>
        </StContainer>
    );
};

export default MyPageLankModal;

const StContainer = styled.div`
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

const StWrap = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 87, 87, 0.3);
  overflow-y: hidden;
`;

const StModalContainer = styled.div`
  width: 80%;
  height: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;

const StFirstModalTop = styled.div`
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

const StFirstWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d9d9d9;
  flex-direction: column;
  gap: 10px;
`;

const StInfo = styled.div`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    margin: 10px 0 5px 0;
`

const StIcon = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 3px;
    img{
        width: 40px;
        height: 40px;
    }
`

const StContent = styled.div`
    font-size: 12px;
    text-align: center;
    color: gray;
`