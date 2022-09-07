import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import naverIcon from "../../assets/naverIcon.png"
import whtienaversquare from "../../assets/whitenaversquare.png"
// import { __naverLogin } from "../../redux/modules/NaverSlice"
import axios from 'axios';
import { setCookie } from '../../shared/cookies';
import Cookies from "universal-cookie"

const NaverLogin = () => {

    const dispatch = useDispatch();
    const cookies = new Cookies();
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
            } else {
                console.log("Naver 비 로그인 상태");
            }
        });
    }

 
    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }
    const getToken = async () => {
        const token = window.location.href.split('=')[1].split('&')[0]
        console.log(token);
        const data = await axios.post(`${BASE_URL}/naverUserInfo`, token, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        setCookie("accessToken", `${data.data.accessToken}`)
        setCookie("refreshToken", `${data.data.refreshToken}`)
        setCookie("userName", `${data.data.username}`)
        // window.location.replace("/")
        console.log(data.data.accessToken);
        console.log(data.data.username)
        console.log(data.data.schoolInfo)
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
            <NaverIdLogin ref={naverRef} id="naverIdLogin" />
            <NaverLoginBtn onClick={handleNaverLogin}>
                <NaverWrap>
                    <NaverIcon />
                    <NaverLoginTitle>네이버로 로그인</NaverLoginTitle>
                    <div style={{ width: "30px", height: "30px" }}></div>
                </NaverWrap>
            </NaverLoginBtn>
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
    justify-content: center;
	background-color: #ffffff;
	border-radius: 16px;
    width: 100%;
    border: 1px solid #ddd;
    /* border: 1px solid blue; */
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
const NaverIcon = styled.div`
	width: 40px;
	height: 40px;
	background: url(${whtienaversquare}) no-repeat center;
    background-size: 100% 100%;
    border: none;
`

const NaverLoginTitle = styled.div`
	color: ${({ theme }) => theme.White};
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
    color: #bebebe;
`
const NaverWrap = styled.div`
    width: 80%;
    height: 40px;
    /* border: 1px solid red; */
    display: flex;
	align-items: center;
    justify-content: space-between;
`