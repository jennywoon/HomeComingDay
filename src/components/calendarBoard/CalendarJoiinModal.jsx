import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import joinUser from '../../assets/users.png';
import { useEffect } from 'react';
import { __getJoin } from '../../redux/modules/CalendarSlice';

const CalendarJoiinModal = ({setJoinModalOpen,joinPeopleList,id}) => {
  const dispatch = useDispatch();


  const closeModal = () => {
    setJoinModalOpen(false);
  };

  useEffect(()=>{
    dispatch(__getJoin(id));
  },[dispatch])


    return (
    <StContainer>
      <StWrap>
        <StModalContainer>
          <StFirstWrap>
            <div style={{width:"35px"}}></div>
            <StModalTop>참여자보기</StModalTop>
            <IconBox>
            <IoMdClose size="20px" style={{marginLeft:"auto",cursor:"pointer"}} onClick={closeModal}/>
            </IconBox>
          </StFirstWrap>

          {/* 참여자리스트 맵돌리기 */}
          {joinPeopleList.length !== 0 ?
          (joinPeopleList && joinPeopleList.map((joinList,i)=>
          <StJoinList key={i}>
            <StJoinMyImg src={joinList.userImage}></StJoinMyImg>
            <StJointxtBox>
              <StJoinName>{joinList.username}</StJoinName>
              <StJoinInfo>{joinList.department} {joinList.admission}</StJoinInfo>
            </StJointxtBox>
          </StJoinList>
          )) : 
          (
            <StJoinNone>
                <img src={joinUser} style={{width:"30px"}}alt="참여자조회"/>
                <StNonetxt>참석자가 없습니다 <br/> 참석하기 버튼을 눌러 모임에 참석해보세요</StNonetxt>
            </StJoinNone>
          )
          }
          
        </StModalContainer>
      </StWrap>
    </StContainer>
    );
};

export default CalendarJoiinModal;

const StContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  z-index: 10;
  overflow: hidden;
  /* bottom: 0; */
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 100%;
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
position: relative;
  width: 100%;
  /* width: 420px; */
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

const StModalContainer = styled.div`
  width: 80%;
  height: 520px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;

const StFirstWrap = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #D9D9D9;
  display: flex;
  align-items: center;
`;
const StModalTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
font-size: 16px;
`;

const IconBox = styled.div`
  display: flex;
  width:35px;
  padding-right: 8px;
`

const StJoinList = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  padding:15px 20px;
  border-bottom: 1px solid #F5F5F5;
`
const StJoinMyImg = styled.img`
  width:30px;
  height:30px;
  background-color: #FFCE95;
  border-radius: 50%;
  margin-right:10px;
`

const StJointxtBox = styled.div`
  display: flex;
  flex-direction: column;
`
const StJoinName = styled.div`
  font-weight: 600;
font-size: 14px;
color: #000000;
width:100%;
`
const StJoinInfo = styled.div`
  font-weight: 400;
font-size: 12px;
color: #8E8E8E;
width:100%;
`
const StJoinNone = styled.div`
  display: flex;
  width:100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top:100px;
`
const StNonetxt = styled.div`
  font-weight: 500;
font-size: 14px;
line-height: 17px;
color: #B3B3B3;
`