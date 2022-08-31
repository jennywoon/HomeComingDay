import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from './elements/Button';
import Input from './elements/Input';
import { __signupUser } from '../redux/modules/UserSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
  });

  const { email, username, password, passwordCheck } = inputValue;

  const [formError, setFormError] = useState({
    emailError: false,
    nameError: false,
    passwordError: false,
    confirmPasswordError: false,
  });
  const { emailError, nameError, passwordError, confirmPasswordError } =
    formError;
  // 정규식
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const nameRegex = /^[A-Za-zㄱ-ㅎ가-힣]{2,12}$/;
  // const nameRegex = /^(?=.*[a-z가-힣])[a-z가-힣]{2,12}$/;
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  // const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  // email
  const handleChangeEmail = (e) => {
    if (!e.target.value || emailRegex.test(e.target.value)) {
      setFormError({ ...formError, emailError: false });
    } else {
      setFormError({ ...formError, emailError: true });
    }
    setInputValue((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  // username
  const handleChangeusername = (e) => {
    if (!e.target.value || nameRegex.test(e.target.value)) {
      setFormError({ ...formError, nameError: false });
    } else {
      setFormError({ ...formError, nameError: true });
    }
    setInputValue((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  };

  // password
  const handleChangePassword = (e) => {
    if (!e.target.value || passwordRegex.test(e.target.value)) {
      setFormError({ ...formError, passwordError: false });
    } else if (passwordCheck === e.target.value) {
      setFormError({ ...formError, confirmPasswordError: false });
    } else {
      setFormError({ ...formError, passwordError: true });
    }
    setInputValue((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  // passwordCheck
  const handleChangeConfirmPassword = (e) => {
    if (password === e.target.value) {
      setFormError({ ...formError, confirmPasswordError: false });
    } else {
      setFormError({ ...formError, confirmPasswordError: true });
    }
    setInputValue((prev) => {
      return {
        ...prev,
        passwordCheck: e.target.value,
      };
    });
  };

  // 회원가입 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(__signupUser(inputValue)).then(
      (res) => !res.error && navigate('/login')
    );
  };

  // 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      email !== '' &&
      username !== '' &&
      password !== '' &&
      passwordCheck !== '' &&
      !emailError &&
      !nameError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    email,
    username,
    password,
    passwordCheck,
    emailError,
    nameError,
    passwordError,
    confirmPasswordError,
  ]);

  return (
    <SignupContainer onSubmit={handleSubmit}>
      {/* 로고 */}
      <p style={{ justifyContent: 'center' }}>회원가입</p>
      <SignupWrap>
        <Flexbox>
          <Input
            placeholder='이메일'
            width='100%'
            style={{ marginRight: '10px' }}
            onChange={handleChangeEmail}
          />
          <Button width='40%'>인증</Button>
        </Flexbox>
        {emailError ? (
          <StErrorMessage>이메일 형식에 맞게 입력하세요</StErrorMessage>
        ) : null}
      </SignupWrap>

      <SignupWrap>
        <Input
          placeholder='이름'
          width='100%'
          onChange={handleChangeusername}
        />
        {nameError ? (
          <StErrorMessage>2자 이상 12자 이하, 영어 또는 한글</StErrorMessage>
        ) : null}
      </SignupWrap>

      <SignupWrap>
        <Input
          placeholder='비밀번호'
          type='password'
          width='100%'
          onChange={handleChangePassword}
        />
        {passwordError ? (
          <StErrorMessage>
            8자 이상 16자 이하의 영어와 숫자, 특수문자 포함
          </StErrorMessage>
        ) : null}
      </SignupWrap>

      <SignupWrap>
        <Input
          placeholder='비밀번호 확인'
          type='password'
          width='100%'
          onChange={handleChangeConfirmPassword}
        />
        {confirmPasswordError ? (
          <StErrorMessage>비밀번호가 일치하지 않습니다.</StErrorMessage>
        ) : null}
      </SignupWrap>


      <Button width='100%' isDisabled={isActive ? false : true}>

        회원가입
      </Button>
      <p>
        서비스이름 계정이 있으신가요?
        <span
          onClick={() => {
            navigate('/login');
          }}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          로그인
        </span>
      </p>
    </SignupContainer>
  );
};

export default SignUp;

const SignupContainer = styled.form`
  height: 100vh;
  font-size: 16px;
`;

const SignupWrap = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  align-items: left;
`;

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StErrorMessage = styled.p`
  margin: 0;
  color: red;
  margin-bottom: 20px;
  font-size: 12px;
`;