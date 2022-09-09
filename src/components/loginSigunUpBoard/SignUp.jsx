import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/elements/Button';
import Input from '../../components/elements/Input';
import {
  __postSendEmail,
  __postCheckEmail,
  __signupUser,
  __emailCheck,
} from '../../redux/modules/UserSlice';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';

const SignUp = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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

  // 정규식(이메일, 이름, 비밀번호)
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const nameRegex = /^[A-Za-zㄱ-ㅎ가-힣]{2,12}$/;
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  // 이름 유효성검사
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

  // 이메일 유효성검사
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

  // 이메일 중복확인
  const [isOnCheck, setIsOnCheck] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const handleChangeEmailCheck = async () => {
    const newEmail = {
      email: email,
    };
    try {
      if (!emailError) {
      const data = await axios.post(`${BASE_URL}/emailCheck`, newEmail);
      console.log(data.data);
      if (data.data.success === true) {
        setIsOnCheck(true);
        setEmailConfirm(true);
      } else if (data.data.success === false) {
        setIsOnCheck(false);
      }
      }
      
    } catch (error) {
      console.log('error ', error);
    }
  };

  // 이메일 보내기
  const [disabled, setDisabled] = useState(false);
  // const [emailSend, setEmailSend] = useState({
  //   email: '',
  // });
  // const handleSendEmail = (e) => {
  //   e.preventDefault();
  //   // setEmailSend((prev) => {
  //   //   return {
  //   //     ...prev,
  //   //     email: e.target.value,
  //   //   };
  //   // });
  //   setEmailSend({email: e.target.value})
  //   setDisabled(true);
  //   dispatch(__postSendEmail(emailSend));
  // }
  const handleSendEmail = async () => {
    const sendEmail = {
      email: email,
    };
    try {
      const data = await axios.post(`${BASE_URL}/signup/sendEmail`, sendEmail);
      console.log(data.data);
    } catch (error) {
      console.log('error ', error);
    }
  };

  // 이메일 인증번호
  const [emailCheck, setEmailCheck] = useState({
    authKey: '',
  });
  const { authKey } = emailCheck;
  const handleChangeAuthKey = (e) => {
    setEmailCheck((prev) => {
      return {
        ...prev,
        authKey: e.target.value
      }
    })
    // setEmailCheck({ email: e.target.value, authKey: e.target.value });
  };

  // 이메일 인증번호 확인
  const [isCheck, setIsCheck] = useState(false);
  const handleCheckEmail = async () => {
    const checkEmail = {
      email: email,
      authKey: authKey
    };
    try {
      const data = await axios.post(`${BASE_URL}/signup/checkEmail`, checkEmail);
      console.log(data.data);
      if (data.data.success === true) {
        setIsCheck(true);
      } else if (data.data.success === false) {
        setIsCheck(false);
      }
    } catch (error) {
      console.log('error ', error);
    }
  }
  // const handleCheckEmail = (e) => {
  //   e.preventDefault();
  //   // setEmailCheck((prev) => {
  //   //   return {
  //   //     ...prev,
  //   //     email: e.target.value,
  //   //     authKey: e.target.value,
  //   //   };
  //   // });
  //   dispatch(__postCheckEmail(emailCheck));
  // };

  // 비밀번호 유효성검사
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

  // 비밀번호 확인
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

  // 비밀번호 보이기
  const handlePasswordType = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  // 비밀번호 확인 보이기
  const handlePasswordConfirmType = () => {
    setPasswordConfirmType(() => {
      if (!passwordConfirmType.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  const [passwordConfirmType, setPasswordConfirmType] = useState({
    type: 'password',
    visible: false,
  });

  // 회원가입 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(__signupUser(inputValue)).then(
      (res) => !res.error && navigate('/signupcomplete')
    );
  };

  // 회원가입 버튼 활성화
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

  // const onClickHandler = () => {
  //   navigate('/schoolinfo')
  // }

  return (
    <FormContainer>
      <StSignupContainer onSubmit={handleSubmit}>
        <StSignupWraps>
          <FisrtWrap>
            <IoIosArrowBack
              size='28'
              style={{ marginBottom: '20px', cursor: 'pointer' }}
              onClick={() => {
                navigate('/login');
              }}
            />
            <StSignupTitle style={{ justifyContent: 'center' }}>
              회원가입
            </StSignupTitle>

            <StSignupWrap>
              <Stlabel>이름</Stlabel>
              <Input width='100%' onChange={handleChangeusername} />
              {nameError ? (
                <StErrorMessage>
                  2자 이상 12자 이하, 영어 또는 한글
                </StErrorMessage>
              ) : null}
            </StSignupWrap>

            <StSignupWrap>
              <Stlabel>이메일</Stlabel>
              <StFlexbox>
                <Input
                  type='email'
                  width='100%'
                  style={{ marginBottom: '10px' }}
                  onChange={handleChangeEmail}
                  // text={emailMessage}
                />
                <StEmailButton
                  type='button'
                  isOnCheck={isOnCheck}
                  // emailDBCheck={emailDBCheck}
                  // disabled={!isOnCheck ? true : false}
                  onClick={handleChangeEmailCheck}
                >
                  {isOnCheck ? '확인완료' : '중복확인'}
                </StEmailButton>
              </StFlexbox>
              {emailError ? (
                <StErrorMessage>이메일 형식에 맞게 입력하세요</StErrorMessage>
              ) : null}
              {emailConfirm ? (
                <>
                  <StSendEmailButton type='button' onClick={handleSendEmail}>
                    해당 이메일로 인증번호 발송
                  </StSendEmailButton>
                  <Stlabel>인증번호</Stlabel>
                  <StFlexbox>
                    <Input
                      width='100%'
                      style={{ marginRight: '10px' }}
                      onChange={handleChangeAuthKey}
                    />
                    <StEmailButton
                      type='button'
                      isCheck={isCheck}
                      // disabled={!isOnCheck ? true : false}
                      onClick={handleCheckEmail}
                    >
                      {isOnCheck ? '확인완료' : '인증확인'}
                    </StEmailButton>
                  </StFlexbox>
                </>
              ) : null}
            </StSignupWrap>

            <StSignupWrap>
              <Stlabel>비밀번호</Stlabel>
              <StFlexbox>
                <Input
                  type={passwordType.type}
                  width='100%'
                  onChange={handleChangePassword}
                />
                <StVisible onClick={handlePasswordType}>
                  {passwordType.visible ? (
                    <span>
                      <AiOutlineEye />
                    </span>
                  ) : (
                    <span>
                      <AiOutlineEyeInvisible />
                    </span>
                  )}
                </StVisible>
              </StFlexbox>
              {passwordError ? (
                <StErrorMessage>
                  8자 이상 16자 이하의 영어와 숫자, 특수문자 포함
                </StErrorMessage>
              ) : null}
            </StSignupWrap>

            <StSignupWrap>
              <Stlabel>비밀번호 확인</Stlabel>
              <StFlexbox>
                <Input
                  type={passwordConfirmType.type}
                  width='100%'
                  onChange={handleChangeConfirmPassword}
                />
                <StVisible onClick={handlePasswordConfirmType}>
                  {passwordConfirmType.visible ? (
                    <span>
                      <AiOutlineEye />
                    </span>
                  ) : (
                    <span>
                      <AiOutlineEyeInvisible />
                    </span>
                  )}
                </StVisible>
              </StFlexbox>
              {confirmPasswordError ? (
                <StErrorMessage>비밀번호가 일치하지 않습니다.</StErrorMessage>
              ) : null}
            </StSignupWrap>

            <Button
              type='submit'
              width='100%'
              // height="100%"
              isDisabled={isActive ? false : true}
              style={{ marginTop: '50px', backgroundColor: '#f7931e' }}
              // onClickHandler={onClickHandler}
              color='white'
            >
              <ButtonTitle>회원가입</ButtonTitle>
            </Button>
          </FisrtWrap>
        </StSignupWraps>
      </StSignupContainer>
    </FormContainer>
  );
};

export default SignUp;

const FormContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

const StSignupContainer = styled.form`
  width: 100%;
  /* height: 100vh; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

const StSignupWraps = styled.div`
  width: 80%;
  height: 100%;
  /* border: 1px solid red; */
`;

const FisrtWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StSignupTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
  /* border: 1px solid blue; */
`;

const StSignupWrap = styled.div`
  box-sizing: border-box;
  padding: 0;
  border: none;
  align-items: left;
  margin-bottom: 20px;
  position: relative;
`;

const Stlabel = styled.label`
  font-size: 14px;
  font-weight: 700;
`;

const StFlexbox = styled.div`
  position: relative;
`;

const StEmailButton = styled.button`
  position: absolute;
  right: 0;
  top: 40%;
  transform: translatey(-50%);
  background-color: transparent;
  border: none;
  /* border: 0.5px solid #eee; */
  color: ${({ isOnCheck }) => (isOnCheck ? '#03C75A' : '#b3b3b3')};
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  /* cursor: ${({ emailError }) => (emailError ? 'none' : 'pointer')} */
  cursor: pointer;
`;

const StSendEmailButton = styled.button`
  width: 100%;
  color: #b3b3b3;
  background-color: #fff;
  border: 1px solid #b3b3b3;
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
`;

const StVisible = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translatey(-50%);
`;

const StErrorMessage = styled.p`
  margin: 0;
  color: red;
  margin-bottom: 10px;
  font-size: 12px;
`;

const ButtonTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
