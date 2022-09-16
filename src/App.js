import React, { Fragment, useEffect } from "react";
import Router from "./shared/Router";
import './App.css'
import styled from "styled-components";
// import background from "./assets/background.png"
import background2 from "./assets/background2.png"

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
    <Container>
      {/* <TitleWrap>
        <SiteContent>대학교 졸업생 동문 사이트</SiteContent>
        <SiteTitle>Homecoming Day</SiteTitle>
      </TitleWrap> */}
      <div className='wrap' >
        <Router />
      </div>
      {/* <GoogleForm>안녕</GoogleForm> */}
    </Container>
  )

}

export default App;

const Container = styled.div`
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
    min-height: 667px;
    max-width: 420px;
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

const TitleWrap = styled.div`
  position: fixed;
  left: 10%;
  width: 305px;
  height: 37px;
  left: 61px;
  /* top: 100px; */
  top: 70px;

`
const SiteContent = styled.div`
  color: #f7931e;
  font-size: 20px;
  font-weight: 700;
`
const SiteTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
`
// const GoogleForm = styled.div`
//     position: fixed;
//   bottom: 10%;
//   right: 10%;
//   cursor: pointer;
//   @media screen and (max-width: 1400px) {
//     display: none;
//   }
// `