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
    <>
      {/* 로고 */}
      <LoginContainer>
        <Input placeholder='이메일' onChange={onChangeEmailHandler} />
        <Input
          placeholder='비밀번호'
          type='password'
          onChange={onChangePasswordHandler}
        />
        <Button onClickHandler={onClickHandler}>로그인</Button>
      </LoginContainer>
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
    </>
  );
};

export default Login;

const LoginContainer = styled.div``;
