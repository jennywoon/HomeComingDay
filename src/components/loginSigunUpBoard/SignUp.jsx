import React, { useState, useEffect, useRef } from 'react';
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
import SignupModal from './SignupModal';
import AuthTimer from './AuthTimer';

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
    emailDuplicated: false,
    emailChecked: false
  });

  const { emailError, nameError, passwordError, confirmPasswordError, emailDuplicated, emailChecked } =
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
  // const [emailDuplicated, setEmailDuplicated] = useState(false);
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
          setFormError({ ...formError, emailDuplicated: false });
        } else if (data.data.success === false) {
          setIsOnCheck(false);
          setFormError({ ...formError, emailDuplicated: true });
        }
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

  // 이메일 보내기
  const [isSend, setIsSend] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleSendEmail = async () => {
    const sendEmail = {
      email: email,
    };
    try {
      const data = await axios.post(`${BASE_URL}/signup/sendEmail`, sendEmail);
      setIsSend(true);
      setModalOpen(true);
      setIsActiveTimer(true);
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
        authKey: e.target.value,
      };
    });
  };

  // 이메일 인증번호 확인
  const [isCheck, setIsCheck] = useState(false);
  // const [emailChecked, setEmailChecked] = useState(false);
  const handleCheckEmail = async () => {
    const checkEmail = {
      email: email,
      authKey: authKey,
    };
    try {
      const data = await axios.post(
        `${BASE_URL}/signup/checkEmail`,
        checkEmail
      );
      console.log(data.data);
      if (data.data.success === true) {
        setIsCheck(true);
        setFormError({ ...formError, emailChecked: false });
      } else if (data.data.success === false) {
        setIsCheck(false);
        setFormError({ ...formError, emailChecked: true });
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

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
      (res) => !res.error && navigate('/login')
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
      !confirmPasswordError &&
      authKey !== '' &&
      !emailDuplicated &&
      !emailChecked
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
    emailDuplicated,
    emailChecked
  ]);

  // 이메일 인증 타이머
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const time = useRef(179);
  const timerId = useRef(null);

  useEffect(() => {
      timerId.current = setInterval(() => {
          setMin(parseInt(time.current / 60));
          setSec(time.current % 60 );
          time.current -= 1;
      }, 1000);

      return () => clearInterval(timerId.current)
  })

  useEffect(() => {
      if(time.current <= 0){
          console.log("타임 아웃");
          clearInterval(timerId.current);
      }
  }, [sec])

  return (
    <FormContainer>
      {isSend ? modalOpen && <SignupModal setModalOpen={setModalOpen} /> : null}
      <StSignupContainer onSubmit={handleSubmit}>
        <FormHeader>
          <IoIosArrowBack
            size='28'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/login');
            }}
          />
        </FormHeader>
        <StSignupWraps>
          <FisrtWrap>
            <SecondWrap>
              <StSignupTitle style={{ justifyContent: 'center' }}>
                회원가입
              </StSignupTitle>
              <ThirdWrap>
                <StSignupWrap>
                  <Stlabel>이름</Stlabel>
                  <Input width='100%' onChange={handleChangeusername} style={{borderBottom:"1px solid #ccc"}}/>
                  {nameError ? (
                    <StErrorMessage>
                      2자 이상 12자 이하, 영어 또는 한글
                    </StErrorMessage>
                  ) : null}
                </StSignupWrap>

                <StSignupWrap>
                  <Stlabel>이메일</Stlabel>
                  <StFlexbox>
                    <Input type='email' width='100%' onChange={handleChangeEmail} style={{borderBottom:"1px solid #ccc"}} />
                    <StEmailButton
                      type='button'
                      isOnCheck={isOnCheck}
                      onClick={handleChangeEmailCheck}
                    >
                      {isOnCheck ? '확인완료' : '중복확인'}
                    </StEmailButton>
                  </StFlexbox>
                  {emailError ? (
                    <StErrorMessage>이메일 형식에 맞게 입력하세요</StErrorMessage>
                  ) : null}
                  {emailDuplicated ? (
                    <StErrorMessage>동일한 이메일이 존재합니다.</StErrorMessage>
                  ) : null}
                  {emailConfirm ? (
                    <>
                      <StSendEmailButton
                        type='button'
                        onClick={handleSendEmail}
                        isSend={isSend}
                        isActiveTimer={isActiveTimer}
                      >
                        {isSend
                          ? '해당 이메일로 인증번호 발송 완료'
                          : '해당 이메일로 인증번호 발송'}
                      </StSendEmailButton>
                      <Stlabel>인증번호</Stlabel>
                      <StFlexbox>
                        <StTimerDiv>
                        <Input
                          width='100%'
                          style={{ marginRight: '10px'}}
                          onChange={handleChangeAuthKey}
                        />
                        {/* 이메일 인증 타이버 컴포넌트 */}
                        {isActiveTimer ? <AuthTimer/> : ""}
                        {/* {isActiveTimer ? `${min}분 ${sec <= 10 ? `0` : sec}초` : ""} */}
                        </StTimerDiv>
                        <StEmailCheckButton
                          type='button'
                          isCheck={isCheck}
                          onClick={handleCheckEmail}
                        >
                          {isCheck ? '확인완료' : `인증확인`}
                        </StEmailCheckButton>
                      </StFlexbox>
                      {emailChecked ? (
                        <StErrorMessage>
                          인증번호가 일치하지 않습니다.
                        </StErrorMessage>
                      ) : null}
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
                      style={{borderBottom:"1px solid #ccc"}}
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
                      style={{borderBottom:"1px solid #ccc"}}
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
              </ThirdWrap>
            </SecondWrap>
            <Button
              type='submit'
              width='85%'
              isDisabled={isActive ? false : true}
              style={{ marginTop: '50px', backgroundColor: '#f7931e' }}
              color='white'
            >
              <ButtonTitle>가입하기</ButtonTitle>
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
  display: flex;
  align-items: center;
`;

const StSignupContainer = styled.form`
  width: 100%;
  /* height: 100vh; */
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

const FormHeader = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* border: 1px solid red; */
`
const StSignupWraps = styled.div`
  /* width: 80%; */
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  /* justify-content: space-between; */
`;

const FisrtWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid blue; */
  align-items: center;
`;

const SecondWrap = styled.div`
  width: 85%;
  height: 100%;
  /* border: 1px solid green; */
`

const ThirdWrap = styled.div`
  width: 100%;
  height: 90%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StSignupTitle = styled.div`
  width: 95%;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  /* border: 1px solid blue; */
`;

const StSignupWrap = styled.div`
  /* width: 80%; */
  box-sizing: border-box;
  padding: 0;
  border: none;
  align-items: left;
  margin-bottom: 60px;
  position: relative;
  /* border: 1px solid blue; */
`;

const Stlabel = styled.label`
  font-size: 14px;
  font-weight: 700;
`;

const StFlexbox = styled.div`
  position: relative;
`;

const StTimerDiv = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`
const StEmailButton = styled.button`
  position: absolute;
  right: 0;
  top: 40%;
  transform: translatey(-50%);
  background-color: transparent;
  border: none;
  color: ${({ isOnCheck }) => (isOnCheck ? '#03C75A' : '#b3b3b3')};
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

const StEmailCheckButton = styled.button`
  position: absolute;
  right: 0;
  top: 40%;
  transform: translatey(-50%);
  background-color: transparent;
  border: none;
  color: ${({ isCheck }) => (isCheck ? '#03C75A' : '#b3b3b3')};
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

const StSendEmailButton = styled.button`
  width: 100%;
  color: ${({ isSend }) => (isSend ? '#b3b3b3' : '#f7931e')};
  background-color: #fff;
  border: ${({ isSend }) => (isSend ? '1px solid #b3b3b3' : '1px solid #f7931e')};
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin: 10px 0;
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
