import React from 'react';
import styled from 'styled-components';

const JustLayout = ({ children }) => {
    
    return (
      <LayoutContainer>
        <LayoutWrap>
          <LayoutContents>{children}</LayoutContents>
        </LayoutWrap>
      </LayoutContainer>
    );
};

export default JustLayout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  align-items:center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const LayoutWrap = styled.div`
  width: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LayoutContents = styled.div`
    display: flex;
    justify-content: center;
`