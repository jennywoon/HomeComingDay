import React from 'react';
import Home from '../components/Home';
import { useMediaQuery } from "react-responsive";
import Layout from '../components/Layout';

const MainPage = () => {

    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(min-width:280px) and (max-width:767px)"
    });

    return (
        <Layout>
            {isPc && <Home />}
            {isTablet && <Home />}
            {isMobile && <Home />}
        </Layout>
    );
};

export default MainPage;