import React from 'react';
import SearchHome from '../components/searchBoard/SearchHome';
import styled from 'styled-components';
import Header from '../components/Header';

const SearchPage = () => {

    return (
        <Container>
            <Header />
            <SearchHome />
        </Container>
    );
};

export default SearchPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`
