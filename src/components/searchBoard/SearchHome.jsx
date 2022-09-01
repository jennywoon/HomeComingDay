import React from 'react';
import styled from 'styled-components';
import BottomTap from '../BottomTap';
import HeaderTap from "../HeaderTap"
import Search from './Search';

const SearchHome = () => {
    return (
        <HomeContainer>
            {/* <HeaderTap /> */}
            <Search/>
            <BottomTap />
        </HomeContainer>
    );
};

export default SearchHome;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`