import React from 'react';
import { useReactPWAInstall } from "react-pwa-install";
import logoname from "../../assets/logoname.png"
import styled from 'styled-components';
import { Button } from 'antd';

const PwaApp = () => {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
    const pwaClick = () => {
        pwaInstall({
            title: "홈커밍데이 다운받기",
            logo: logoname,
        })
            .then(() => { })
            .catch(() => { });
    };

    return (
        <>
            {supported() && !isInstalled() && (
                <Button click={pwaClick} text="어플 다운받기" theme="dark"/>
            )}
        </>
    );
};

export default PwaApp;

// const StPwaButton = styled.button``