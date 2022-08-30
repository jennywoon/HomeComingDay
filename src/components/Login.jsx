import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './elements/Button';
import Input from './elements/Input';
import { __loginUser } from '../redux/modules/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  // 이메일
  const onChangeEmailHandler = (e) => {
    setFormValue((prev) => {
      console.log(e.target.value);
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  // 비밀번호
  const onChangePasswordHandler = (e) => {
    setFormValue((prev) => {
      console.log(e.target.value);
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  // 로그인버튼
  const onClickHandler = async (formValue) => {
    dispatch(__loginUser(formValue)).then(() => {
      navigate('/');
    });
  };

  return (
    <LoginContainer>
      {/* 로고 */}
      <p>로그인</p>
      <LoginWrap>
        <Input placeholder='이메일' onChange={onChangeEmailHandler} width='100%' />
        <Input
          placeholder='비밀번호'
          type='password'
          onChange={onChangePasswordHandler} width='100%'
        />
        <Button onClickHandler={onClickHandler} width='100%'>로그인</Button>
      </LoginWrap>
      {/* 네이버 로그인 */}
      <p>
        서비스이름 계정이 없으신가요?
        <span
          onClick={() => {
            navigate('/signup');
          }}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          회원가입
        </span>
      </p>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div``;

const LoginWrap = styled.div``;