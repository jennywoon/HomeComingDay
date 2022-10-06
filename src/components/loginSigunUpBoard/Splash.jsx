import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Login from './Login';
// 아이콘 이미지
import logo3 from '../../assets/logo3.png';

const Splash = () => {
  const [flag, setFlag] = useState(false);
  const useSplash = (setFlag) => {
    useEffect(() => {
      const interval = setTimeout(() => {
        setFlag((value) => !value);
      }, 2000);
      return () => {
        clearTimeout(interval);
      };
    }, [setFlag]);
  };
  useSplash(setFlag);

  return (
    <StContainer>
      {!flag ? (
        <StHomeContainer>
          <StLogoWrap>
            <StLogoNameImg />
          </StLogoWrap>
        </StHomeContainer>
      ) : (
        <Login />
      )}
    </StContainer>
  );
};

export default Splash;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

const StHomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f7931e;
  justify-content: center;
  align-items: center;
`;

const StLogoWrap = styled.div``;

const StLogoNameImg = styled.div`
  width: 240px;
  height: 160px;
  background-image: url(${logo3});
  background-position: center;
  background-size: 100% 100%;
`;
