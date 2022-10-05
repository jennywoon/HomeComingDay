import React from 'react'
import styled from 'styled-components'


const Input = ({ borderRadius, height, defaultValue, disabled, id, className, type, value, placeholder, width, padding, onChange, minLength, maxLength, text , border, style,borderBottom}) => {
  return (
    <StyledButtonField >
      <StyledInput
        disabled={disabled}
        id={id}
        className={className}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        width={width}
        padding={padding}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        height={height}
        borderRadius={borderRadius}
        border={border}
        borderBottom={borderBottom}
        style={style}
      />
      <StyledText>{text}</StyledText>
    </StyledButtonField>

  )
}

Input.defaultValue = {
  id: '',
  className: '',
  type: '',
  value: '',
  placeholder: '',
  width: '',
  onChangeHandler: null,
  minLength: '',
  maxLength: '',
  text: '',
  defaultValue: "",
  height: "",
  borderRadius:"",
}

export default Input;

const StyledButtonField = styled.div`
`;
const StyledInput = styled.input`
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  border: none;
  border-bottom: ${(props) => props.borderBottom};
`;
const StyledText = styled.div``