import React from 'react';
import SearchHome from '../components/searchBoard/SearchHome';
import Layout from '../components/Layout';
import SearchLayout from '../components/SearchLayout';

const SearchPage = () => {

    return (
        <SearchLayout>
            <SearchHome />
        </SearchLayout>
    );
};

export default SearchPage;