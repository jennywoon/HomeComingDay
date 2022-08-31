import React, { useEffect, useState } from 'react';
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

  const { email, password } = formValue;
  const [loginBtn, setLoginBtn] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleCheck = (e) => {
    setIsActive(e);
  };

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

  useEffect(() => {
    if (formValue.email !== '' && formValue.password !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [formValue]);

  return (
    <LoginContainer
      onSubmit={(e) => {
        e.preventDefault();
        onClickHandler(formValue);
      }}
    >
      {/* 로고 */}
      <p>로그인</p>
      <LoginWrap>
        <label>이메일</label>
        <Input
          onChange={onChangeEmailHandler}
          value={formValue.email}
          width='100%'
        />
        <label>비밀번호</label>
        <Input
          type='password'
          onChange={onChangePasswordHandler}
          value={formValue.password}
          width='100%'
        />
        <Button type='submit' width='100%' disabled={isActive ? false : true}>
          로그인
        </Button>
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

const LoginContainer = styled.form`
  height: 100vh;
`;

const LoginWrap = styled.div``;
