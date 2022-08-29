import React from 'react';
import { useMediaQuery } from "react-responsive"
import MainPage from '../pages/MainPage';

const Test = () => {

    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });

    return (
        <div>
            {isPc && <MainPage/>}
            {isTablet && <MainPage/>}
            {isMobile && <MainPage/>}
        </div>
    );
};

export default Test;