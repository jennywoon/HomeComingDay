import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Celebration from '../assets/Celebration.png'
import Button from '../components/elements/Button'

const SignupComplete = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/login')
  }

  return (
    <StSignupComplete>
      <StCompleteWrap>
        <StImg>
          <CelebrationImg src={Celebration} alt='Celebration' />
        </StImg>
        <StText>
          <p style={{ fontSize: '24px' }}>
            <strong>조수정</strong>님,
          </p>
          <p style={{ fontSize: '24px', marginBottom: '25px' }}>
            홈커밍데이 가입을 환영합니다!
          </p>
          <p>모교 선후배들과 소통을 이어가보세요</p>
        </StText>
        <Button 
        width='100%' 
        padding='10px 0' 
        style={{ marginTop: '100px' }}
        backgroundColor='black'
        color='white'
        onClickHandler={onClickHandler}
        >
          시작하기
        </Button>
      </StCompleteWrap>
    </StSignupComplete>
  );
};

export default SignupComplete;

const StSignupComplete = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StCompleteWrap = styled.div`
  width: 85%;
`;

const StImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

const CelebrationImg = styled.img`
  width: 150px;
`;

const StText = styled.div`
  text-align: center;
`