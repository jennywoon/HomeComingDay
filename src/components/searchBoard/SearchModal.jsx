import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SearchModal = () => {

    // const {searchs} = useSelector((state) => state.searchs);
    // console.log(searchs)
    return (
        <RecentWrap>
        <RecentTitle>최근 검색어</RecentTitle>

    </RecentWrap>
    );
};

export default SearchModal;

const RecentWrap = styled.div`
    /* width: 75%; */
    /* height: 100vh; */
    border: 1px solid red;
`
const RecentTitle = styled.div`
    margin: 50px 0 20px 0;
    font-size: 20px;
    font-weight: 700;
`