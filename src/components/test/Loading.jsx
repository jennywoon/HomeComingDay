import { AiOutlineLoading } from 'react-icons/ai';
import styled from 'styled-components';
import loading from "../../assets/loading.gif"

const Loading = () => {
  return (
    <Container>
      <LoadingContainer>
          <LoadingImg />
          {/* <LoadingMessage>잠시만 기다려주세요</LoadingMessage> */}
      </LoadingContainer>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
  flex-direction: column;
  /* padding-top: 60px; */

  .spinner {
    margin: 4px;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    animation: spin 3s linear infinite;
  }
`;

const LoadingImg = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${loading});
  background-position: center;
  background-size: 100% 100%;
`