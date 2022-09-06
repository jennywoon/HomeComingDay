import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from "../../components/elements/Button"
import Input from "../../components/elements/Input"
import { __loginUser } from '../../redux/modules/UserSlice';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import NaverLogin from './NaverLogin';
import logoname from "../../assets/logoname.png"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formValue;
  const [isActive, setIsActive] = useState(false);
  const [loginFail, setLoginFail] = useState('');
  // const { error, isLogin } = useSelector((state) => state.users);

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

  const handlePasswordType = (e) => {
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

  // useEffect(() => {
  //   if (error && !isLogin) {
  //     setLoginFail('이메일과 비밀번호를 확인해주세요');
  //   } else if (error === null && isLogin) {
  //     setLoginFail('');
  //     navigate('/');
  //   }
  // }, [email, password, isLogin, error]);

  // useEffect(() => {
  //   if (error) {
  //     alert(error.result.msg);
  //   }
  // }, [error]);

  return (
    <StLoginContainer
      onSubmit={(e) => {
        e.preventDefault();
        onClickHandler(formValue);
      }}
    >
      <StLoginWraps>
        {/* 로고 */}
        <StLoginTitle onClick={() => {
          navigate("/")
        }}>Homecoming Day</StLoginTitle>
        <StLoginWrap>
          <StEmail>
            <Stlabel>이메일</Stlabel>
            <Input
              onChange={onChangeEmailHandler}
              value={formValue.email}
              width='100%'
              padding='10px 15px'
            />
          </StEmail>
          <StPassword>
            <Stlabel>비밀번호</Stlabel>
            <StPasswordInput>
              <Input
                type={passwordType.type}
                onChange={onChangePasswordHandler}
                value={formValue.password}
                width='100%'
                padding='10px 15px'
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
            </StPasswordInput>
          </StPassword>
          {/* {LoginError ? (
            <StErrorMessage>이메일 혹은 비밀번호가 틀렸습니다.</StErrorMessage>
          ) : null} */}
          <Button
            type='submit'
            width='100%'
            padding='10px 0'
            isDisabled={isActive ? false : true}
            backgroundColor='black'
            color='white'
            style={{ marginTop: '100px' }}
          >
            로그인
          </Button>
        </StLoginWrap>
        {/* 네이버 로그인 */}
        <NaverContainer>
          <NaverLogin />
        </NaverContainer>
        <StGoToSignup
          onClick={() => {
            navigate('/signup');
          }}
        >
          이메일로 회원가입
        </StGoToSignup>
      </StLoginWraps>
    </StLoginContainer>
  );
};

export default Login;

const StLoginContainer = styled.form`
  width: 100%;
  /* height: 100vh; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLoginWraps = styled.div`
  width: 85%;
`;

const StLoginWrap = styled.div``;

const StLoginTitle = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 100px;
`;

const StEmail = styled.div`
  margin-bottom: 30px;
`;

const StPassword = styled.div`
  margin-bottom: 30px;
`;

const Stlabel = styled.label`
  font-size: 14px;
`;

const StPasswordInput = styled.div`
  width: 100%;
  position: relative;
`;

const StVisible = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translatey(-50%);
`;

const StGoToSignup = styled.p`
  cursor: pointer;
  text-align: center;
  font-size: 14px;
`

const StErrorMessage = styled.p`
  margin: 0;
  color: red;
  margin-bottom: 20px;
  font-size: 12px;
`;

const NaverContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`