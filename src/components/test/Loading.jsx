import { AiOutlineLoading } from 'react-icons/ai';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingContainer>
      <div>
        <AiOutlineLoading className="spinner" />
        <LoadingMessage>Loading...</LoadingMessage>
      </div>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;

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

const LoadingMessage = styled.span`
  font-size: 18px;
  font-weight: 500;
`;
