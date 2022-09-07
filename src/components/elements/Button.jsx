import React from 'react'
import styled from 'styled-components'

const Button = ({ id, type, className, isDisabled, children, onClickHandler, width, height, padding, backgroundColor, color ,fontSize, style}) => {

  return (
    <StyledButton
      id={id}
      className={className}
      type={type}
      disabled={isDisabled}
      onClick={onClickHandler}
      padding={padding}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      style={style}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  margin: 1rem 0;
  cursor: pointer;
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: 1rem;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  border-radius: var(--button-radius, 16px);
  color: ${(props) => props.color};

  /* &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #B43917)
  } */

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #ccc);
  }
`;

export default Button
