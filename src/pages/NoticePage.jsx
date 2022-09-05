import React from 'react';
import NoticeHome from "../components/noticeBoard/NoticeHome"
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { VscBell } from "react-icons/vsc";

const FreeTalkPage = () => {

    const navigate = useNavigate();
 
    return (
        <Container>
            <HeaderContainer>
            <div></div>
            <HeaderTitle
                onClick={() => { navigate("/") }} style={{ cursor: "pointer" }}
            >HomeComing Day</HeaderTitle>
            
                <VscBell size="27"
                    onClick={() => {navigate("/notice")}} style={{cursor: "pointer"}}
                />

        </HeaderContainer>

            <NoticeHome />
        </Container>
    );
};

export default FreeTalkPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const HeaderContainer = styled.div`
    /* position: sticky;
    top: 0; */
    background-color: #eee;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 20px; */
    font-size: 20px;
    font-weight: bold;
    /* border: 1px solid green; */
`

const HeaderTitle = styled.div`
`

