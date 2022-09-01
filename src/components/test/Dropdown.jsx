import React, { useState, useCallback } from 'react';
import styled from "styled-components";
import {AiOutlineDown} from 'react-icons/ai'

const Dropdown = () => {
  const dropdownItems = [
    {
      id: 1,
      name: '경영학과',
    },
    {
      id: 2,
      name: '경제학과',
    },
    {
      id: 3,
      name: '건축학과',
    },
    {
      id: 4,
      name: '국어교육과',
    },
    {
      id: 5,
      name: '심리학과',
    },
    {
      id: 5,
      name: '의류학과',
    },
    {
      id: 5,
      name: '컴퓨터공학부',
    },
  ]

  const [isActive, setIsActive] = useState(false);
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e) => {
    const targetId = e.target.id;

    if (targetId === "item_name") {
      setItem(e.target.parentElement.innertText);
    } else if (targetId === "item") {
      setItem(e.target.innertText);
    }

    setIsActive((prev) => !prev);
  }, []);

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <ItemName>{item}</ItemName>
          </>
        ) : (
          <>
            <DropdownSelect>선택해주세요.</DropdownSelect>
            <AiOutlineDown />
          </>
        )}
      </DropdownBody>
      <DropdownMenu isActive={isActive}>
        {dropdownItems.map((item) => (
          <DropdownItemContainer id="item" key={item.id} onClick={onSelectItem}>
            <ItemName id="item_name">{item.name}</ItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  width: 100%;
  /* position: sticky; */
  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #d2d2d2;
`;

const DropdownSelect = styled.p`
  font-size: 12px;
`;

const DropdownMenu = styled.ul`
box-sizing: border-box;
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 100%;
  background-color: white;
  position: absolute;
  border: 1px solid #d2d2d2;
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  padding: 9px 0;
  border-bottom: 1px solid #d2d2d2;
  /* border-top: none; */

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.p`
  font-size: 12px;
`;