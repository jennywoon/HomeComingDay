import React, { Fragment, useEffect } from "react";
import Router from "./shared/Router";
import './App.css'
import styled from "styled-components";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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
      <div className='wrap' >
        <Router />
      </div>
      <GoogleForm>안녕</GoogleForm>
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
  background-color: #f7ede2;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 100%;
    /* max-height: 1000px; */
    max-height: 1202px;
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

const GoogleForm = styled.div`
    position: fixed;
  bottom: 10%;
  right: 10%;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    display: none;
  }
`