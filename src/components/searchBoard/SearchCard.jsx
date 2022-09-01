import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { __getSearch } from '../../redux/modules/SearchSlice';

const SearchCard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(__getSearch());
    },[dispatch])

    return (
        <SearchContainer>
            <SearchContent></SearchContent>
            <IoClose size="22"/>
        </SearchContainer>
    );
};

export default SearchCard;

const SearchContainer = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid red;
`
const SearchContent = styled.div`
    font-weight: 500;
    font-size: 16px;
`