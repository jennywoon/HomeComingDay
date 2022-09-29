import React from 'react';
import { useReactPWAInstall } from "react-pwa-install";
// import logo from "../../assets/logo.png"
// import profileorange from "../../assets/profileorange.png"
import logo60 from "../../assets/logosize/logo60.png";
// import styled from 'styled-components';
import { Button } from 'antd';

const PwaApp = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
    const pwaClick = () => {
        pwaInstall({
            title: "홈커밍데이 다운받기",
            logo: logo60,
        })
            .then(() => { })
            .catch(() => { });
    };

    return (
        <>
            {/* {supported() && !isInstalled() && ( */}
                <Button click={pwaClick}
                >어플 다운받기</Button>
            {/* )} */}
        </>
    );
};

export default PwaApp;

// const StPwaButton = styled.button``