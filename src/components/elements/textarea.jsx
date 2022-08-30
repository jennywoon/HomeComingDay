import styled from 'styled-components';


const Textarea = ({ todoLabel, defaultValue, changeHandler ,placeholder,height}) => {
  return (
    <TodoTextareaContainer>
      
      <StyledTextarea
        id="textarea"
        name="content"
        rows="10"
        cols="50"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={changeHandler}
        height={height}
      ></StyledTextarea>
    </TodoTextareaContainer>
  );
};

Textarea.defaultProps = {
  todoLabel: '내용',
  defaultValue: '',
  isHide: false,
  changeHandler: null,
};

export default Textarea;

const TodoTextareaContainer = styled.div`
  display: flex;
  margin-top: 15px;

`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 50vh;
  border-radius: 5px;
  /* margin-left: 10px; */
  padding: 5px;
  border:none;
`;
