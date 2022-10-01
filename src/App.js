import React, { Fragment, useEffect } from "react";
import Router from "./shared/Router";
import './App.css'
import styled, {keyframes} from "styled-components";
import background2 from "./assets/background2.png"
import feedback from "./assets/feedback.png"

function App() {

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StContainer>
      <div className='wrap' >
        <Router />
      </div>
      <StGoogleFeedback flag
        href="https://forms.gle/WXw3wCGEaUaXw2Q6A"
        target="_blank"
        rel="noreferrer"
      >
        <StFeedbackImg />
      </StGoogleFeedback>
    </StContainer>
  )

}

export default App;

const StContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(0deg, #FFF4CC 2.36%, #FFFFFF 55.35%); */
  background-image: url(${background2});
  background-size: 100% 100%;
  background-position: center;
  overflow: hidden;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /* max-height: 1000px; */
    max-height: 1202px;
    /* min-height: 600px; */
    max-width: 420px;
    /* min-width: 280px; */
    margin: auto;
    background-color: var(--white);
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 24 px;
    @media screen and (min-width: 1024px) {
      position: relative;
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
`;

const StGoogleAnimation = keyframes`
0% {  
    transform: translateY(-15PX); 
}
50%{
  transform: translateY(0px); 
}
  100% {  
    transform: translateY(-15px); 
}
`;

const StGoogleFeedback = styled.a`
  position: fixed;
  bottom: 10%;
  right: 8%;
  cursor: pointer;
  animation: ${StGoogleAnimation} 2s linear infinite;
  @media screen and (max-width: 1400px) {
    display: none;
  }
`

const StFeedbackImg = styled.div`
  width: 130px;
  height: 150px;
  background-image: url(${feedback});
  background-size: 100% 100%;
  background-position: center;
`