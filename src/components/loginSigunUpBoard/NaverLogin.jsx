import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import naverIcon from "../../assets/naverIcon.png"
import { __naverLogin } from "../../redux/modules/NaverSlice"
import axios from 'axios';
import { getCookie, setCookie } from '../../shared/cookies';

const NaverLogin = () => {

    const dispatch = useDispatch();
    // const location = useLocation();
    // useRef 를 선언 해준다. 
    const naverRef = useRef()
    const { naver } = window

    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
    const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // const code = new URL(window.location.href).searchParams.get("code");
    // const state = new URL(window.location.href).searchParams.get("state")

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            // 위에 Client Id 랑 Callback Url 적었는데 ? 라고 혹시 생각한다면
            // 변수 처리를 해준 것이기에 그냥 넘어가면 된다.
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            // loginButton: { color: 'green', type: 3, height: 58 },
            loginButton: { color: 'green', type: 4, height: 47 },
            callbackHandle: true,
        })
        naverLogin.init();
        // 네이버 로그인은 계속 유지되는 경우가 있어서, 초기화시 로그아웃 되도록 설정
        naverLogin.logout();
        naverLogin.getLoginStatus((status) => {
            if (status) {
                console.log("Naver 로그인 상태", naverLogin.user);
                const { email, name } = naverLogin.user;
                console.log(email, name);

                // 필수 제공 동의 조건
                if (name == undefined) {
                    alert("이름은 필수 동의 입니다. 정보제공을 동의해주세요.");
                    naverLogin.reprompt();
                    return;
                }
            } else{
                console.log("Naver 비 로그인 상태");
            }
        });
    }


    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }
    const getToken = () => {
        // if(!location.hash) return;
        const token = window.location.href.split('=')[1].split('&')[0]
        console.log(token);
        // localStorage.setItem("access_token", token)
        // setCookie(token)
        dispatch(__naverLogin({token}))
    }
        
    useEffect(() => {
        initializeNaverLogin()
        userAccessToken()
        // getToken()
    }, [])

    // handleClick 함수 onClick 이벤트 발생 시 useRef 를 통해 지정한 naverRef 항목이 클릭 된다.
    // current 를 통해 아래 div 태그의 ref={} 속성을 줄 수 있다. ( 자세한 내용은 공식문서를 확인하자. )
    const handleNaverLogin = () => {
        naverRef.current.children[0].click()
    }

    return (
        <>

            {/* <NaverIdLogin ref={naverRef} id="naverIdLogin" />
            <NaverLoginBtn onClick={handleNaverLogin}>
                <NaverIcon alt="navericon" />
                <NaverLoginTitle>네이버로 로그인</NaverLoginTitle>
            </NaverLoginBtn> */}
            <div id="naverIdLogin"></div>
        </>
    )
}

export default NaverLogin


// 기존 로그인 버튼이 아닌 커스텀을 진행한 로그인 버튼만 나타내기 위해 작성
const NaverIdLogin = styled.div`
	display: none;
`

const NaverLoginBtn = styled.button`
	display: flex;
	align-items: center;
	width: 360px;
	height: 56px;
	background-color: #03c75a;
	border-radius: 6px;
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
const NaverIcon = styled.div`
	width: 30px;
	height: 30px;
	margin-left: 10px;
	background: url('/images/Login/navericon.png') no-repeat center;
    /* background-image: url(${naverIcon}); */
	background-size: 30px;
`

const NaverLoginTitle = styled.span`
	margin-left: 90px;
	color: ${({ theme }) => theme.White};
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
`

const NaverRoundIcon = styled.div`
      background-image: url(${naverIcon});
`