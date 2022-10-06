import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/elements/Button';
import Cookies from 'universal-cookie';
// 모듈
import { __getMyPage } from '../../redux/modules/MyPageSlice';
// 아이콘 이미지
import Complete from '../../assets/Complete.png';

const SignupComplete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    navigate('/main');
  };

  useEffect(() => {
    dispatch(__getMyPage());
  }, [dispatch]);

  const cookies = new Cookies();

  return (
    <StSignupComplete>
      <StCompleteWrap>
        <div></div>
        <StFisrtWrap>
          <StImg>
            <StCompleteImg src={Complete} alt='Complete' />
          </StImg>
          <StText>
            <StUsername>
              <StUsernameBold>{cookies.get('username')}</StUsernameBold>님,
            </StUsername>
            <StWelcomeText>홈커밍데이 가입을 환영합니다!</StWelcomeText>
            <StSchoolDiv>
              <StSchoolText>선후배들과 소통을 이어가보세요</StSchoolText>
            </StSchoolDiv>
          </StText>
        </StFisrtWrap>
        <Button
          type='submit'
          width='100%'
          style={{ marginTop: '100px' }}
          backgroundColor='#f7931e'
          color='white'
          onClickHandler={onClickHandler}
        >
          <StButtonTitle>시작하기</StButtonTitle>
        </Button>
      </StCompleteWrap>
    </StSignupComplete>
  );
};

export default SignupComplete;

const StSignupComplete = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCompleteWrap = styled.div`
  width: 85%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StFisrtWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

const StCompleteImg = styled.img`
  width: 100%;
`;

const StText = styled.div`
  text-align: center;
`;

const StUsername = styled.p`
  font-size: 24px;
`;

const StUsernameBold = styled.strong``;

const StWelcomeText = styled.p`
  font-size: 24px;
  margin-bottom: 25px;
`;

const StSchoolText = styled.p``;

const StSchoolDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #bebebe;
  gap: 5px;
`;

const StButtonTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
