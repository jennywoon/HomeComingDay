import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import naverIcon from "../assets/naverIcon.png"
import { logout } from "../actions/Cookie"

const NaverLogin = () => {

    // useRef 를 선언 해준다. 
    const naverRef = useRef()
    const { naver } = window

    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
    const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL

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
        naverLogin.init()
    }

    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }
    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0]
    }

    useEffect(() => {
        initializeNaverLogin()
        userAccessToken()
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