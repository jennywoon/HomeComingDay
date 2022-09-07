import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from "../../components/elements/Button"
import Input from "../../components/elements/Input"
import { __postSendEmail, __postCheckEmail, __signupUser, __emailCheck } from '../../redux/modules/UserSlice';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

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

  const { emailError, nameError, passwordError, confirmPasswordError } = formError;

  // 정규식(이메일, 이름, 비밀번호)
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const nameRegex = /^[A-Za-zㄱ-ㅎ가-힣]{2,12}$/;
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    
    // 이메일 유효성검사
    const handleChangeEmail = (e) => {
      if (!e.target.value || emailRegex.test(e.target.value)) {
        setFormError({ ...formError, emailError: false });
        // setIsOnCheck(true);
      } else {
        setFormError({ ...formError, emailError: true });
        // setIsOnCheck(false);
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
  const handleChangeEmailCheck = () => {
      const newEmail = {
        email: email,
      };
      dispatch(__emailCheck(newEmail));
      setIsOnCheck(true);
  };

  // 이메일 인증
  const [disabled, setDisabled] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [emailSend, setEmailSend] = useState({
    email:''
  })
  const [emailCheck, setEmailCheck] = useState({
    email: '',
    authKey: ''
  });

  // 이메일 보내기
  const handleEmailConfirm = (e) => {
    e.preventDefault();
    setEmailSend((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
    // setEmailSend({email: e.target.value})
    setDisabled(true);
    setEmailConfirm(true);
    dispatch(__postSendEmail(emailSend));
  }

  // 이메일 인증번호
  const handleChangeEmailConfirm = () =>{}
  
  // 이메일 인증번호 확인
  const handleEmailCheck = (e) => {
    e.preventDefault();
    setEmailCheck((prev) => {
      return {
        ...prev,
        authKey: e.target.value,
      };
    });
    dispatch(__postCheckEmail(emailCheck))

  }

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
  }

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
              <Input
                width='100%'
                onChange={handleChangeusername}
                // padding='10px 15px'
              />
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
                  width='100%'
                  style={{ marginBottom: '10px' }}
                  onChange={handleChangeEmail}
                  // padding='10px 15px'
                />
                <StEmailConfirm
                  isOnCheck={isOnCheck}
                  // disabled={!isOnCheck ? true : false}
                  onClick={handleChangeEmailCheck}
                >
                  {isOnCheck ? '확인완료' : '중복확인'}
                </StEmailConfirm>
              </StFlexbox>
              {emailError ? (
                <StErrorMessage>이메일 형식에 맞게 입력하세요</StErrorMessage>
              ) : null}
              {emailConfirm ? (
                <>
                  <StEmailCheck onClick={handleEmailConfirm}>
                    해당 이메일로 인증번호 발송
                  </StEmailCheck>
                  <Stlabel>인증번호</Stlabel>
                  <StFlexbox>
                    <Input
                      width='100%'
                      style={{ marginRight: '10px' }}
                      onChange={handleChangeEmailConfirm}
                      // padding='10px 15px'
                    />
                    <StEmailConfirm
                      isOnCheck={isOnCheck}
                      // disabled={!isOnCheck ? true : false}
                      onClick={handleEmailCheck}
                    >
                      {isOnCheck ? '확인완료' : '확인하기'}
                    </StEmailConfirm>
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
                  // padding='10px 15px'
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
                  // padding='10px 15px'
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
              width='100%'
              padding='10px 0'
              isDisabled={isActive ? false : true}
              style={{ marginTop: '100px' }}
              // onClickHandler={onClickHandler}
              backgroundColor='black'
              color='white'
            >
              회원가입
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
`

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
  width: 85%;
  height: 100%;
  /* border: 1px solid red; */
`;

const FisrtWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StSignupTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
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

const StEmailConfirm = styled.button`
  position: absolute;
  right: 0;
  top: 40%;
  transform: translatey(-50%);
  background-color: transparent;
  border: none;
  /* border: 0.5px solid #eee; */
  color: ${({ isOnCheck }) => (isOnCheck ? "#03C75A" : "#b3b3b3")};
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const StEmailCheck = styled.button`
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
  position : absolute;
  right : 5px;
  top : 50%;
  transform : translatey(-50%);
`

const StErrorMessage = styled.p`
  margin: 0;
  color: red;
  margin-bottom: 10px;
  font-size: 12px;
`;