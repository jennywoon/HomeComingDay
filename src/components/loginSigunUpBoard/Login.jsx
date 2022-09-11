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
import LoginErrorModal from './LoginErrorModal';
import { getUser } from '../../redux/modules/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, schoolInfo, error } = useSelector((state)=> state.user)
  console.log(isLogin)
  console.log(schoolInfo)
  const state = useSelector((state)=> state)
  console.log(state)
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formValue;
  const [isActive, setIsActive] = useState(false);
  const [loginFail, setLoginFail] = useState('');

  const handleCheck = (e) => {
    setIsActive(e);
  };

  // 이메일
  const onChangeEmailHandler = (e) => {
    setFormValue((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  // 비밀번호
  const onChangePasswordHandler = (e) => {
    setFormValue((prev) => {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoginCheck, setIsLoginCheck] =useState(false)
  const onSubmitHandler = async (formValue) => {
    const response = await dispatch(__loginUser(formValue))
    // console.log(response)
    if (response.payload.success === true) {
      if (response.payload.data.schoolInfo === true) {
        navigate('/');
      } else if (response.payload.data.schoolInfo === false) {
        navigate('/schoolinfo');
      }
    }
     else if(response.error) {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (formValue.email !== '' && formValue.password !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  },[formValue])

  useEffect(()=>{
    setIsLoginCheck(isLogin)
    dispatch(getUser());
  }, [dispatch, isLogin]);

  return (
    <>
    <StLoginContainer
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(formValue);
      }}
      >
      {modalOpen && <LoginErrorModal setModalOpen={setModalOpen}/>}
      <StLoginWraps>
        <StLoginTitle>
          <LogoImg/>
        </StLoginTitle>
        <StLoginWrap>
          <StEmail>
            <Stlabel>이메일</Stlabel>
            <Input
              onChange={onChangeEmailHandler}
              value={formValue.email}
              width='100%'
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
          <Button
            type='submit'
            width='100%'
            height="100%"
            isDisabled={isActive ? false : true}
            color='white'
            style={{ marginTop: '50px', backgroundColor:"#f7931e" }}
          >
            <ButtonTitle>로그인</ButtonTitle>
          </Button>
        </StLoginWrap>
        <NaverContainer>
          <NaverLogin />
        </NaverContainer>
        <StGoToSignup
          type='button'
          onClick={() => {
            navigate('/signup');
          }}
        >
          이메일로 회원가입
        </StGoToSignup>
      </StLoginWraps>
    </StLoginContainer>
    </>
  );
};

export default Login;

const StLoginContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLoginWraps = styled.div`
  width: 80%;
`;

const StLoginWrap = styled.div``;

const StLoginTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 220px;
  height: 160px;
  background-image: url(${logoname});
  background-position: center;
  background-size: 100% 100%;
`
const StEmail = styled.div`
  margin-bottom: 30px;
`;

const StPassword = styled.div`
  margin-bottom: 30px;
`;

const Stlabel = styled.label`
  font-size: 14px;
  font-weight: 700;
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
  font-weight: 500;
  text-decoration: underline;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const ButtonTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`